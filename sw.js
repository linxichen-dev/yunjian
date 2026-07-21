// sw.js - 云笺离线缓存
const CACHE_NAME = 'yunjian-v1';
const urlsToCache = [
  '/yunjian/',
  '/yunjian/index.html',
  '/yunjian/widget.html',
  '/yunjian/widget-rainmeter.html',
  '/yunjian/manifest.json'
];

// 安装时缓存核心文件
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('缓存已开启');
        return cache.addAll(urlsToCache);
      })
  );
});

// 激活时清理旧版本缓存
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// 拦截请求：优先从缓存读取，缓存没有则联网获取
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});