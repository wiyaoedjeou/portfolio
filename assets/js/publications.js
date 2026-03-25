/**
 * publications.js
 * Fetches publications from /data/publications.json and renders them.
 * JSON is auto-updated weekly via GitHub Actions (see .github/workflows/update-publications.yml).
 */

import { getCurrentLang } from './lang.js';

const PUB_DATA_URL = 'data/publications.json';

function createPubCard(pub, lang) {
  const highlight = typeof pub.highlight === 'object' ? pub.highlight[lang] : pub.highlight;
  const abstract = typeof pub.abstract === 'object' ? pub.abstract[lang] : pub.abstract;

  const card = document.createElement('div');
  card.className = 'pub-card fade-in';
  card.innerHTML = `
    <div class="pub-year">
      ${pub.year}
      <span class="pub-tag">${pub.tag}</span>
    </div>
    <h3>${pub.title}</h3>
    <p class="pub-authors">${pub.authors}</p>
    ${highlight ? `<div class="pub-highlight">${highlight}</div>` : ''}
    <p class="pub-abstract">${abstract}</p>
    <div class="pub-footer">
      <span class="pub-journal">${pub.journal}</span>
      ${pub.doi ? `<a href="https://doi.org/${pub.doi}" target="_blank" rel="noopener" class="pub-doi">DOI ↗</a>` : ''}
      ${pub.url && !pub.doi ? `<a href="${pub.url}" target="_blank" rel="noopener" class="pub-doi">ResearchGate ↗</a>` : ''}
    </div>
  `;
  return card;
}

export async function initPublications() {
  const grid = document.getElementById('pub-grid');
  if (!grid) return;

  try {
    const res = await fetch(PUB_DATA_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const pubs = await res.json();

    // Sort by year descending
    pubs.sort((a, b) => b.year - a.year);

    const lang = getCurrentLang();
    grid.innerHTML = '';
    pubs.forEach(pub => grid.appendChild(createPubCard(pub, lang)));

    // Trigger animations for newly inserted cards
    requestAnimationFrame(() => {
      import('./animations.js').then(({ initAnimations }) => initAnimations());
    });

  } catch (err) {
    console.warn('Publications data unavailable, using static content.', err);
    // Static content already in HTML as fallback (see index.html noscript section)
  }
}
