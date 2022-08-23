const staticCacheName = "site-static-v1";
const cacheAssets = [
    "/",
    "index.html",
    "css/local.css",
    "css/master.css",
    "icons/icofont.min.css",
    "bootstrap/css/bootstrap.min.css",
    "boxicons/css/boxicons.min.css",
    "css/master.css",
    "css/master.css",


];

self.addEventListener("install", evt => {
    evt.waitUntil(
        caches
        .open(staticCacheName)
        .then(cache => {
            console.log("caching assets...");
            cache.addAll(cacheAssets);
        })
        .catch(err => {})
    );
});

self.addEventListener("fetch", evt => {
    evt.respondWith(
        caches
        .match(evt.request)
        .then(res => {
            return res || fetch(evt.request);
        })
        .catch(err => {
            if (evt.request.url.indexOf(".html") > -1) {
                return caches.match("./index.html");
            }
        })
    );
});