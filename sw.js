/*
  One Carolina Transit — service worker (home-screen app support).

  Network first for every same-origin GET, so riders always get the latest prices
  and policies when they have a connection. The cache is only a fallback for weak
  or no signal. Cross-origin requests (Formspree, Google Fonts, Maps) are never
  touched, and form submissions (POST) always go straight to the network.

  Bump CACHE_VERSION when the precache list changes.
*/
const CACHE_VERSION = 'oct-v1';
const CACHE = 'oct-' + CACHE_VERSION;
const NETWORK_TIMEOUT_MS = 4000;

const PRECACHE = [
  './',
  'index.html',
  'about.html',
  'services.html',
  'service-areas.html',
  'faq.html',
  'contact.html',
  'request-a-ride.html',
  'pay.html',
  'offline.html',
  'manifest.webmanifest',
  'assets/css/tailwind.css',
  'assets/css/custom.css',
  'assets/js/main.js',
  'assets/js/forms.js',
  'assets/js/pay.js',
  'assets/js/payment-config.js',
  'assets/images/emblem.svg',
  'assets/images/logo-full-white.svg',
  'assets/images/favicon.svg',
  'assets/images/icon-192.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('oct-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  event.respondWith(networkFirst(event));
});

async function networkFirst(event) {
  const req = event.request;
  const cache = await caches.open(CACHE);

  const network = fetch(req).then((res) => {
    if (res.ok && res.type === 'basic') event.waitUntil(cache.put(req, res.clone()));
    return res;
  });
  network.catch(() => {}); // a late failure after the timeout already served the cache is fine


  // On a slow connection, show the saved copy after a few seconds instead of a blank screen.
  const timeout = new Promise((resolve) => setTimeout(resolve, NETWORK_TIMEOUT_MS));

  try {
    const first = await Promise.race([network, timeout]);
    if (first) return first;
    const cached = await cache.match(req, { ignoreSearch: req.mode === 'navigate' });
    return cached || await network;
  } catch (err) {
    const cached = await cache.match(req, { ignoreSearch: req.mode === 'navigate' });
    if (cached) return cached;
    if (req.mode === 'navigate') return cache.match('offline.html');
    throw err;
  }
}
