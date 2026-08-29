# Wiyao EDJEOU — Portfolio

Static bilingual portfolio for Wiyao EDJEOU, PhD engineer in tribology and contact mechanics.

**Live site:** <https://wiyaoedjeou.github.io/portfolio/>

## What is included

- English/French landing page with experience, expertise, services, and contact sections.
- Six hand-curated research works in `data/publications.json`.
- A link to ResearchGate for the complete publication record.
- Five long-form technical articles, each available in English and French.
- Article sources in `content/articles/`; generated pages in `blog/` and `fr/blog/`.
- Progressive enhancement: the selected research remains readable and indexable if JavaScript or the JSON request fails.
- Responsive navigation, reduced-motion support, visible keyboard focus, and native form validation.

## Project structure

```text
portfolio/
├── index.html
├── assets/
│   ├── css/
│   │   ├── main.css
│   │   └── article.css
│   ├── images/
│   │   └── og-tribology-contact.jpg
│   └── js/
│       ├── main.js
│       ├── lang.js
│       ├── animations.js
│       ├── publications.js
│       └── contact.js
├── blog/
│   ├── bem-rough-contact.html
│   ├── multiscale-roughness-skid-resistance.html
│   └── three additional English articles
├── fr/blog/
│   └── five French articles
├── content/articles/
│   └── bilingual Markdown sources and metadata
├── data/publications.json
├── scripts/validate.mjs
├── robots.txt
└── sitemap.xml
```

## Local development

ES modules and the JSON request require an HTTP server rather than a direct `file://` opening:

```bash
python3 -m http.server 8080
```

Then open <http://localhost:8080>.

## Validation

Run the repository checks before publishing:

```bash
node scripts/build-articles.mjs --check
node scripts/validate.mjs
node --test scripts/test-*.mjs
for file in assets/js/*.js scripts/*.mjs; do node --check "$file"; done
```

The article builder verifies each source and generates ten static pages, the home article cards, and the sitemap. The validator checks the six selected research entries, every generated page, language alternates, duplicate HTML IDs, publication dates, structured data, local file references, and content-based CSS versions.

## Updating the selected research

Edit `data/publications.json` manually. Keep exactly six representative works on the portfolio; the ResearchGate call to action is the path to the full list. Each public record should retain its verified citation, DOI or source URL, and both English and French editorial summaries.

## Contact form

The form uses the EmailJS browser SDK and is configured in `assets/js/contact.js`. It includes native required-field validation, a honeypot, and a lightweight per-session rate limit. If the EmailJS runtime is unavailable, the interface directs visitors to the public email address instead of failing silently.

EmailJS public keys are designed for client-side use, but sending restrictions should still be configured in the EmailJS dashboard for the production domain.

The contact tests use a simulated EmailJS service: they never send email. They cover required fields, the honeypot, rate limiting, French/English messages, successful and failed sends, and an unavailable SDK. Confirm actual delivery separately with a real message and the recipient's inbox.


## Editing bilingual articles

1. Edit the approved English and French Markdown files in `content/articles/en/` and `content/articles/fr/`.
2. Update the descriptions, categories and modification date in `content/articles/index.json`; keep `featured: true` on exactly one article.
3. Regenerate the static website with `node scripts/build-articles.mjs` after editing articles or either CSS file.
4. Run the validation commands above, review locally, and publish only after approval.

The ten HTML pages, home-page article cards and sitemap are generated outputs. Commit them together with their Markdown sources when publishing to GitHub Pages; no Node runtime is needed on the public website. Do not hand-edit the generated article pages or the marked article-card region in `index.html`.

The renderer supports headings (H2/H3), paragraphs, links, emphasis, inline code, flat lists and simple tables. It escapes raw HTML and rejects unknown local article links. Add support and tests before using other Markdown features.

Keep existing public URLs stable. The original English BEM and multiscale article addresses are retained. Each language has a self-referencing canonical and reciprocal English/French alternate links; the home page links to both languages even without JavaScript. The landing-page language toggle remains a JavaScript enhancement and is not a separate French landing page.

`published.en` and `published.fr` record actual first-publication dates. The original English BEM and multiscale articles retain 26 August 2026; the other eight language versions were first published on 27 August 2026. Dates are shown to readers and included in structured data. Set the actual first-publication date for future articles before publishing; do not substitute a translation or revision date for an existing first-publication date.

The builder adds `?v=<content hash>` to local stylesheet URLs. The version changes only when the corresponding CSS content changes, so repeat builds remain stable while browsers can fetch updated styles. After a CSS edit, rebuild and commit the regenerated HTML along with the CSS. Both `--check` and the validator reject outdated stylesheet versions.

The proposed scientific illustrations are not included at this stage. The existing preview image is preserved for the two legacy articles and their translations; the three new articles do not claim a record-specific illustration that has not been prepared.
