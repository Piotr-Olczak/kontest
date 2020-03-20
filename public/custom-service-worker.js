/* eslint-env serviceworker */
// @see: https://googlechrome.github.io/samples/service-worker/custom-offline-page/
const self = this;

const VERSION_NUMBER = 1;
const CACHE_NAME = `static-v${VERSION_NUMBER}`;
const offlinePagePath =
  '/__data/assets/git_bridge/0013/9013/build/offline.html';

self.addEventListener('install', event => {
  console.log(`SW V${VERSION_NUMBER} Installing…`);

  // don't wait with installing this SW
  self.skipWaiting();

  // cache for us only one file - offline plug
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.add(offlinePagePath))
  );
});

// After SW has been activated we clear the old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          } else {
            return undefined;
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  // We only want to call event.respondWith() if this is a navigation request
  // for an HTML page.
  // request.mode of 'navigate' is unfortunately not supported in Chrome
  // versions older than 49, so we need to include a less precise fallback,
  // which checks for a GET request with an Accept: text/html header.
  console.log(event.request);
  if (
    event.request.mode === 'navigate' ||
    (event.request.method === 'GET' &&
      event.request.headers.get('accept').includes('text/html'))
  ) {
    event.respondWith(
      fetch(event.request).catch(error => {
        // The catch is only triggered if fetch() throws an exception, which will most likely
        // happen due to the server being unreachable.
        // If fetch() returns a valid HTTP response with an response code in the 4xx or 5xx
        // range, the catch() will NOT be called. If you need custom handling for 4xx or 5xx
        // errors, see https://github.com/GoogleChrome/samples/tree/gh-pages/service-worker/fallback-response
        console.log('Fetch failed; returning offline page instead.', error);
        return caches.match(offlinePagePath);
      })
    );
  }

  // If our if() condition is false, then this fetch handler won't intercept the request.
  // If there are any other fetch handlers registered, they will get a chance to call
  // event.respondWith(). If no fetch handlers call event.respondWith(), the request will be
  // handled by the browser as if there were no service worker involvement.
});
