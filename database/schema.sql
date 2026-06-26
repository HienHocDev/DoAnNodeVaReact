IF DB_ID(N'doannodevareact') IS NULL
BEGIN
  CREATE DATABASE doannodevareact;
END;
GO

USE doannodevareact;
GO

IF OBJECT_ID(N'dbo.order_items', N'U') IS NOT NULL DROP TABLE dbo.order_items;
IF OBJECT_ID(N'dbo.orders', N'U') IS NOT NULL DROP TABLE dbo.orders;
IF OBJECT_ID(N'dbo.books', N'U') IS NOT NULL DROP TABLE dbo.books;
IF OBJECT_ID(N'dbo.categories', N'U') IS NOT NULL DROP TABLE dbo.categories;
IF OBJECT_ID(N'dbo.users', N'U') IS NOT NULL DROP TABLE dbo.users;
GO

CREATE TABLE dbo.users (
  id INT IDENTITY(1,1) PRIMARY KEY,
  full_name NVARCHAR(100) NOT NULL,
  email NVARCHAR(150) NOT NULL UNIQUE,
  password NVARCHAR(255) NOT NULL,
  phone NVARCHAR(20) NULL,
  address NVARCHAR(255) NULL,
  role NVARCHAR(20) NOT NULL DEFAULT N'user',
  created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
  updated_at DATETIME2 NOT NULL DEFAULT SYSDATETIME()
);
GO

CREATE TABLE dbo.categories (
  id INT IDENTITY(1,1) PRIMARY KEY,
  name NVARCHAR(100) NOT NULL UNIQUE,
  slug NVARCHAR(100) NOT NULL UNIQUE,
  status NVARCHAR(20) NOT NULL DEFAULT N'Hiển thị',
  created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
  updated_at DATETIME2 NOT NULL DEFAULT SYSDATETIME()
);
GO

CREATE TABLE dbo.books (
  id INT IDENTITY(1,1) PRIMARY KEY,
  category_id INT NOT NULL,
  sku NVARCHAR(50) NULL,
  isbn NVARCHAR(30) NULL,
  title NVARCHAR(200) NOT NULL,
  author NVARCHAR(150) NOT NULL,
  publisher NVARCHAR(150) NULL,
  publish_year INT NULL,
  page_count INT NULL,
  language NVARCHAR(50) NOT NULL DEFAULT N'Tiếng Việt',
  format NVARCHAR(50) NOT NULL DEFAULT N'Bìa mềm',
  price DECIMAL(12,2) NOT NULL,
  old_price DECIMAL(12,2) NULL,
  discount INT NOT NULL DEFAULT 0,
  stock_quantity INT NOT NULL DEFAULT 0,
  status NVARCHAR(20) NOT NULL DEFAULT N'Hiển thị',
  rating INT NOT NULL DEFAULT 5,
  reviews INT NOT NULL DEFAULT 0,
  sold INT NOT NULL DEFAULT 0,
  image_url NVARCHAR(500) NULL,
  description NVARCHAR(MAX) NULL,
  cover_color NVARCHAR(20) NULL,
  cover_accent NVARCHAR(20) NULL,
  created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
  updated_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
  CONSTRAINT fk_books_categories FOREIGN KEY (category_id) REFERENCES dbo.categories(id)
);
GO

CREATE INDEX ix_books_category_id ON dbo.books(category_id);
CREATE INDEX ix_books_status ON dbo.books(status);
CREATE INDEX ix_books_sku ON dbo.books(sku);
GO

CREATE TABLE dbo.orders (
  id INT IDENTITY(1,1) PRIMARY KEY,
  user_id INT NULL,
  customer_name NVARCHAR(100) NOT NULL,
  customer_email NVARCHAR(150) NOT NULL,
  customer_phone NVARCHAR(20) NOT NULL,
  customer_address NVARCHAR(255) NOT NULL,
  note NVARCHAR(500) NULL,
  payment_method NVARCHAR(100) NOT NULL,
  status NVARCHAR(50) NOT NULL DEFAULT N'Chờ xác nhận',
  subtotal DECIMAL(12,2) NOT NULL,
  discount DECIMAL(12,2) NOT NULL DEFAULT 0,
  shipping_fee DECIMAL(12,2) NOT NULL DEFAULT 0,
  total DECIMAL(12,2) NOT NULL,
  created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
  updated_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
  CONSTRAINT fk_orders_users FOREIGN KEY (user_id) REFERENCES dbo.users(id)
);
GO

CREATE TABLE dbo.order_items (
  id INT IDENTITY(1,1) PRIMARY KEY,
  order_id INT NOT NULL,
  book_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(12,2) NOT NULL,
  CONSTRAINT fk_order_items_orders FOREIGN KEY (order_id) REFERENCES dbo.orders(id),
  CONSTRAINT fk_order_items_books FOREIGN KEY (book_id) REFERENCES dbo.books(id)
);
GO
