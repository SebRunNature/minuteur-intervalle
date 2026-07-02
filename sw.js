const CACHE = 'srn-minuteur-intervalle-v8';
const FILES = [
  '/minuteur-intervalle/',
  '/minuteur-intervalle/index.html',
  '/minuteur-intervalle/manifest.json',
  '/minuteur-intervalle/icon_minuteur.svg',
  '/minuteur-intervalle/icon-192.png',
  '/minuteur-intervalle/icon-512.png'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(FILES);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(key) { return key !== CACHE; })
            .map(function(key) { return caches.delete(key); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  if (e.request.method !== 'GET') return;

  // HTML / navigation : NETWORK-FIRST
  // → les mises à jour de l'app arrivent immédiatement, sans bump de version,
  //   et le cache sert de filet de sécurité hors ligne.
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .then(function(response) {
          const copy = response.clone();
          caches.open(CACHE).then(function(cache) { cache.put(e.request, copy); });
          return response;
        })
        .catch(function() {
          return caches.match(e.request).then(function(cached) {
            return cached || caches.match('/minuteur-intervalle/index.html');
          });
        })
    );
    return;
  }

  // Assets (icônes, manifest, polices...) : CACHE-FIRST avec mise en cache au vol
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      if (cached) return cached;
      return fetch(e.request).then(function(response) {
        const url = e.request.url;
        const cacheable = response.ok && (
          url.startsWith(self.location.origin) ||
          url.includes('fonts.googleapis.com') ||
          url.includes('fonts.gstatic.com')
        );
        if (cacheable) {
          const copy = response.clone();
          caches.open(CACHE).then(function(cache) { cache.put(e.request, copy); });
        }
        return response;
      }).catch(function() {
        return cached;
      });
    })
  );
});
