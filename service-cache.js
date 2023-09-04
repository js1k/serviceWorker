var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    './',
    './styles/main.css',
    './styles/main.js'
]

self.addEventListener('install', event => {
    console.log('installed')
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache){
            console.log('open cache')
            return cache.addAll(urlsToCache)
        })
    )
})

// 缓存之后， 只是缓存了资源在本地，页面并未使用缓存的资源，
