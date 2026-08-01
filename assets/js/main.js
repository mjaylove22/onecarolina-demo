// One Carolina Transit — main.js
// Vanilla JS only, no dependencies. Handles: mobile nav, scroll-reveal, FAQ accordion.

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollReveal();
  initFaqAccordion();
});

/* ---------- Mobile navigation ---------- */
function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    menu.classList.toggle('hidden');
    menu.style.maxHeight = isOpen ? '0px' : menu.scrollHeight + 'px';
  });

  // Close menu on Escape for keyboard users
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      toggle.click();
      toggle.focus();
    }
  });
}

/* ---------- Scroll reveal ---------- */
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  // Respect reduced-motion users — CSS already handles the visual fallback,
  // but skip the observer entirely to save a little work.
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  items.forEach((el) => observer.observe(el));
}

/* ---------- FAQ accordion ---------- */
function initFaqAccordion() {
  const triggers = document.querySelectorAll('.faq-trigger');
  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      const panelId = trigger.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);

      // Close any other open panel (single-open accordion behavior)
      triggers.forEach((t) => {
        if (t !== trigger) {
          t.setAttribute('aria-expanded', 'false');
          const otherPanel = document.getElementById(t.getAttribute('aria-controls'));
          if (otherPanel) otherPanel.classList.add('hidden');
        }
      });

      trigger.setAttribute('aria-expanded', String(!expanded));
      if (panel) panel.classList.toggle('hidden', expanded);
    });
  });
}