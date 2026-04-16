const CACHE = 'srn-minuteur-intervalle-v4';
const FILES = [
  '/minuteur-intervalle/',
  '/minuteur-intervalle/index.html',
  '/minuteur-intervalle/manifest.json'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(FILES);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
