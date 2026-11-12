# Cài trang nhân sự thành app "Nhân sự" trên điện thoại

Gửi người quản lý trang nhân sự (repository GitHub `vhmnhtd-bit/nhansu`, địa chỉ https://vhmnhtd-bit.github.io/nhansu/).

Mục đích: cài trang nhân sự lên màn hình chính điện thoại như một app riêng (icon xanh lá, tên **Nhân sự**), mở toàn màn hình.
Không đổi cách tính, đăng nhập, phân quyền hay máy chủ Apps Script của trang nhân sự. Chỉ thêm 6 tệp và 2 đoạn mã nhỏ.

## Tệp trong gói này

| Tệp | Làm gì |
|---|---|
| `manifest.json` | Thông tin app: tên "Quản lý nhân sự Miền Nam", tên dưới icon "Nhân sự", mở toàn màn hình |
| `sw.js` | Service worker: chỉ lưu khung trang và icon để mở nhanh; **không lưu** số liệu, lương, hồ sơ, phản hồi máy chủ |
| `icon-180.png`, `icon-192.png`, `icon-512.png`, `icon-maskable.png` | Icon (nền xanh lá, hình người) |
| `doan-ma-chen-vao-index.html` | 2 đoạn mã cần dán vào `index.html` |

## Các bước

1. Mở repository `vhmnhtd-bit/nhansu` trên GitHub.
2. **Add file → Upload files**: kéo 6 tệp `manifest.json`, `sw.js`, `icon-180.png`, `icon-192.png`, `icon-512.png`,
   `icon-maskable.png` vào, để **cùng thư mục với `index.html`**. Bấm **Commit changes**.
3. Mở `index.html` → bấm biểu tượng bút chì (**Edit this file**):
   - **Đoạn 1**: tìm dòng `<title>Quản lý nhân sự Miền Nam</title>` (gần đầu tệp), dán Đoạn 1 ngay bên dưới.
   - **Đoạn 2**: kéo xuống cuối tệp, dán Đoạn 2 ngay **trước** dòng `</body>`.
   - Bấm **Commit changes**.
4. Chờ 1–2 phút để GitHub Pages cập nhật.

## Kiểm tra sau khi tải

- Mở https://vhmnhtd-bit.github.io/nhansu/manifest.json → thấy nội dung tệp (không phải trang lỗi 404).
- Mở trang nhân sự trên điện thoại: chữ, ô nhập vừa màn hình (trước đây trang hiện như bản máy tính thu nhỏ vì thiếu thẻ
  `viewport`; Đoạn 1 đã thêm thẻ này để các kiểu hiển thị cho điện thoại có sẵn trong trang hoạt động). Kiểm tra lại vài màn hình
  chính (xếp ca, bảng lương) trên điện thoại; nếu có màn hình nào vỡ bố cục, báo lại.
- Đăng nhập, dùng như bình thường.

## Cài lên điện thoại

- **iPhone (Safari)**: mở trang nhân sự → nút Chia sẻ → **Thêm vào Màn hình chính** → tên hiện "Nhân sự" → **Thêm**.
- **Android (Chrome)**: mở trang nhân sự → menu ⋮ → **Cài đặt ứng dụng** (hoặc **Thêm vào màn hình chính**).
- Mỗi app (VHMN, Nhân sự) có phiên đăng nhập riêng.

## Khi sửa trang nhân sự về sau

- Sửa `index.html` như bình thường; app đã cài tự nhận bản mới ở lần mở sau (service worker lấy bản mới từ mạng trước).
- Chỉ khi sửa chính tệp `sw.js` thì đổi `nhansu-v1` thành `nhansu-v2` (v3…) ở dòng `const CACHE`.

## Đề xuất bảo mật (không bắt buộc)

Trang đăng nhập đang ghi công khai mật khẩu đặt lại mặc định ("Quên mật khẩu? … Mật khẩu sẽ về …"). Ai biết số điện thoại của
một tài khoản vừa được đặt lại có thể đăng nhập trước người chủ. Nên bỏ mật khẩu khỏi dòng hướng dẫn này (quản lý chuỗi báo
riêng cho người được đặt lại), hoặc đặt lại bằng mật khẩu tạm khác nhau cho từng lần.
