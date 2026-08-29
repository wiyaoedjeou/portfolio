import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const css = await readFile(new URL('../assets/css/main.css', import.meta.url), 'utf8');

test('the home page presents a concise, bilingual expertise hierarchy', () => {
  assert.equal((html.match(/class="hero-expertise-card"/g) || []).length, 1);
  assert.equal((html.match(/class="service-card"/g) || []).length, 0);
  assert.equal((html.match(/class="expertise-step"/g) || []).length, 3);
  assert.match(html, /data-en="Measure\. Model\. Predict\." data-fr="Mesurer\. Modéliser\. Prédire\."/);
  assert.match(html, /class="expertise-flow" role="list" aria-labelledby="expertise-heading"/);
  const skills = [...html.matchAll(/<div class="skill-pill"([^>]*)>/g)];
  assert.equal(skills.length, 8);
  for (const skill of skills) {
    assert.match(skill[1], /data-en="[^"]+"/);
    assert.match(skill[1], /data-fr="[^"]+"/);
  }
  assert.doesNotMatch(html, /<div class="stat-num">64<\/div>/);
  assert.match(html, /<div class="stat-num">FR<span>\/<\/span>EN<\/div>/);
});

test('all seven roles remain accessible while only four lead the experience section', () => {
  assert.equal((html.match(/class="timeline-item fade-in"/g) || []).length, 7);
  const archive = html.match(/<details class="experience-archive">([\s\S]*?)<\/details>/)?.[1];
  assert.ok(archive);
  assert.equal((archive.match(/class="timeline-item fade-in"/g) || []).length, 3);
  assert.match(archive, /data-en="Earlier experience" data-fr="Expériences antérieures"/);
  assert.match(css, /\.experience-archive summary:focus-visible/);
});

test('the newest research story is the only featured article', () => {
  assert.equal((html.match(/blog-card--featured/g) || []).length, 1);
  assert.match(html, /class="blog-card blog-card--featured fade-in" data-article-id="water-spray"/);
  assert.match(html, /data-en="Featured article" data-fr="Article à la une"/);
  assert.doesNotMatch(css, /\.blog-card:last-child:nth-child\(odd\)/);
});
