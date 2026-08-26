/**
 * publications.js
 * Fetches the curated selection from /data/publications.json and renders it.
 * The six entries are maintained manually so their citations and translations stay accurate.
 */

import { getCurrentLang } from './lang.js';
import { observeFadeIns } from './animations.js';

const PUB_DATA_URL = 'data/publications.json';
let publications = [];

function localized(value, lang) {
  if (value && typeof value === 'object') return value[lang] || value.en || '';
  return value || '';
}

function appendTextElement(parent, tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  element.textContent = text;
  parent.appendChild(element);
  return element;
}

function createPubCard(pub, lang) {
  const highlight = localized(pub.highlight, lang);
  const abstract = localized(pub.abstract, lang);

  const card = document.createElement('div');
  card.className = 'pub-card fade-in';

  const heading = document.createElement('div');
  heading.className = 'pub-year';
  heading.append(document.createTextNode(String(pub.year)));
  appendTextElement(heading, 'span', 'pub-tag', localized(pub.tag, lang));
  card.appendChild(heading);

  appendTextElement(card, 'h3', '', pub.title);
  appendTextElement(card, 'p', 'pub-authors', pub.authors);
  if (highlight) appendTextElement(card, 'div', 'pub-highlight', highlight);
  appendTextElement(card, 'p', 'pub-abstract', abstract);

  const footer = document.createElement('div');
  footer.className = 'pub-footer';
  appendTextElement(footer, 'span', 'pub-journal', pub.journal);

  if (pub.doi || pub.url) {
    const link = document.createElement('a');
    link.className = 'pub-doi';
    link.href = pub.doi ? `https://doi.org/${pub.doi}` : pub.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = pub.doi ? 'DOI ↗' : localized(pub.linkLabel, lang) || (lang === 'fr' ? 'Voir la source ↗' : 'View source ↗');
    footer.appendChild(link);
  }

  card.appendChild(footer);
  return card;
}

function renderPublications(lang = getCurrentLang()) {
  const grid = document.getElementById('pub-grid');
  if (!grid || !publications.length) return;

  grid.replaceChildren(...publications.map(pub => createPubCard(pub, lang)));
  requestAnimationFrame(() => observeFadeIns(grid));
}

export async function initPublications() {
  const grid = document.getElementById('pub-grid');
  if (!grid) return;

  try {
    const res = await fetch(PUB_DATA_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    publications = await res.json();

    // Sort by year descending
    publications.sort((a, b) => b.year - a.year);
    renderPublications();
    window.addEventListener('languagechange', event => renderPublications(event.detail.lang));

  } catch (err) {
    console.warn('Publications data unavailable; keeping the static fallback.', err);
  }
}
