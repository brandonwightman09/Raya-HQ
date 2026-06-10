/* Raya HQ service worker — installability only, NO caching.
   The homepage is owner-gated and shows live Supabase data, so we never
   cache HTML or responses. This deliberately avoids the stale-PWA-cache
   problem that plagued ai.raya-hq.com. Network-only, always fresh. */

// Take over immediately on install/update so an old worker can't linger.
self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

// A registered fetch handler is what makes the app installable.
// We only intercept page navigations, and we go straight to the network.
self.addEventListener('fetch', (e) => {
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request));
  }
  // Everything else (Supabase calls, fonts, icons) falls through to the
  // browser's normal handling — untouched, uncached.
});
