const CACHE_NAME = "hijo";
const urlsToCache = [
    "/",
    // "/_next/static/main.js?ts=1600373744264",
    "/static/manifest.json",
    "/static/favicon.ico",
];

self.addEventListener("install", event => {
    const preLoaded = caches.open(CACHE_NAME)
        .then(cache => cache.addAll(urlsToCache))
    event.waitUntil(preLoaded);
});

self.addEventListener("fetch", event => {
    const response = caches.match(event.request)
        .then(match => match || fetch(event.request));
    event.respondWith(response);
});