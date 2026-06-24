# Do an Node.js va React

Du an da duoc chia lai thanh cac phan rieng de de lam va de quan ly:

- `frontend`: giao dien React.
- `backend`: API Node.js.
- `database`: file tao bang va du lieu mau.

## Cau truc thu muc

```text
doannodevareact/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── database/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── database/
│   ├── schema.sql
│   ├── seed.sql
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

## Chay du an

Lan dau tien, cai dependency cho tung phan:

```bash
npm run install:all
```

Chay backend:

```bash
npm run backend
```

Backend mac dinh chay o `http://localhost:5000`.
Kiem tra API: `http://localhost:5000/api/health`.

Chay frontend:

```bash
npm run frontend
```

Frontend mac dinh chay o `http://localhost:3000`.

## Goi y phat trien

- Them route API moi trong `backend/src/routes`.
- Viet xu ly nghiep vu trong `backend/src/controllers`.
- Cau hinh ket noi database trong `backend/src/database`.
- Chia giao dien React vao `frontend/src/pages`, `frontend/src/components` va `frontend/src/layouts`.
- Dat cac ham goi API frontend trong `frontend/src/api`.

## Khung giao dien BookNest

Frontend hien co cac man hinh mau theo giao dien ban tham khao:

- `frontend/src/pages/HomePage.js`: trang chu.
- `frontend/src/pages/BooksPage.js`: danh sach sach va bo loc.
- `frontend/src/pages/BookDetailPage.js`: chi tiet sach.
- `frontend/src/pages/CartPage.js`: gio hang.
- `frontend/src/pages/CheckoutPage.js`: thanh toan.
- `frontend/src/pages/AuthPage.js`: dang nhap va dang ky.
- `frontend/src/pages/AccountPage.js`: tai khoan cua toi.
- `frontend/src/pages/OrdersPage.js`: don hang cua toi.
- `frontend/src/components`: cac thanh phan dung lai nhu card sach, bia sach, header section.
- `frontend/src/data/books.js`: du lieu sach mau, sau nay co the thay bang API backend.
