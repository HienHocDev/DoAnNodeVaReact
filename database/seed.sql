USE doannodevareact;
GO

INSERT INTO dbo.users (full_name, email, password, phone, address, role)
VALUES
  (N'Quản trị viên', N'admin@example.com', N'change-this-password', N'0123456789', N'TP.HCM', N'admin'),
  (N'Nguyễn Văn A', N'user@example.com', N'change-this-password', N'0123 456 789', N'56 T23, Đường ABC, Quận 1, TP.HCM', N'user');
GO

INSERT INTO dbo.categories (name, slug, status)
VALUES
  (N'Văn học', N'van-hoc', N'Hiển thị'),
  (N'Kinh tế', N'kinh-te', N'Hiển thị'),
  (N'Kỹ năng sống', N'ky-nang-song', N'Hiển thị'),
  (N'Thiếu nhi', N'thieu-nhi', N'Hiển thị'),
  (N'Giáo trình', N'giao-trinh', N'Hiển thị'),
  (N'Truyện tranh', N'truyen-tranh', N'Hiển thị');
GO

INSERT INTO dbo.books (
  category_id, sku, isbn, title, author, publisher, publish_year, page_count,
  language, format, price, old_price, discount, stock_quantity, status,
  rating, reviews, sold, image_url, description, cover_color, cover_accent
)
VALUES
  (3, N'BOOK-DNT-001', N'9786040000011', N'Đắc Nhân Tâm', N'Dale Carnegie', N'NXB Tổng hợp TP.HCM', 2020, 320, N'Tiếng Việt', N'Bìa mềm', 79000, 99000, 20, 120, N'Hiển thị', 5, 120, 336, NULL, N'Cuốn sách kinh điển về nghệ thuật ứng xử và giao tiếp.', N'#c8322a', N'#103b57'),
  (1, N'BOOK-NGK-002', N'9786040000028', N'Nhà Giả Kim', N'Paulo Coelho', N'NXB Văn học', 2021, 228, N'Tiếng Việt', N'Bìa mềm', 71000, 89000, 18, 80, N'Hiển thị', 5, 98, 211, NULL, N'Hành trình tìm kiếm ước mơ của chàng chăn cừu Santiago.', N'#e36d25', N'#f8c863'),
  (3, N'BOOK-ATH-003', N'9786040000035', N'Atomic Habits', N'James Clear', N'NXB Thế giới', 2022, 392, N'Tiếng Việt', N'Bìa mềm', 159000, 189000, 16, 65, N'Hiển thị', 5, 80, 190, NULL, N'Phương pháp xây dựng thói quen nhỏ để tạo thay đổi lớn.', N'#f1eadf', N'#ad825d'),
  (2, N'BOOK-CGCG-004', N'9786040000042', N'Cha Giàu Cha Nghèo', N'Robert T. Kiyosaki', N'NXB Trẻ', 2019, 336, N'Tiếng Việt', N'Bìa mềm', 119000, 149000, 20, 70, N'Hiển thị', 5, 75, 154, NULL, N'Bài học tài chính cá nhân dễ hiểu và thực tế.', N'#2c254a', N'#f5d35b');
GO
