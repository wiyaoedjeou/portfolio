/**
 * main.js — Entry point
 * Initialises all modules after DOM is ready.
 */

import { initLang }         from './lang.js';
import { initAnimations }   from './animations.js';
import { initPublications } from './publications.js';
import { initContact }      from './contact.js';

document.documentElement.classList.add('js');

function initNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const navList = document.getElementById('nav-links');
  const menuButton = document.getElementById('nav-menu-toggle');

  function closeMenu() {
    navList?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }

  menuButton?.addEventListener('click', () => {
    const isOpen = navList?.classList.toggle('open') || false;
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
  navLinks.forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });

  if (!('IntersectionObserver' in window)) return;
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`);
          });
        }
      });
    },
    { threshold: 0.01, rootMargin: '-20% 0px -70% 0px' }
  );

  sections.forEach(s => sectionObserver.observe(s));
}

document.addEventListener('DOMContentLoaded', () => {
  initLang();
  initAnimations();
  initPublications();
  initContact();
  initNavigation();
});
