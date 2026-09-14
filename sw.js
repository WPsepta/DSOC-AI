// DSOC AI — Service Worker (bersih, tanpa iklan pihak ketiga)
const CACHE = 'dsoc-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/landing.html',
  '/login.html',
  '/styles.css',
  '/main.js',
  '/auth-guard.js',
  '/pwa-register.js',
  '/favicon.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS).catch(() => {})));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request).catch(() => res))
  );
});