/**
 * main.js — Entry point
 * Initialises all modules after DOM is ready.
 */

import { initLang }         from './lang.js';
import { initAnimations }   from './animations.js';
import { initPublications } from './publications.js';
import { initContact }      from './contact.js';

document.addEventListener('DOMContentLoaded', () => {
  initLang();
  initAnimations();
  initPublications();
  initContact();

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

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
    { threshold: 0.3 }
  );

  sections.forEach(s => sectionObserver.observe(s));
});
