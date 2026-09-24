/* Offline support. Bump CACHE when any file below changes, otherwise phones
 * keep serving the old copy. */
var CACHE = 'sentiq21-v5';

var SHELL = [
  './',
  'index.html',
  'manifest.webmanifest',
  'config.js',
  'css/styles.css',
  'js/i18n.js',
  'js/data.js',
  'js/scoring.js',
  'js/storage.js',
  'js/supabase.js',
  'js/advice.js',
  'js/printout.js',
  'js/install.js',
  'js/app.js',
  'icons/logo.png',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png',
  'icons/favicon.ico',
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(SHELL);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (names) {
      return Promise.all(names.map(function (name) {
        return name === CACHE ? null : caches.delete(name);
      }));
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function (event) {
  var request = event.request;
  if (request.method !== 'GET') return;

  var url = new URL(request.url);
  /* Never cache Supabase - it must always hit the network. */
  if (url.origin !== self.location.origin) return;

  /* Network-first for the page itself so an update is picked up quickly,
   * cache-first for the static assets. */
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(function () {
        return caches.match('index.html');
      })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(function (cached) {
      return cached || fetch(request).then(function (response) {
        if (response.ok) {
          var copy = response.clone();
          caches.open(CACHE).then(function (cache) {
            cache.put(request, copy);
          });
        }
        return response;
      });
    })
  );
});
