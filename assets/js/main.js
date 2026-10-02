// One Carolina Transit — main.js
// Vanilla JS only, no dependencies. Handles: mobile nav, scroll-reveal, FAQ accordion,
// fare calculator, and home-screen app support (service worker + install card).

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollReveal();
  initFaqAccordion();
  initFareCalculator();
  initInstallCard();
});

registerServiceWorker();


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

/* ---------- Fare calculator (Request a Ride page) ---------- */
/* Pricing per owner: $10 loading fee + $1.85/mile, calculated round trip. */
function initFareCalculator() {
  const btn = document.getElementById('fare-calc-btn');
  const input = document.getElementById('fare-miles');
  const result = document.getElementById('fare-result');
  if (!btn || !input || !result) return;

  const LOADING_FEE = 10;
  const PER_MILE = 1.85;

  function calculate() {
    const miles = parseFloat(input.value);
    if (isNaN(miles) || miles < 0) {
      result.textContent = 'Enter a valid round-trip mileage to see an estimate.';
      return;
    }
    const fare = LOADING_FEE + PER_MILE * miles;
    result.textContent = 'Estimated fare: $' + fare.toFixed(2);
  }

  btn.addEventListener('click', calculate);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      calculate();
    }
  });
}

/* ---------- Home-screen app (PWA) ---------- */
function registerServiceWorker() {
  if (!('serviceWorker' in navigator) || !/^https?:$/.test(location.protocol)) return;
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}

// Chrome/Edge on Android fire beforeinstallprompt; keep it so our button can open the install dialog.
let deferredInstallPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  showInstallButton();
});

function isInstalledApp() {
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
}

function showInstallButton() {
  const btn = document.getElementById('install-btn');
  if (btn && deferredInstallPrompt) btn.classList.remove('hidden');
}

// Card on the Request a Ride page. Without JS it shows the written steps for both phones.
function initInstallCard() {
  const card = document.getElementById('install-card');
  if (!card) return;
  if (isInstalledApp()) {
    card.classList.add('hidden');
    return;
  }

  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const ios = document.getElementById('install-steps-ios');
  const android = document.getElementById('install-steps-android');
  if (isIOS && android) android.classList.add('hidden');
  if (!isIOS && /android/i.test(navigator.userAgent) && ios) ios.classList.add('hidden');

  const btn = document.getElementById('install-btn');
  if (btn) {
    btn.addEventListener('click', async () => {
      if (!deferredInstallPrompt) return;
      deferredInstallPrompt.prompt();
      await deferredInstallPrompt.userChoice;
      deferredInstallPrompt = null;
      btn.classList.add('hidden');
    });
  }
  showInstallButton();

  window.addEventListener('appinstalled', () => card.classList.add('hidden'));
}
