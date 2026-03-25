/**
 * animations.js
 * Handles scroll-triggered fade-in animations.
 *
 * Root cause of anchor-navigation bug:
 *   ES modules run after DOMContentLoaded, but the browser scrolls to
 *   the hash (#section) AFTER the module executes — without firing a
 *   scroll event. So a single isInViewport() check at init time misses
 *   elements that land in the viewport only after the hash-scroll.
 *
 * Fix strategy:
 *   1. Check immediately on init.
 *   2. Double requestAnimationFrame — fires after the browser has painted
 *      and applied the hash-scroll position.
 *   3. window 'load' + rAF — catches late-loading layouts.
 *   4. 'hashchange' listener — covers nav-link clicks.
 *   5. 'scroll' debounced listener — covers manual scrolling.
 *   6. IntersectionObserver — efficient ongoing detection.
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

function revealAllVisible() {
  document.querySelectorAll(`${FADE_SELECTOR}:not(.${VISIBLE_CLASS})`).forEach(el => {
    if (isInViewport(el)) revealElement(el);
  });
}

export function initAnimations() {
  if (!document.querySelectorAll(FADE_SELECTOR).length) return;

  // 1. Immediate check
  revealAllVisible();

  // 2. Double rAF: browser applies hash-scroll between these two frames
  requestAnimationFrame(() => {
    revealAllVisible();
    requestAnimationFrame(revealAllVisible);
  });

  // 3. After full page load (fonts, images → layout is stable)
  window.addEventListener('load', () => requestAnimationFrame(revealAllVisible), { once: true });

  // 4. Hash change (nav link clicks like #freelance, #contact)
  window.addEventListener('hashchange', () => {
    setTimeout(revealAllVisible, 0);
    setTimeout(revealAllVisible, 100);
  });

  if (!('IntersectionObserver' in window)) {
    // Fallback for very old browsers: reveal everything
    document.querySelectorAll(FADE_SELECTOR).forEach(revealElement);
    return;
  }

  // 5. IntersectionObserver for elements scrolled into view normally
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          revealElement(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05, rootMargin: '0px 0px -10px 0px' }
  );

  document.querySelectorAll(FADE_SELECTOR).forEach(el => {
    if (!el.classList.contains(VISIBLE_CLASS)) observer.observe(el);
  });

  // 6. Scroll debounce — belt-and-suspenders fallback
  let scrollTimer;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(revealAllVisible, 50);
  }, { passive: true });
}
