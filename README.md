# Wiyao EDJEOU — Portfolio

Static bilingual portfolio for Wiyao EDJEOU, PhD engineer in tribology and contact mechanics.

**Live site:** <https://wiyaoedjeou.github.io/portfolio/>

## What is included

- English/French landing page with experience, expertise, services, and contact sections.
- Six hand-curated research works in `data/publications.json`.
- A link to ResearchGate for the complete publication record.
- Two long-form technical articles in `blog/`.
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
│   └── multiscale-roughness-skid-resistance.html
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
node scripts/validate.mjs
node --check assets/js/*.js
```

The validator checks the six selected research entries, duplicate HTML IDs, structured data, and local file references.

## Updating the selected research

Edit `data/publications.json` manually. Keep exactly six representative works on the portfolio; the ResearchGate call to action is the path to the full list. Each public record should retain its verified citation, DOI or source URL, and both English and French editorial summaries.

## Contact form

The form uses the EmailJS browser SDK and is configured in `assets/js/contact.js`. It includes native required-field validation, a honeypot, and a lightweight per-session rate limit. If the EmailJS runtime is unavailable, the interface directs visitors to the public email address instead of failing silently.

EmailJS public keys are designed for client-side use, but sending restrictions should still be configured in the EmailJS dashboard for the production domain.
