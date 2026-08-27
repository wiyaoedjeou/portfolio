import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';
import { renderArticle } from './article-renderer.mjs';

const options = { lang: 'en', resolveLink: href => href };
test('renderer preserves scientific symbols, escapes HTML and links citations', () => {
  const r = renderArticle('# Contact\n\n## Constraints\n\np ≥ 0; g ≥ 0; p × g = 0. <script>alert(1)</script> [1]\n\n## References\n\n1. *A source*. [DOI](https://doi.org/example).', options);
  assert.match(r.html, /p ≥ 0; g ≥ 0; p × g = 0/);
  assert.match(r.html, /&lt;script&gt;/);
  assert.doesNotMatch(r.html, /<script>/);
  assert.match(r.html, /href="#ref-1"/);
  assert.match(r.html, /<li id="ref-1">/);
});

test('renderer generates accessible numeric tables and unique heading IDs', () => {
  const r = renderArticle('# Test\n\n## Values\n\n| Quantity | Smooth | Rough |\n| --- | ---: | ---: |\n| Pressure | 1.00 GPa | 4.33 GPa |\n\n## Values\n\nDone.', options);
  assert.deepEqual(r.outline.map(item => item.id), ['values', 'values-2']);
  assert.match(r.html, /scope="col" class="numeric"/);
  assert.match(r.html, /<th scope="row">Pressure/);
  assert.match(r.html, /tabindex="0" role="region"/);
});

test('renderer fails on missing references, unsafe links and unsupported blocks', () => {
  assert.throws(() => renderArticle('# Test\n\nText [9].', options), /Missing reference/);
  assert.throws(() => renderArticle('# Test\n\n[bad](javascript:alert).', options), /Unsafe link/);
  assert.throws(() => renderArticle('# Test\n\n```js\ncode\n```', options), /Unsupported Markdown/);
});

const languageScript = (await readFile(new URL('../assets/js/lang.js', import.meta.url), 'utf8')).replace(/export function /g, 'function ');
function languageHarness({ search = '', stored = null, storageThrows = false } = {}) {
  class Element {
    constructor(attrs = {}, tag = 'A') { this.attrs = attrs; this.tagName = tag; this.classList = { toggle() {} }; this.listeners = {}; this.innerHTML = ''; this.textContent = ''; }
    getAttribute(name) { return this.attrs[name] ?? null; }
    setAttribute(name, value) { this.attrs[name] = value; }
    hasAttribute(name) { return Object.hasOwn(this.attrs, name); }
    addEventListener(name, fn) { this.listeners[name] = fn; }
  }
  const link = new Element({ 'data-href-en': 'blog/article.html', 'data-href-fr': 'fr/blog/article.html' });
  const plain = new Element({ 'data-en': 'English title', 'data-fr': '<em>Titre</em>', 'data-i18n-text': '' });
  const rich = new Element({ 'data-en': 'Two<br>lines', 'data-fr': 'Deux<br>lignes' }, 'H2');
  const buttons = { 'btn-en': new Element(), 'btn-fr': new Element() };
  const html = new Element();
  const events = [];
  const context = vm.createContext({
    URLSearchParams,
    CustomEvent: class { constructor(type, init) { this.type = type; this.detail = init.detail; } },
    localStorage: { getItem() { if (storageThrows) throw Error('disabled'); return stored; }, setItem() { if (storageThrows) throw Error('disabled'); } },
    document: { documentElement: html, getElementById: id => buttons[id], querySelectorAll: selector => selector === '[data-en]' ? [plain, rich] : [link], querySelector: () => null },
    window: { location: { search }, dispatchEvent: event => events.push(event) },
  });
  vm.runInContext(`${languageScript}\ninitLang(); globalThis.language = getCurrentLang;`, context);
  return { context, link, plain, rich, buttons, html, events };
}

test('explicit article return language overrides stored preference', () => {
  const h = languageHarness({ search: '?lang=fr', stored: 'en' });
  assert.equal(h.context.language(), 'fr');
  assert.equal(h.link.attrs.href, 'fr/blog/article.html');
  assert.equal(h.html.attrs.lang, 'fr');
  assert.equal(h.plain.textContent, '<em>Titre</em>');
  assert.equal(h.plain.innerHTML, '');
  assert.equal(h.rich.innerHTML, 'Deux<br>lignes');
  h.buttons['btn-en'].listeners.click();
  assert.equal(h.link.attrs.href, 'blog/article.html');
  assert.equal(h.events.at(-1).detail.lang, 'en');
});

test('language selection still works without browser storage and rejects unsupported languages', () => {
  assert.equal(languageHarness({ search: '?lang=fr', storageThrows: true }).context.language(), 'fr');
  assert.equal(languageHarness({ search: '?lang=xx', stored: 'fr' }).context.language(), 'fr');
  assert.equal(languageHarness({ search: '?lang=xx', storageThrows: true }).context.language(), 'en');
});


test('every generated article preserves all approved content words and numbers', async () => {
  const config = JSON.parse(await readFile(new URL('../content/articles/index.json', import.meta.url), 'utf8'));
  const decode = text => text.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  const words = text => text.match(/[\p{L}\p{N}]+/gu) || [];
  for (const article of config.articles) for (const lang of ['en', 'fr']) {
    const source = await readFile(new URL('../content/articles/' + article.source[lang], import.meta.url), 'utf8');
    const markdown = source.split('\n').slice(1).join('\n').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/^\d+\. /gm, '');
    const html = await readFile(new URL('../' + article.path[lang], import.meta.url), 'utf8');
    const marker = '<div class="article-body">';
    const start = html.indexOf(marker) + marker.length;
    const end = html.indexOf('\n        </div>\n        <footer', start);
    assert.ok(start >= marker.length && end > start, article.id + ': missing article body');
    const actual = decode(html.slice(start, end).replace(/<[^>]+>/g, ' '));
    assert.deepEqual(words(actual), words(markdown), article.id + ': content mismatch in ' + lang);
  }
});
