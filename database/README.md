# Database SQL Server

Thư mục này chứa file tạo cơ sở dữ liệu cho SQL Server.

- `schema.sql`: tạo mới database `doannodevareact` và các bảng chính.
- `seed.sql`: thêm dữ liệu mẫu để test.
- `create-login.sql`: tạo tài khoản SQL cho backend.
- `update-books-table.sql`: bổ sung cột mới cho database đã tạo trước đó, không drop dữ liệu.

## Cách chạy trong SQL Server Management Studio

Nếu tạo database từ đầu:

1. Mở SQL Server Management Studio.
2. Kết nối vào `MSI\SQLEXPRESS`.
3. Mở file `schema.sql`, bấm `Execute`.
4. Mở file `seed.sql`, bấm `Execute`.
5. Mở file `create-login.sql`, bấm `Execute`.

Nếu database đã có dữ liệu và chỉ muốn bổ sung cột sách:

1. Mở file `update-books-table.sql`.
2. Bấm `Execute`.

## Các bảng chính

- `users`: tài khoản khách hàng/admin.
- `categories`: danh mục sách.
- `books`: thông tin sách.
- `orders`: đơn hàng.
- `order_items`: chi tiết đơn hàng.

## Ghi chú bảng `books`

Các cột quan trọng cho phần quản trị sách:

- `title`, `author`, `publisher`, `publish_year`: thông tin cơ bản.
- `sku`, `isbn`: mã quản lý sách.
- `category_id`: danh mục.
- `price`, `old_price`, `discount`: giá bán.
- `stock_quantity`: số lượng tồn kho.
- `status`: trạng thái hiển thị, ví dụ `Hiển thị`, `Ẩn`, `Hết hàng`.
- `image_url`: đường dẫn ảnh bìa sách. Không nên lưu ảnh trực tiếp trong database.
- `page_count`, `language`, `format`: thông tin chi tiết.
- `description`: mô tả sách.
- `cover_color`, `cover_accent`: màu bìa giả lập khi chưa upload ảnh.
