var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    './styles/main.css',
    './styles/main.js'
];

self.addEventListener('install', function(event){
    console.log('installed')
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache){
            console.log('open cache')
            return cache.addAll(urlsToCache)
        })
    )
});

console.log(9999);
// 缓存之后， 只是缓存了资源在本地，页面并未使用缓存的资源，
self.addEventListener('fetch', function(event){
    console.log(1212, event)
    event.respondWith(
        caches.match(event.request).then(function(response){
            console.log('response---->', response)
            if(response) {
                console.log('cache hit')
                return response
            }
            console.log('hit net')
            return fetch(event.request)
        })
    )
});

// 对应方式一
// self.addEventListener("message", e => {
//     console.log("监听 message ----->", e);
//     // 从 e.data 里面取 postMessage 过来的数据
//     // const client = self.clients.get(e.source.id)
//     // client.postMessage('发给页面层的消息')
//     // e.source.postMessage('去告诉页面，我知道了');
//     e.ports[0] && e.ports[0].postMessage('去告诉页面，我知道了')
// })

// 对应方式二
self.addEventListener("sync", e => {
	if(e.tag == '同步tag') {
        console.log('收到 sync111')
        var bc1 = new BroadcastChannel('c1');
 
        bc1.postMessage('发送广播消息');

		e.waitUntil(
	    	new Promise((res, rej) => {
	    		// 逻辑处理 ...
	    		return res();
	    	})
	    )
    }
})