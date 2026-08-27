import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderArticle, escapeHtml as e } from './article-renderer.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceRoot = path.join(root, 'content/articles');
const config = JSON.parse(await readFile(path.join(sourceRoot, 'index.json'), 'utf8'));
const check = process.argv.includes('--check');
const langs = ['en', 'fr'];
const sourceToRoute = new Map();
const routes = new Set();
const ids = new Set();
const rendered = new Map();
const outputs = new Map();

if (config.siteUrl !== 'https://wiyaoedjeou.github.io/portfolio/') throw new Error('Unexpected production origin.');
const absolute = route => new URL(route, config.siteUrl).href;
const relative = (from, to) => path.posix.relative(path.posix.dirname(from), to);
const styleVersions = new Map(await Promise.all(['assets/css/main.css', 'assets/css/article.css'].map(async file => [
  file, createHash('sha256').update(await readFile(path.join(root, file))).digest('hex').slice(0, 12),
])));
const stylesheetHref = (from, file) => `${relative(from, file)}?v=${styleVersions.get(file)}`;
const date = (value, lang) => new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}T12:00:00Z`));
const isDate = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value));

if (!isDate(config.homeUpdated)) throw new Error('Invalid home modification date.');
for (const article of config.articles) {
  if (article.image && (!article.image.startsWith('assets/images/') || article.image.includes('..'))) throw new Error('Invalid article preview image.');
  if (!article.id || ids.has(article.id) || !isDate(article.updated)) throw new Error('Invalid article id or date.');
  ids.add(article.id);
  for (const lang of langs) {
    const route = article.path[lang];
    const expectedPrefix = lang === 'fr' ? 'fr/blog/' : 'blog/';
    if (!route.startsWith(expectedPrefix) || !/^[a-z0-9/-]+\.html$/.test(route) || route.includes('..') || routes.has(route)) throw new Error(`Invalid or duplicate route: ${route}`);
    if (!article.source[lang].startsWith(`${lang}/`) || article.source[lang].includes('..')) throw new Error('Invalid source path.');
    if (!article.description[lang] || !article.category[lang]) throw new Error('Missing translated metadata.');
    const published = article.published?.[lang];
    if (published && (!isDate(published) || published > article.updated)) throw new Error('Invalid publication date.');
    const source = path.resolve(sourceRoot, article.source[lang]);
    if (sourceToRoute.has(source)) throw new Error('A source file is assigned twice.');
    sourceToRoute.set(source, route);
    routes.add(route);
  }
}

for (const article of config.articles) for (const lang of langs) {
  const source = path.resolve(sourceRoot, article.source[lang]);
  const route = article.path[lang];
  const markdown = await readFile(source, 'utf8');
  if (/brouillon|draft for review|unpublished draft|Sommaire de relecture|Review contents/i.test(markdown)) throw new Error(`Review-only text in ${source}.`);
  const result = renderArticle(markdown, { lang, resolveLink(href) {
    if (/^https:\/\//i.test(href)) return new URL(href).href;
    if (href.startsWith('#')) return href;
    if (/^[a-z]+:/i.test(href) || href.startsWith('/')) throw new Error(`Unsupported link: ${href}`);
    const target = sourceToRoute.get(path.resolve(path.dirname(source), href));
    if (!target) throw new Error(`Unknown local article link: ${href}`);
    return relative(route, target);
  } });
  rendered.set(`${article.id}:${lang}`, { ...result, minutes: Math.max(1, Math.ceil(result.words / 220)) });
}

function page(article, lang) {
  const route = article.path[lang];
  const r = rendered.get(`${article.id}:${lang}`);
  const other = lang === 'en' ? 'fr' : 'en';
  const url = absolute(route);
  const home = `${relative(route, 'index.html')}?lang=${lang}#blog`;
  const image = article.image ? absolute(article.image) : null;
  const description = article.description[lang];
  const locale = lang === 'fr' ? 'fr_FR' : 'en_GB';
  const published = article.published?.[lang];
  const time = value => `<time datetime="${value}">${e(date(value, lang))}</time>`;
  const updatedText = `${lang === 'fr' ? 'Mis à jour le' : 'Updated'} ${time(article.updated)}`;
  const dateText = published
    ? `${lang === 'fr' ? 'Publié le' : 'Published'} ${time(published)}${published !== article.updated ? ' · ' + updatedText : ''}`
    : updatedText;
  const schema = {
    '@context': 'https://schema.org', '@type': 'BlogPosting', '@id': `${url}#article`,
    headline: r.title, description, inLanguage: lang, dateModified: article.updated,
    ...(published ? { datePublished: published } : {}), ...(image ? { image } : {}),
    author: { '@type': 'Person', name: 'Wiyao EDJEOU', url: config.siteUrl },
    mainEntityOfPage: url,
  };
  const languageLinks = langs.map(code => `<a href="${e(relative(route, article.path[code]))}" lang="${code}" hreflang="${code}"${code === lang ? ' aria-current="page"' : ''}>${code === 'fr' ? 'Français' : 'English'}</a>`).join('\n');
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${e(r.title)} — Wiyao EDJEOU</title>
  <meta name="description" content="${e(description)}">
  <meta name="author" content="Wiyao EDJEOU">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
  <meta name="theme-color" content="#0f1417">
  <link rel="canonical" href="${e(url)}">
${langs.map(code => `  <link rel="alternate" hreflang="${code}" href="${e(absolute(article.path[code]))}">`).join('\n')}
  <link rel="alternate" hreflang="x-default" href="${e(absolute(article.path.en))}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Wiyao EDJEOU — Portfolio">
  <meta property="og:url" content="${e(url)}">
  <meta property="og:title" content="${e(r.title)}">
  <meta property="og:description" content="${e(description)}">
  <meta property="og:locale" content="${locale}">
  <meta property="og:locale:alternate" content="${other === 'fr' ? 'fr_FR' : 'en_GB'}">
${image ? `  <meta property="og:image" content="${e(image)}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${lang === 'fr' ? 'Illustration abstraite de topographie et de pression de contact en tribologie' : 'Abstract tribology surface topography and contact-pressure illustration'}">` : ''}
${published ? `  <meta property="article:published_time" content="${published}">` : ''}
  <meta property="article:modified_time" content="${article.updated}">
  <meta property="article:author" content="Wiyao EDJEOU">
  <meta name="twitter:card" content="${image ? 'summary_large_image' : 'summary'}">
  <meta name="twitter:title" content="${e(r.title)}">
  <meta name="twitter:description" content="${e(description)}">
${image ? `  <meta name="twitter:image" content="${e(image)}">` : ''}
  <script type="application/ld+json">${JSON.stringify(schema, null, 2).replace(/</g, '\\u003c')}</script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&amp;family=IBM+Plex+Sans:wght@400;500;600&amp;family=IBM+Plex+Mono:wght@400;500&amp;display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${e(stylesheetHref(route, 'assets/css/article.css'))}">
</head>
<body>
  <a class="skip-link" href="#article-content">${lang === 'fr' ? 'Aller à l’article' : 'Skip to article'}</a>
  <div class="veil">
    <header class="top">
      <a class="back" href="${e(home)}">← W. EDJEOU — ${lang === 'fr' ? 'Portfolio et articles' : 'Portfolio &amp; articles'}</a>
      <nav class="article-languages" aria-label="${lang === 'fr' ? 'Langue de l’article' : 'Article language'}">${languageLinks}</nav>
    </header>
    <main id="article-content">
      <article>
        <p class="eyebrow">${e(article.category[lang])}</p>
        <h1>${e(r.title)}</h1>
        <p class="byline">${lang === 'fr' ? 'Par' : 'By'} <strong>Wiyao EDJEOU, PhD</strong></p>
        <p class="article-meta">${dateText} · ${r.minutes} ${lang === 'fr' ? 'min de lecture' : 'min read'}</p>
        <details class="article-toc"><summary>${lang === 'fr' ? 'Sommaire' : 'Contents'}</summary><ol>${r.outline.map(item => `<li><a href="#${item.id}">${e(item.text)}</a></li>`).join('')}</ol></details>
        <div class="article-body">
${r.html}
        </div>
        <footer class="article-end">
          <a href="${e(home)}">← ${lang === 'fr' ? 'Tous les articles' : 'All articles'}</a>
          <a href="${e(relative(route, article.path[other]))}" lang="${other}" hreflang="${other}">${other === 'fr' ? 'Lire cet article en français' : 'Read this article in English'} →</a>
        </footer>
      </article>
    </main>
  </div>
</body>
</html>
`;
}

for (const article of config.articles) for (const lang of langs) outputs.set(article.path[lang], page(article, lang));

function cards() {
  const introduction = '<p class="blog-intro" data-i18n-text data-en="Five articles in English and French: two method introductions and three research case studies." data-fr="Cinq articles en français et en anglais : deux introductions méthodologiques et trois cas d’étude.">Five articles in English and French: two method introductions and three research case studies.</p>';
  return `${introduction}\n<div class="blog-grid">\n${config.articles.map(article => {
    const en = rendered.get(`${article.id}:en`);
    const fr = rendered.get(`${article.id}:fr`);
    return `<article class="blog-card fade-in" data-article-id="${e(article.id)}">
  <div class="blog-meta"><span data-i18n-text data-en="${e(article.category.en)}" data-fr="${e(article.category.fr)}">${e(article.category.en)}</span><span data-i18n-text data-en="${en.minutes} min read" data-fr="${fr.minutes} min de lecture">${en.minutes} min read</span></div>
  <h3><a href="${e(article.path.en)}" data-href-en="${e(article.path.en)}" data-href-fr="${e(article.path.fr)}" data-i18n-text data-en="${e(en.title)}" data-fr="${e(fr.title)}">${e(en.title)}</a></h3>
  <p data-i18n-text data-en="${e(article.description.en)}" data-fr="${e(article.description.fr)}">${e(article.description.en)}</p>
  <div class="blog-actions"><a class="blog-link" href="${e(article.path.en)}" data-href-en="${e(article.path.en)}" data-href-fr="${e(article.path.fr)}" data-i18n-text data-en="Read article ↗" data-fr="Lire l’article ↗">Read article ↗</a><span class="blog-languages"><a href="${e(article.path.fr)}" lang="fr" hreflang="fr">Français</a><a href="${e(article.path.en)}" lang="en" hreflang="en">English</a></span></div>
</article>`;
  }).join('\n')}\n</div>`;
}

const index = await readFile(path.join(root, 'index.html'), 'utf8');
const start = '<!-- articles:generated:start -->';
const end = '<!-- articles:generated:end -->';
if (index.split(start).length !== 2 || index.split(end).length !== 2) throw new Error('Expected exactly one generated article region in index.html.');
const home = index.slice(0, index.indexOf(start) + start.length) + '\n' + cards() + '\n' + index.slice(index.indexOf(end));
const homeStyle = /<link rel="stylesheet" href="assets\/css\/main\.css(?:\?[^"]*)?">/g;
if ([...home.matchAll(homeStyle)].length !== 1) throw new Error('Expected exactly one main stylesheet in index.html.');
outputs.set('index.html', home.replace(homeStyle, `<link rel="stylesheet" href="${e(stylesheetHref('index.html', 'assets/css/main.css'))}">`));

const sitemap = [`<?xml version="1.0" encoding="UTF-8"?>`, '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">', `  <url><loc>${e(config.siteUrl)}</loc><lastmod>${config.homeUpdated}</lastmod></url>`];
for (const article of config.articles) for (const lang of langs) {
  sitemap.push(`  <url><loc>${e(absolute(article.path[lang]))}</loc><lastmod>${article.updated}</lastmod>${langs.map(code => `<xhtml:link rel="alternate" hreflang="${code}" href="${e(absolute(article.path[code]))}"/>`).join('')}<xhtml:link rel="alternate" hreflang="x-default" href="${e(absolute(article.path.en))}"/></url>`);
}
sitemap.push('</urlset>', '');
outputs.set('sitemap.xml', sitemap.join('\n'));

const stale = [];
for (const [file, content] of outputs) {
  const target = path.join(root, file);
  const current = await readFile(target, 'utf8').catch(error => { if (error.code === 'ENOENT') return null; throw error; });
  if (current === content) continue;
  if (check) { stale.push(file); continue; }
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, content);
}
if (stale.length) throw new Error(`Generated files are out of date. Run node scripts/build-articles.mjs:\n${stale.join('\n')}`);
console.log(`${check ? 'Checked' : 'Built'} ${routes.size} article pages, the home article list and the sitemap.`);
