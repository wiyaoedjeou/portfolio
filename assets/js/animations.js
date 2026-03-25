/**
 * animations.js
 * Handles scroll-triggered fade-in animations.
 * Fixed: immediately reveals elements already in viewport on load/anchor navigation.
 */

const VISIBLE_CLASS = 'visible';
const FADE_SELECTOR = '.fade-in';

function revealElement(el) {
  el.classList.add(VISIBLE_CLASS);
}

function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight - 30 && rect.bottom > 0;
}

export function initAnimations() {
  const elements = document.querySelectorAll(FADE_SELECTOR);
  if (!elements.length) return;

  // Immediately reveal elements already visible (fixes anchor navigation bug)
  elements.forEach(el => {
    if (isInViewport(el)) revealElement(el);
  });

  if (!('IntersectionObserver' in window)) {
    // Fallback: reveal all
    elements.forEach(revealElement);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          revealElement(entry.target);
          observer.unobserve(entry.target); // stop watching once revealed
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
  );

  elements.forEach(el => {
    if (!el.classList.contains(VISIBLE_CLASS)) {
      observer.observe(el);
    }
  });

  // Re-check on scroll for any stragglers
  let scrollTimer;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      document.querySelectorAll(`${FADE_SELECTOR}:not(.${VISIBLE_CLASS})`).forEach(el => {
        if (isInViewport(el)) revealElement(el);
      });
    }, 50);
  }, { passive: true });
}
