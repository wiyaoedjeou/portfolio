/**
 * lang.js
 * Bilingual EN/FR toggle. Reads data-en / data-fr attributes.
 */

const STORAGE_KEY = 'wiyao_lang';
const DEFAULT_LANG = 'en';
const SUPPORTED_LANGS = ['en', 'fr'];

let currentLang = DEFAULT_LANG;

try {
  const storedLang = localStorage.getItem(STORAGE_KEY);
  if (SUPPORTED_LANGS.includes(storedLang)) currentLang = storedLang;
} catch {
  // Storage can be unavailable in privacy-restricted browsing contexts.
}

function applyLang(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) lang = DEFAULT_LANG;
  currentLang = lang;

  try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* non-blocking */ }

  document.documentElement.setAttribute('lang', lang);

  SUPPORTED_LANGS.forEach(code => {
    const button = document.getElementById(`btn-${code}`);
    const isActive = lang === code;
    button?.classList.toggle('active', isActive);
    button?.setAttribute('aria-pressed', String(isActive));
  });

  document.querySelectorAll('[data-en]').forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (!text) return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = text;
    } else {
      el.innerHTML = text;
    }
  });

  const pageTitle = document.querySelector(`meta[name="title-${lang}"]`)?.content;
  const pageDescription = document.querySelector(`meta[name="description-${lang}"]`)?.content;
  if (pageTitle) document.title = pageTitle;
  if (pageDescription) {
    document.querySelector('meta[name="description"]')?.setAttribute('content', pageDescription);
  }

  window.dispatchEvent(new CustomEvent('languagechange', { detail: { lang } }));
}

export function initLang() {
  document.getElementById('btn-en')?.addEventListener('click', () => applyLang('en'));
  document.getElementById('btn-fr')?.addEventListener('click', () => applyLang('fr'));
  applyLang(currentLang);
}

export function getCurrentLang() {
  return currentLang;
}
