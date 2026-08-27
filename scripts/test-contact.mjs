import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';

const source = (await readFile(new URL('../assets/js/contact.js', import.meta.url), 'utf8')).replace('export function initContact', 'function initContact');
function harness({ lang = 'en', valid = true, honey = '', email = 'test@example.invalid', sdk = true, failure = false, storageThrows = false, rate = null } = {}) {
  const sent = [];
  const storage = new Map(rate ? [['contact_submits', JSON.stringify(rate)]] : []);
  const button = {
    disabled: false, textContent: lang === 'fr' ? '→ Envoyer le message' : '→ Send message',
    getAttribute: key => ({ 'data-en': '→ Send message', 'data-fr': '→ Envoyer le message' })[key],
  };
  const fields = {
    _honey: honey, email, firstname: ' Test ', company: ' Example ',
    mission_type: 'Technical report / Expertise', message: ' Simulated test only ',
  };
  let onSubmit;
  let status;
  const form = {
    resetCount: 0, reportCount: 0,
    querySelector(selector) {
      if (selector === '[type="submit"]') return button;
      if (selector === '.form-status') return status;
      const name = selector.match(/^\[name="([^"]+)"\]$/)?.[1];
      return name in fields ? { value: fields[name] } : null;
    },
    checkValidity: () => valid,
    reportValidity() { this.reportCount++; },
    addEventListener(event, fn) { if (event === 'submit') onSubmit = fn; },
    appendChild(child) { status = child; },
    reset() { this.resetCount++; },
  };
  const globals = {
    document: {
      documentElement: { getAttribute: () => lang },
      getElementById: id => id === 'contact-form' ? form : null,
      createElement: () => ({ className: '', textContent: '', setAttribute(name, value) { this[name] = value; } }),
    },
    sessionStorage: {
      getItem(key) { if (storageThrows) throw Error('disabled'); return storage.get(key) ?? null; },
      setItem(key, value) { if (storageThrows) throw Error('disabled'); storage.set(key, value); },
    },
    console: { error() {} },
  };
  if (sdk) globals.emailjs = {
    init() {},
    async send(service, template, params) {
      assert.equal(button.disabled, true);
      sent.push({ service, template, params });
      if (failure) throw Error('simulated service failure');
    },
  };
  vm.runInNewContext(source + '\ninitContact();', globals);
  return {
    sent, form, button, storage,
    get status() { return status; },
    submit: () => onSubmit({ preventDefault() {} }),
  };
}

test('contact rejects invalid required fields, honeypots and invalid email addresses without sending', async () => {
  const invalid = harness({ valid: false });
  await invalid.submit();
  assert.equal(invalid.form.reportCount, 1);
  assert.equal(invalid.sent.length, 0);
  const bot = harness({ honey: 'filled' });
  await bot.submit();
  assert.equal(bot.sent.length, 0);
  const malformed = harness({ email: 'not-an-email' });
  await malformed.submit();
  assert.equal(malformed.sent.length, 0);
  assert.match(malformed.status.textContent, /valid email/);
});

test('contact success in French and English resets the form and restores the submit button', async () => {
  for (const lang of ['en', 'fr']) {
    const h = harness({ lang });
    await h.submit();
    assert.equal(h.sent.length, 1);
    assert.ok(h.sent[0].service && h.sent[0].template);
    assert.equal(h.sent[0].params.from_name, 'Test');
    assert.equal(h.sent[0].params.message, 'Simulated test only');
    assert.equal(h.sent[0].params.from_email, 'test@example.invalid');
    assert.equal(h.form.resetCount, 1);
    assert.equal(h.button.disabled, false);
    assert.equal(h.button.textContent, lang === 'fr' ? '→ Envoyer le message' : '→ Send message');
    assert.equal(h.status.role, 'alert');
    assert.equal(h.status.className, 'form-status form-status--success');
    assert.match(h.status.textContent, lang === 'fr' ? /Message envoyé/ : /Message sent/);
    assert.equal(JSON.parse(h.storage.get('contact_submits')).count, 1);
  }
});

test('contact failure preserves the entered message, restores the button and offers direct email', async () => {
  const h = harness({ lang: 'fr', failure: true });
  await h.submit();
  assert.equal(h.form.resetCount, 0);
  assert.equal(h.button.disabled, false);
  assert.equal(h.status.className, 'form-status form-status--error');
  assert.match(h.status.textContent, /Échec de l'envoi/);
  assert.match(h.status.textContent, /wiyaoedjeou@outlook\.com/);
  assert.equal(h.storage.has('contact_submits'), false);
});

test('an unavailable contact SDK falls back to direct email without an external call', async () => {
  const h = harness({ sdk: false });
  await h.submit();
  assert.equal(h.sent.length, 0);
  assert.match(h.status.textContent, /wiyaoedjeou@outlook\.com/);
  assert.equal(h.button.disabled, false);
});

test('contact respects the hourly limit, resets expired windows and tolerates unavailable storage', async () => {
  const limited = harness({ rate: { count: 3, since: Date.now() } });
  await limited.submit();
  assert.equal(limited.sent.length, 0);
  assert.match(limited.status.textContent, /Too many messages/);
  const expired = harness({ rate: { count: 3, since: Date.now() - 3600001 } });
  await expired.submit();
  assert.equal(expired.sent.length, 1);
  assert.equal(JSON.parse(expired.storage.get('contact_submits')).count, 1);
  const blockedStorage = harness({ storageThrows: true });
  await blockedStorage.submit();
  assert.equal(blockedStorage.sent.length, 1);
  assert.equal(blockedStorage.status.className, 'form-status form-status--success');
});
