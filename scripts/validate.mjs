import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const htmlFiles = [
  'index.html',
  'blog/bem-rough-contact.html',
  'blog/multiscale-roughness-skid-resistance.html',
];
const errors = [];

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

const publicationPath = path.join(root, 'data/publications.json');
const publications = JSON.parse(await readFile(publicationPath, 'utf8'));

if (publications.length !== 6) {
  errors.push(`Expected exactly six selected research works; found ${publications.length}.`);
}

const publicationIds = new Set();
for (const publication of publications) {
  if (!publication.id || publicationIds.has(publication.id)) {
    errors.push(`Missing or duplicate publication id: ${publication.id || '(empty)'}.`);
  }
  publicationIds.add(publication.id);

  for (const field of ['year', 'title', 'authors', 'journal']) {
    if (!publication[field]) errors.push(`${publication.id}: missing ${field}.`);
  }
  for (const field of ['tag', 'highlight', 'abstract']) {
    if (!publication[field]?.en || !publication[field]?.fr) {
      errors.push(`${publication.id}: ${field} must contain en and fr values.`);
    }
  }
}

for (const relativeFile of htmlFiles) {
  const absoluteFile = path.join(root, relativeFile);
  const html = await readFile(absoluteFile, 'utf8');
  const ids = [...html.matchAll(/\sid=["']([^"']+)["']/g)].map(match => match[1]);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicateIds.length) {
    errors.push(`${relativeFile}: duplicate ids: ${[...new Set(duplicateIds)].join(', ')}.`);
  }

  for (const match of html.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(match[1]);
    } catch (error) {
      errors.push(`${relativeFile}: invalid JSON-LD (${error.message}).`);
    }
  }

  for (const match of html.matchAll(/\s(?:href|src)=["']([^"']+)["']/g)) {
    const reference = match[1];
    if (/^(?:https?:|mailto:|tel:|#|data:)/.test(reference)) continue;
    const cleanReference = decodeURIComponent(reference.split(/[?#]/)[0]);
    const target = path.resolve(path.dirname(absoluteFile), cleanReference || '.');
    if (!(await exists(target))) errors.push(`${relativeFile}: missing local reference ${reference}.`);
  }
}

if (errors.length) {
  console.error(errors.map(error => `- ${error}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Validation passed: ${htmlFiles.length} HTML pages and ${publications.length} selected research works.`);
}
