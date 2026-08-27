import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const config = JSON.parse(await readFile(path.join(root, 'content/articles/index.json'), 'utf8'));
const digest = bytes => createHash('sha256').update(bytes).digest('hex').slice(0, 12);
const stylesheet = html => html.match(/<link rel="stylesheet" href="([^"]+\.css\?v=[a-f0-9]{12})">/)?.[1];

test('all public articles expose consistent first-publication dates without changing legacy dates', async () => {
  const firstDates = {
    'water-spray': { en: '2026-08-27', fr: '2026-08-27' },
    'rail-grinding': { en: '2026-08-27', fr: '2026-08-27' },
    'new-pavement': { en: '2026-08-27', fr: '2026-08-27' },
    bem: { en: '2026-08-26', fr: '2026-08-27' },
    multiscale: { en: '2026-08-26', fr: '2026-08-27' },
  };
  for (const article of config.articles) for (const lang of ['en', 'fr']) {
    const published = article.published[lang];
    assert.match(published, /^\d{4}-\d{2}-\d{2}$/);
    if (firstDates[article.id]) assert.equal(published, firstDates[article.id][lang]);
    const html = await readFile(path.join(root, article.path[lang]), 'utf8');
    const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    assert.equal(schema.datePublished, published);
    assert.equal(schema.dateModified, article.updated);
    assert.ok(html.includes(`<meta property="article:published_time" content="${published}">`));
    const visible = html.match(/<p class="article-meta">([\s\S]*?)<\/p>/)[1];
    assert.ok(visible.startsWith(`${lang === 'fr' ? 'Publié le' : 'Published'} <time datetime="${published}">`));
    assert.equal((visible.match(/<time /g) || []).length, published === article.updated ? 1 : 2);
  }
});

test('every public page references the current version of its local stylesheet', async () => {
  const files = ['index.html', ...config.articles.flatMap(article => [article.path.en, article.path.fr])];
  for (const file of files) {
    const href = stylesheet(await readFile(path.join(root, file), 'utf8'));
    assert.ok(href, file);
    const [css, query] = href.split('?');
    const bytes = await readFile(path.resolve(root, path.dirname(file), css));
    assert.equal(new URLSearchParams(query).get('v'), digest(bytes), file);
  }
});

test('CSS edits invalidate only their own URLs; rebuilding is deterministic and check mode never writes', async () => {
  const fixture = await mkdtemp(path.join(tmpdir(), 'portfolio-release-test-'));
  try {
    for (const file of ['scripts', 'content/articles', 'assets/css', 'index.html']) {
      const target = path.join(fixture, file);
      await mkdir(path.dirname(target), { recursive: true });
      await cp(path.join(root, file), target, { recursive: true });
    }
    const build = (...args) => spawnSync(process.execPath, ['scripts/build-articles.mjs', ...args], { cwd: fixture, encoding: 'utf8' });
    const read = file => readFile(path.join(fixture, file), 'utf8');
    let result = build();
    assert.equal(result.status, 0, result.stderr);
    const firstHome = await read('index.html');
    const articleFile = config.articles[0].path.en;
    const firstArticle = await read(articleFile);
    assert.equal(build('--check').status, 0);
    assert.equal(build().status, 0);
    assert.equal(await read('index.html'), firstHome);
    assert.equal(await read(articleFile), firstArticle);

    await writeFile(path.join(fixture, 'assets/css/main.css'), await read('assets/css/main.css') + '\n/* test change */\n');
    result = build('--check');
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /index\.html/);
    assert.equal(await read('index.html'), firstHome);
    assert.equal(build().status, 0);
    const secondHome = await read('index.html');
    assert.notEqual(stylesheet(secondHome), stylesheet(firstHome));
    assert.equal(await read(articleFile), firstArticle);

    await writeFile(path.join(fixture, 'assets/css/article.css'), await read('assets/css/article.css') + '\n/* test change */\n');
    assert.notEqual(build('--check').status, 0);
    assert.equal(await read(articleFile), firstArticle);
    assert.equal(build().status, 0);
    assert.equal(await read('index.html'), secondHome);
    assert.notEqual(stylesheet(await read(articleFile)), stylesheet(firstArticle));
    assert.equal(build('--check').status, 0);
  } finally {
    await rm(fixture, { recursive: true, force: true });
  }
});
