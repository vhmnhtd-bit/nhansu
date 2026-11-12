/* Service worker cho app "Nhân sự" (cài trang nhân sự lên điện thoại).
   CHỈ lưu đệm khung trang và icon (cùng nguồn). TUYỆT ĐỐI không lưu đệm phản hồi của máy chủ Apps Script, đăng nhập, hay bất kỳ
   số liệu nào (lương, hồ sơ, lịch ca). Khung tĩnh dùng "mạng trước" nên luôn nhận bản mới; mất mạng thì lấy bản đã lưu.
   Đổi nội dung tệp này thì tăng số phiên bản ở CACHE (nhansu-v2, v3…) để máy đã cài dọn bộ đệm cũ. */
const CACHE = 'nhansu-v1';
const SHELL = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png', './icon-maskable.png', './icon-180.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  const req = e.request;
  // Chỉ xử lý GET cùng nguồn (khung tĩnh). Máy chủ Apps Script, Google và mọi yêu cầu khác để trình duyệt tự lo, không lưu đệm.
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(req).then(function (res) {
      if (res && res.ok && res.type === 'basic') { const copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(req, copy); }); }
      return res;
    }).catch(function () { return caches.match(req).then(function (m) { return m || caches.match('./index.html'); }); })
  );
});
