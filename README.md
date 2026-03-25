# Wiyao EDJEOU — Portfolio

Portfolio website for Wiyao EDJEOU, Tribology & Contact Mechanics Engineer.

**Live:** https://wiyaoedjeou.github.io/portfolio/

## Structure

```
portfolio/
├── index.html                          # Main HTML (semantic, accessible)
├── assets/
│   ├── css/
│   │   └── main.css                    # All styles
│   └── js/
│       ├── main.js                     # Entry point
│       ├── lang.js                     # EN/FR language toggle
│       ├── animations.js               # Scroll-triggered fade-in (fixed)
│       ├── publications.js             # Dynamic publications renderer
│       └── contact.js                  # EmailJS contact form
├── data/
│   └── publications.json               # Publication data (auto-updated weekly)
└── .github/
    ├── workflows/
    │   └── update-publications.yml     # Weekly GitHub Action
    └── scripts/
        └── fetch_publications.py       # Semantic Scholar fetcher
```

## Setup: Contact Form (EmailJS)

The contact form sends emails directly to `wiyaoedjeou@outlook.com` via [EmailJS](https://www.emailjs.com) (free, 200 emails/month, no backend needed).

1. Create a free account at https://www.emailjs.com
2. Add **Email Service** → connect your Outlook account → copy `SERVICE_ID`
3. Create **Email Template** with these variables:
   ```
   From: {{from_name}} ({{from_company}}) <{{from_email}}>
   Subject: [Portfolio] New message — {{mission_type}}
   Body: {{message}}
   ```
   Copy `TEMPLATE_ID`
4. Go to **Account → API Keys** → copy your `PUBLIC_KEY`
5. Edit `assets/js/contact.js` and replace the 3 constants at the top:
   ```js
   const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
   const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
   const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
   ```
6. Commit and push — the form is now live.

## Setup: Auto-update Publications

Publications are automatically fetched from [Semantic Scholar](https://www.semanticscholar.org) every Monday via GitHub Actions.

- **Manual trigger:** Go to Actions → "Update Publications" → Run workflow
- **Customize:** Edit `.github/scripts/fetch_publications.py`
- **Hand-curated data** (highlights, FR abstracts) in `data/publications.json` is preserved during updates

## Local Development

```bash
# Simple static server (Python)
python3 -m http.server 8080
# Then open: http://localhost:8080
```

> Note: ES modules require a server (not `file://`). Use the command above for local testing.
