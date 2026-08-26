/**
 * contact.js
 * Handles the contact form using EmailJS.
 * Emails are sent directly to wiyaoedjeou@outlook.com without any backend.
 *
 * Setup (one-time):
 *  1. Create free account at https://www.emailjs.com
 *  2. Add your Outlook account as a service → copy SERVICE_ID
 *  3. Create an email template → copy TEMPLATE_ID
 *  4. Copy your Public Key from Account > API Keys
 *  5. Replace the 3 constants below.
 */

const EMAILJS_PUBLIC_KEY  = 'Ult9rt0NL2TWEpvOI';  
const EMAILJS_SERVICE_ID  = 'service_1m7gsrb';
const EMAILJS_TEMPLATE_ID = 'template_vt2jpi5'; 

// Rate limiting: max 3 submissions per hour
const RATE_KEY   = 'contact_submits';
const RATE_LIMIT = 3;
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

function getRateLimitData() {
  try {
    return JSON.parse(sessionStorage.getItem(RATE_KEY) || '{"count":0,"since":0}');
  } catch { return { count: 0, since: 0 }; }
}

function isRateLimited() {
  const data = getRateLimitData();
  const now = Date.now();
  if (now - data.since > RATE_WINDOW) return false; // window reset
  return data.count >= RATE_LIMIT;
}

function recordSubmission() {
  try {
    const data = getRateLimitData();
    const now = Date.now();
    if (now - data.since > RATE_WINDOW) {
      sessionStorage.setItem(RATE_KEY, JSON.stringify({ count: 1, since: now }));
    } else {
      sessionStorage.setItem(RATE_KEY, JSON.stringify({ count: data.count + 1, since: data.since }));
    }
  } catch { /* Storage failure must not block a legitimate message. */ }
}

function setStatus(form, type, msgEn, msgFr) {
  let status = form.querySelector('.form-status');
  if (!status) {
    status = document.createElement('div');
    status.className = 'form-status';
    form.appendChild(status);
  }
  status.className = `form-status form-status--${type}`;
  const lang = document.documentElement.getAttribute('lang') || 'en';
  status.textContent = lang === 'fr' ? msgFr : msgEn;
  status.setAttribute('role', 'alert');
}

function setLoading(btn, loading) {
  if (!btn) return;
  const lang = document.documentElement.getAttribute('lang') || 'en';
  btn.disabled = loading;
  btn.textContent = loading
    ? (lang === 'fr' ? 'Envoi en cours…' : 'Sending…')
    : (btn.getAttribute(`data-${lang}`) || btn.textContent);
}

export function initContact() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const btn = form.querySelector('[type="submit"]');

  // EmailJS SDK is loaded via <script> in index.html
  if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Honeypot check (bots fill hidden field)
    if (form.querySelector('[name="_honey"]')?.value) return;

    if (isRateLimited()) {
      setStatus(form, 'error',
        'Too many messages sent. Please try again in an hour.',
        'Trop de messages envoyés. Veuillez réessayer dans une heure.'
      );
      return;
    }

    // Validate required fields
    const email = form.querySelector('[name="email"]')?.value?.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setStatus(form, 'error', 'Please enter a valid email address.', 'Veuillez entrer une adresse email valide.');
      return;
    }

    if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY' || typeof emailjs === 'undefined') {
      setStatus(form, 'error',
        'Contact form not configured yet. Please email wiyaoedjeou@outlook.com directly.',
        'Formulaire non configuré. Envoyez un email à wiyaoedjeou@outlook.com.'
      );
      return;
    }

    setLoading(btn, true);

    const templateParams = {
      from_name    : form.querySelector('[name="firstname"]')?.value?.trim(),
      from_company : form.querySelector('[name="company"]')?.value?.trim(),
      from_email   : email,
      mission_type : form.querySelector('[name="mission_type"]')?.value,
      message      : form.querySelector('[name="message"]')?.value?.trim(),
      to_email     : 'wiyaoedjeou@outlook.com',
    };

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
      recordSubmission();
      form.reset();
      setStatus(form, 'success',
        '✓ Message sent! I will reply within 24 hours.',
        '✓ Message envoyé ! Je vous réponds sous 24 heures.'
      );
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus(form, 'error',
        'Sending failed. Please email wiyaoedjeou@outlook.com directly.',
        "Échec de l'envoi. Envoyez un email à wiyaoedjeou@outlook.com."
      );
    } finally {
      setLoading(btn, false);
    }
  });
}
