const cacheName = "bug8bit-cache";
const filesToCache = [
    '/',
    'index.html',
    'bg-texture-wood.jpg',
    'bug-brown-4.json',
    'bug-brown-4.png',
    'normals-map/bug-brown-normal-4.json',
    'normals-map/bug-brown-normal-4.png',
    'bug-red-4.json',
    'bug-red-4.png',
    'normals-map/bug-red-normal-4 .json',
    'normals-map/bug-red-normal-4 .png',
    'bug-green-4.json',
    'bug-green-4.png',
    'normals-map/bug-green-normal-4.json',
    'normals-map/bug-green-normal-4.png',
    'ouch.json',
    'ouch.png',
    'poof.json',
    'poof.png',
    'Bug8bit.png',
    'sound/ben.mp3',
    'sound/poop-effect.mp3',
    'fonts/PixeloidMono.ttf',
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
    e.waitUntil(
      caches.open(cacheName).then(function(cache) {
        return cache.addAll(filesToCache);
      })
    );
  });
  
/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  });