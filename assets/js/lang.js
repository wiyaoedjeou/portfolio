/**
 * lang.js
 * Bilingual EN/FR toggle. Reads data-en / data-fr attributes.
 */

const STORAGE_KEY = 'wiyao_lang';
const DEFAULT_LANG = 'en';

let currentLang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem(STORAGE_KEY, lang);

  document.documentElement.setAttribute('lang', lang);

  document.getElementById('btn-en')?.classList.toggle('active', lang === 'en');
  document.getElementById('btn-fr')?.classList.toggle('active', lang === 'fr');

  document.querySelectorAll('[data-en]').forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (!text) return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = text;
    } else {
      el.innerHTML = text;
    }
  });
}

export function initLang() {
  document.getElementById('btn-en')?.addEventListener('click', () => applyLang('en'));
  document.getElementById('btn-fr')?.addEventListener('click', () => applyLang('fr'));
  applyLang(currentLang);
}

export function getCurrentLang() {
  return currentLang;
}
