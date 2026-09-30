import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('../assets/js/analytics.js', import.meta.url), 'utf8');
const STORAGE_KEY = 'wiyao_analytics_consent_v1';

function harness({ lang = 'en', consent = null } = {}) {
  const elements = [];
  const storage = new Map();
  const documentListeners = new Map();
  const windowListeners = new Map();
  let documentLanguage = lang;

  if (consent) {
    storage.set(STORAGE_KEY, JSON.stringify(consent));
  }

  function element(tagName) {
    const listeners = new Map();
    const node = {
      tagName: tagName.toUpperCase(),
      className: '',
      children: [],
      hidden: false,
      textContent: '',
      append(...children) {
        this.children.push(...children);
        for (const child of children) child.parentNode = this;
      },
      appendChild(child) {
        this.append(child);
        return child;
      },
      addEventListener(name, listener) {
        listeners.set(name, listener);
      },
      dispatch(name) {
        return listeners.get(name)?.({ target: this });
      },
      setAttribute(name, value) {
        this[name] = value;
      },
      focus() {
        this.focused = true;
      },
    };
    elements.push(node);
    return node;
  }

  const head = element('head');
  const body = element('body');
  const document = {
    readyState: 'complete',
    head,
    body,
    documentElement: { getAttribute: name => name === 'lang' ? documentLanguage : null },
    createElement: element,
    addEventListener(name, listener) {
      documentListeners.set(name, listener);
    },
  };
  const window = {
    addEventListener(name, listener) {
      windowListeners.set(name, listener);
    },
  };
  const localStorage = {
    getItem: key => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
    removeItem: key => storage.delete(key),
  };

  vm.runInNewContext(source, {
    window,
    document,
    localStorage,
    console,
    Date,
    JSON,
    encodeURIComponent,
  });

  const find = className => elements.find(item => item.className.split(' ').includes(className));
  const externalScripts = () => head.children.filter(item => item.tagName === 'SCRIPT');
  const calls = () => (window.dataLayer || []).map(args => Array.from(args));

  return {
    window,
    storage,
    panel: find('consent-panel'),
    settings: find('consent-settings'),
    decline: find('consent-button--decline'),
    accept: find('consent-button--accept'),
    title: find('consent-panel__title'),
    description: find('consent-panel__description'),
    privacy: find('consent-panel__link'),
    externalScripts,
    calls,
    setLanguage(value) {
      documentLanguage = value;
      windowListeners.get('languagechange')?.();
    },
  };
}

test('Analytics is not loaded before a choice or after a refusal', () => {
  const h = harness({ lang: 'fr' });
  assert.equal(h.panel.hidden, false);
  assert.equal(h.settings.hidden, true);
  assert.equal(h.title.textContent, 'Mesure d’audience');
  assert.equal(h.externalScripts().length, 0);
  assert.equal(h.window.dataLayer, undefined);

  h.decline.dispatch('click');
  assert.equal(JSON.parse(h.storage.get(STORAGE_KEY)).value, 'denied');
  assert.equal(h.panel.hidden, true);
  assert.equal(h.settings.hidden, false);
  assert.equal(h.externalScripts().length, 0);
  assert.equal(h.window.dataLayer, undefined);
  assert.equal(h.window.portfolioAnalytics.event('test_event'), false);
});

test('explicit acceptance loads GA4 once with advertising features disabled', () => {
  const h = harness();
  h.accept.dispatch('click');

  assert.equal(JSON.parse(h.storage.get(STORAGE_KEY)).value, 'granted');
  assert.equal(h.externalScripts().length, 1);
  assert.equal(h.externalScripts()[0].src, 'https://www.googletagmanager.com/gtag/js?id=G-15E64V5DTL');
  assert.equal(h.externalScripts()[0].async, true);
  assert.equal(h.calls()[0][0], 'consent');
  assert.deepEqual({ ...h.calls()[0][2] }, {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  const config = h.calls().find(call => call[0] === 'config');
  assert.equal(config[1], 'G-15E64V5DTL');
  assert.equal(config[2].allow_google_signals, false);
  assert.equal(config[2].allow_ad_personalization_signals, false);
  assert.equal(h.window.portfolioAnalytics.event('generate_lead', { method: 'test' }), true);
  assert.equal(h.calls().at(-1)[0], 'event');
});

test('stored choices are respected and expired choices are requested again', () => {
  const denied = harness({ consent: { value: 'denied', savedAt: Date.now() } });
  assert.equal(denied.panel.hidden, true);
  assert.equal(denied.settings.hidden, false);
  assert.equal(denied.externalScripts().length, 0);

  const granted = harness({ consent: { value: 'granted', savedAt: Date.now() } });
  assert.equal(granted.panel.hidden, true);
  assert.equal(granted.externalScripts().length, 1);

  const expired = harness({ consent: { value: 'granted', savedAt: Date.now() - 184 * 24 * 60 * 60 * 1000 } });
  assert.equal(expired.panel.hidden, false);
  assert.equal(expired.externalScripts().length, 0);
  assert.equal(expired.storage.has(STORAGE_KEY), false);
});

test('visitors can reopen preferences, withdraw consent and switch languages', () => {
  const h = harness({ lang: 'en' });
  assert.equal(h.title.textContent, 'Audience measurement');
  assert.match(h.privacy.href, /hl=en$/);
  h.setLanguage('fr');
  assert.equal(h.title.textContent, 'Mesure d’audience');
  assert.equal(h.accept.textContent, 'Accepter');
  assert.match(h.privacy.href, /hl=fr$/);

  h.accept.dispatch('click');
  h.settings.dispatch('click');
  assert.equal(h.panel.hidden, false);
  h.decline.dispatch('click');
  assert.equal(h.window.portfolioAnalytics.event('after_withdrawal'), false);
  const update = h.calls().at(-1);
  assert.equal(update[0], 'consent');
  assert.equal(update[1], 'update');
  assert.equal(update[2].analytics_storage, 'denied');
  assert.equal(h.externalScripts().length, 1);
});
