// ═══════════════════════════════════════════════
//  Career Finder AI — Service Worker v1.0
//  Provides offline support & asset caching
// ═══════════════════════════════════════════════

const CACHE_NAME    = 'career-finder-v1.0.0';
const OFFLINE_URL   = './index.html';

// Assets to cache on install
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap'
];


// ─────────────────────────────────────────
// INSTALL — precache core assets
// ─────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Cache what we can; ignore failures for external fonts
      return Promise.allSettled(
        PRECACHE_URLS.map(url => cache.add(url).catch(() => null))
      );
    }).then(() => self.skipWaiting())
  );
});


// ─────────────────────────────────────────
// ACTIVATE — clean up old caches
// ─────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});


// ─────────────────────────────────────────
// FETCH — Cache-first for local assets,
//          Network-first for API calls
// ─────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip API calls (OpenAI, analytics etc.)
  const isAPICall = url.hostname.includes('openai.com') ||
                    url.hostname.includes('api.anthropic.com') ||
                    url.hostname.includes('analytics');

  if (isAPICall) {
    // Always try network for API calls, fallback gracefully
    event.respondWith(
      fetch(request).catch(() => new Response(
        JSON.stringify({ error: 'offline' }),
        { headers: { 'Content-Type': 'application/json' }, status: 503 }
      ))
    );
    return;
  }

  // For navigation requests — serve cached page when offline
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.match(OFFLINE_URL))
    );
    return;
  }

  // Cache-first strategy for all other assets
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;

      return fetch(request).then((response) => {
        // Only cache successful responses
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }

        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseToCache);
        });

        return response;
      }).catch(() => {
        // Return a minimal offline fallback for images/fonts
        if (request.destination === 'image') {
          return new Response('', { status: 200 });
        }
        return caches.match(OFFLINE_URL);
      });
    })
  );
});


// ─────────────────────────────────────────
// BACKGROUND SYNC (future-ready)
// ─────────────────────────────────────────
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-ratings') {
    // Placeholder for syncing ratings when back online
    console.log('[SW] Background sync: ratings');
  }
});


// ─────────────────────────────────────────
// PUSH NOTIFICATIONS (future-ready)
// ─────────────────────────────────────────
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title   = data.title   || 'Career Finder AI';
  const options = {
    body:    data.body    || 'Check out new career insights! 🚀',
    icon:    './icon-192.png',
    badge:   './icon-192.png',
    vibrate: [200, 100, 200],
    data:    { url: data.url || './' }
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data?.url || './')
  );
});
