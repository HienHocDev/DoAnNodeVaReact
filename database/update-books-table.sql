USE doannodevareact;
GO

IF COL_LENGTH('dbo.categories', 'status') IS NULL
  ALTER TABLE dbo.categories ADD status NVARCHAR(20) NOT NULL CONSTRAINT df_categories_status DEFAULT N'Hiển thị';
GO

IF COL_LENGTH('dbo.categories', 'created_at') IS NULL
  ALTER TABLE dbo.categories ADD created_at DATETIME2 NOT NULL CONSTRAINT df_categories_created_at DEFAULT SYSDATETIME();
GO

IF COL_LENGTH('dbo.categories', 'updated_at') IS NULL
  ALTER TABLE dbo.categories ADD updated_at DATETIME2 NOT NULL CONSTRAINT df_categories_updated_at DEFAULT SYSDATETIME();
GO

IF COL_LENGTH('dbo.books', 'sku') IS NULL
  ALTER TABLE dbo.books ADD sku NVARCHAR(50) NULL;
GO

IF COL_LENGTH('dbo.books', 'isbn') IS NULL
  ALTER TABLE dbo.books ADD isbn NVARCHAR(30) NULL;
GO

IF COL_LENGTH('dbo.books', 'page_count') IS NULL
  ALTER TABLE dbo.books ADD page_count INT NULL;
GO

IF COL_LENGTH('dbo.books', 'language') IS NULL
  ALTER TABLE dbo.books ADD language NVARCHAR(50) NOT NULL CONSTRAINT df_books_language DEFAULT N'Tiếng Việt';
GO

IF COL_LENGTH('dbo.books', 'format') IS NULL
  ALTER TABLE dbo.books ADD format NVARCHAR(50) NOT NULL CONSTRAINT df_books_format DEFAULT N'Bìa mềm';
GO

IF COL_LENGTH('dbo.books', 'stock_quantity') IS NULL
  ALTER TABLE dbo.books ADD stock_quantity INT NOT NULL CONSTRAINT df_books_stock_quantity DEFAULT 0;
GO

IF COL_LENGTH('dbo.books', 'status') IS NULL
  ALTER TABLE dbo.books ADD status NVARCHAR(20) NOT NULL CONSTRAINT df_books_status DEFAULT N'Hiển thị';
GO

IF COL_LENGTH('dbo.books', 'image_url') IS NULL
  ALTER TABLE dbo.books ADD image_url NVARCHAR(500) NULL;
GO

IF COL_LENGTH('dbo.books', 'updated_at') IS NULL
  ALTER TABLE dbo.books ADD updated_at DATETIME2 NOT NULL CONSTRAINT df_books_updated_at DEFAULT SYSDATETIME();
GO

IF COL_LENGTH('dbo.orders', 'updated_at') IS NULL
  ALTER TABLE dbo.orders ADD updated_at DATETIME2 NOT NULL CONSTRAINT df_orders_updated_at DEFAULT SYSDATETIME();
GO
