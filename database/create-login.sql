USE master;
GO

IF NOT EXISTS (SELECT 1 FROM sys.sql_logins WHERE name = N'booknest_user')
BEGIN
  CREATE LOGIN booknest_user
  WITH PASSWORD = N'BookNest@123',
       CHECK_POLICY = OFF,
       CHECK_EXPIRATION = OFF;
END;
ELSE
BEGIN
  ALTER LOGIN booknest_user
  WITH PASSWORD = N'BookNest@123',
       CHECK_POLICY = OFF,
       CHECK_EXPIRATION = OFF;
END;
GO

ALTER LOGIN booknest_user ENABLE;
GO

USE doannodevareact;
GO

IF NOT EXISTS (SELECT 1 FROM sys.database_principals WHERE name = N'booknest_user')
BEGIN
  CREATE USER booknest_user FOR LOGIN booknest_user;
END;
GO

ALTER ROLE db_owner ADD MEMBER booknest_user;
GO
