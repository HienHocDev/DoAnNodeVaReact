# BookNest - Đồ án Node.js và React

BookNest là website bán sách gồm 3 phần chính:

- `frontend`: giao diện React.
- `backend`: API Node.js.
- `database`: file tạo database SQL Server.

## 1. Clone dự án về máy

```bash
git clone <link-repository>
cd doannodevareact
```

Nếu nhóm làm theo nhánh riêng, kiểm tra danh sách nhánh:

```bash
git branch -a
```

Chuyển sang nhánh cần làm:

```bash
git checkout ten-nhanh
```

Ví dụ:

```bash
git checkout main
```

Trước khi làm nên kéo code mới nhất:

```bash
git pull
```

## 2. Cài môi trường cần có

Cần cài trước:

- Node.js LTS.
- Git.
- SQL Server Express hoặc SQL Server Developer.
- SQL Server Management Studio.
- ODBC Driver 17 for SQL Server.

Kiểm tra Node.js:

```bash
node -v
npm -v
```

## 3. Cài thư viện dự án

Chạy tại thư mục gốc dự án:

```bash
npm run install:all
```

Nếu PowerShell chặn `npm`, dùng:

```bash
npm.cmd run install:all
```

Lệnh này sẽ cài thư viện cho cả:

- `backend`
- `frontend`

## 4. Cấu hình backend

Tạo file `.env` trong thư mục `backend` bằng cách copy từ file mẫu:

```bash
copy backend\.env.example backend\.env
```

Nội dung cấu hình mặc định:

```env
PORT=5000
NODE_ENV=development
DB_SERVER=localhost
DB_INSTANCE=SQLEXPRESS
DB_PORT=
DB_NAME=doannodevareact
DB_USER=booknest_user
DB_PASSWORD=BookNest@123
DB_TRUSTED_CONNECTION=false
DB_DRIVER=ODBC Driver 17 for SQL Server
DB_ENCRYPT=false
DB_TRUST_SERVER_CERTIFICATE=true
```

Nếu máy bạn dùng server name khác, ví dụ `MSI\SQLEXPRESS`, vẫn có thể giữ:

```env
DB_SERVER=localhost
DB_INSTANCE=SQLEXPRESS
```

Nếu không kết nối được, đổi thành:

```env
DB_SERVER=MSI
DB_INSTANCE=SQLEXPRESS
```

## 5. Tạo database SQL Server

Mở SQL Server Management Studio và kết nối vào:

```text
MSI\SQLEXPRESS
```

hoặc:

```text
localhost\SQLEXPRESS
```

Chạy lần lượt các file trong thư mục `database`:

1. `database/schema.sql`

Tạo database và các bảng.

2. `database/seed.sql`

Thêm dữ liệu mẫu.

3. `database/create-login.sql`

Tạo tài khoản SQL cho backend:

```text
User: booknest_user
Password: BookNest@123
```

Nếu database đã tạo từ trước và chỉ muốn bổ sung cột mới cho bảng sách, chạy thêm:

```text
database/update-books-table.sql
```

## 6. Chạy backend

Mở terminal tại thư mục gốc dự án:

```bash
npm run backend
```

Nếu PowerShell chặn `npm`, dùng:

```bash
npm.cmd run backend
```

Backend chạy tại:

```text
http://localhost:5000
```

Kiểm tra backend:

```text
http://localhost:5000/api/health
```

Kiểm tra kết nối database:

```text
http://localhost:5000/api/health/database
```

Nếu thấy `Kết nối SQL Server thành công` là backend đã kết nối database.

## 7. Chạy frontend

Mở terminal thứ hai tại thư mục gốc dự án:

```bash
npm run frontend
```

Nếu PowerShell chặn `npm`, dùng:

```bash
npm.cmd run frontend
```

Frontend chạy tại:

```text
http://localhost:3000
```

## 8. Tài khoản mẫu

Tài khoản admin:

```text
Email: admin@example.com
Password: change-this-password
```

Tài khoản người dùng:

```text
Email: user@example.com
Password: change-this-password
```

Chỉ tài khoản admin mới thấy mục `Trang quản trị`.

## 9. Cấu trúc thư mục

```text
doannodevareact/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── database/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── database/
│   ├── schema.sql
│   ├── seed.sql
│   ├── create-login.sql
│   ├── update-books-table.sql
│   └── README.md
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── package.json
```

## 10. Các trang chính

- `HomePage.js`: trang chủ.
- `BooksPage.js`: danh sách sách và bộ lọc.
- `BookDetailPage.js`: chi tiết sách.
- `CartPage.js`: giỏ hàng.
- `CheckoutPage.js`: thanh toán.
- `AuthPage.js`: đăng nhập và đăng ký.
- `AccountPage.js`: tài khoản của tôi.
- `OrdersPage.js`: đơn hàng của tôi.
- `AdminPage.js`: khung quản trị cho admin.

## 11. Quy trình làm việc với Git

Trước khi code:

```bash
git pull
```

Xem file đã thay đổi:

```bash
git status
```

Thêm file vào commit:

```bash
git add .
```

Commit:

```bash
git commit -m "Mo ta noi dung thay doi"
```

Push:

```bash
git push
```

Nếu làm trên nhánh mới:

```bash
git checkout -b ten-nhanh-moi
git push -u origin ten-nhanh-moi
```

## 12. Lưu ý

- Không push file `backend/.env` lên Git.
- File `.env.example` dùng để chia sẻ cấu hình mẫu.
- Khi backend lỗi database, kiểm tra service `SQL Server (SQLEXPRESS)` có đang chạy không.
- Khi thay đổi database mới, cập nhật file SQL trong thư mục `database`.
