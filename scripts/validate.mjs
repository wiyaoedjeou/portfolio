import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { escapeHtml } from './article-renderer.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const config = JSON.parse(await readFile(path.join(root, 'content/articles/index.json'), 'utf8'));
const htmlFiles = ['index.html', ...config.articles.flatMap(article => [article.path.en, article.path.fr])];
const errors = [];
const cache = new Map();
const decode = text => text.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const getHtml = async file => {
  if (!cache.has(file)) cache.set(file, await readFile(file, 'utf8'));
  return cache.get(file);
};

async function exists(file) {
  try { await stat(file); return true; } catch { return false; }
}

const publications = JSON.parse(await readFile(path.join(root, 'data/publications.json'), 'utf8'));
if (publications.length !== 6) errors.push(`Expected exactly six selected research works; found ${publications.length}.`);
const publicationIds = new Set();
for (const publication of publications) {
  if (!publication.id || publicationIds.has(publication.id)) errors.push(`Missing or duplicate publication id: ${publication.id || '(empty)'}.`);
  publicationIds.add(publication.id);
  for (const field of ['year', 'title', 'authors', 'journal']) if (!publication[field]) errors.push(`${publication.id}: missing ${field}.`);
  for (const field of ['tag', 'highlight', 'abstract']) if (!publication[field]?.en || !publication[field]?.fr) errors.push(`${publication.id}: ${field} must contain en and fr values.`);
}

for (const file of htmlFiles) {
  const absoluteFile = path.join(root, file);
  const html = await getHtml(absoluteFile);
  const ids = [...html.matchAll(/\sid=["']([^"']+)["']/g)].map(match => match[1]);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicates.length) errors.push(`${file}: duplicate ids: ${[...new Set(duplicates)].join(', ')}.`);
  if ((html.match(/<h1(?:\s|>)/g) || []).length !== 1) errors.push(`${file}: expected one H1.`);
  for (const match of html.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(match[1]); } catch (error) { errors.push(`${file}: invalid JSON-LD (${error.message}).`); }
  }
  for (const match of html.matchAll(/\s(?:href|src|data-href-en|data-href-fr)=["']([^"']+)["']/g)) {
    const reference = decode(match[1]);
    if (/^(?:https?:|mailto:|tel:|data:)/.test(reference)) continue;
    const [beforeHash, hash] = reference.split('#');
    const pathname = decodeURIComponent(beforeHash.split('?')[0]);
    const target = pathname ? path.resolve(path.dirname(absoluteFile), pathname) : absoluteFile;
    if (!(await exists(target))) { errors.push(`${file}: missing local reference ${reference}.`); continue; }
    if (hash && target.endsWith('.html')) {
      const targetHtml = await getHtml(target);
      const targetIds = [...targetHtml.matchAll(/\sid=["']([^"']+)["']/g)].map(item => item[1]);
      if (!targetIds.includes(decodeURIComponent(hash))) errors.push(`${file}: missing fragment ${reference}.`);
    }
  }
}

const sitemap = await readFile(path.join(root, 'sitemap.xml'), 'utf8');
const sitemapEntries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(match => match[1]);
const sitemapUrls = sitemapEntries.map(entry => decode(entry.match(/<loc>([^<]+)<\/loc>/)?.[1] || ''));
const expectedUrls = [config.siteUrl, ...config.articles.flatMap(article => [new URL(article.path.en, config.siteUrl).href, new URL(article.path.fr, config.siteUrl).href])];
if (sitemapUrls.length !== expectedUrls.length || new Set(sitemapUrls).size !== expectedUrls.length || expectedUrls.some(url => !sitemapUrls.includes(url))) errors.push('Sitemap must list the home page and every article language exactly once.');

for (const article of config.articles) for (const lang of ['en', 'fr']) {
  const file = article.path[lang];
  const html = await getHtml(path.join(root, file));
  const canonical = new URL(file, config.siteUrl).href;
  const canonicals = [...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)].map(match => decode(match[1]));
  if (canonicals.length !== 1 || canonicals[0] !== canonical) errors.push(`${file}: incorrect self canonical.`);
  if (!html.includes(`<html lang="${lang}">`)) errors.push(`${file}: incorrect document language.`);
  const alternates = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)];
  if (alternates.length !== 3) errors.push(`${file}: expected en, fr and x-default alternates.`);
  for (const code of ['en', 'fr', 'x-default']) {
    const expected = new URL(article.path[code === 'x-default' ? 'en' : code], config.siteUrl).href;
    if (!alternates.some(match => match[1] === code && decode(match[2]) === expected)) errors.push(`${file}: missing or incorrect ${code} alternate.`);
    const entry = sitemapEntries.find(value => value.includes(`<loc>${escapeHtml(canonical)}</loc>`));
    if (!entry?.includes(`hreflang="${code}" href="${escapeHtml(expected)}"`)) errors.push(`${file}: missing sitemap alternate ${code}.`);
  }
  const schemaMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  const schema = schemaMatch ? JSON.parse(schemaMatch[1]) : null;
  const markdown = await readFile(path.join(root, 'content/articles', article.source[lang]), 'utf8');
  const title = markdown.split('\n')[0].slice(2);
  if (!schema || schema['@type'] !== 'BlogPosting' || schema.inLanguage !== lang || schema.headline !== title || schema.mainEntityOfPage !== canonical) errors.push(`${file}: structured data does not match its content.`);
  if (schema?.datePublished !== (article.published?.[lang] || undefined) || schema?.dateModified !== article.updated) errors.push(`${file}: publication/modification dates do not match editorial metadata.`);
  if (!html.includes(`<meta property="og:title" content="${escapeHtml(title)}">`) || !html.includes(`<meta name="description" content="${escapeHtml(article.description[lang])}">`)) errors.push(`${file}: metadata differs from the article.`);
  if (/brouillon|draft for review|unpublished draft|Sommaire de relecture|Review contents|\.md(?:["'#?])/i.test(html)) errors.push(`${file}: review-only text or a Markdown link leaked into the page.`);
  if (/<script(?![^>]*type="application\/ld\+json")/i.test(html)) errors.push(`${file}: an article unexpectedly depends on JavaScript.`);
}

const home = await getHtml(path.join(root, 'index.html'));
if ((home.match(/data-article-id=/g) || []).length !== config.articles.length) errors.push('The home page must contain one card per article, not per language.');
for (const article of config.articles) for (const lang of ['en', 'fr']) {
  if (!home.includes(`href="${article.path[lang]}" lang="${lang}" hreflang="${lang}"`)) errors.push(`Home: missing crawlable ${lang} link for ${article.id}.`);
}
if (!home.includes('researchgate.net')) errors.push('The complete-publication ResearchGate link must be preserved.');

if (errors.length) {
  console.error(errors.map(error => `- ${error}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Validation passed: ${htmlFiles.length} HTML pages, ${config.articles.length} bilingual articles and ${publications.length} selected research works.`);
}
