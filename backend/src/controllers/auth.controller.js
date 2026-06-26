const { getConnectionPool } = require('../database/connection');
const { readJsonBody } = require('../utils/request');

function mapUser(row) {
  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone || '',
    address: row.address || '',
    role: row.role
  };
}

async function login(req, res, sendJson) {
  const body = await readJsonBody(req);
  const { email, password } = body;

  if (!email || !password) {
    sendJson(res, 400, { success: false, message: 'Vui lòng nhập email và mật khẩu' });
    return;
  }

  const pool = await getConnectionPool();
  const result = await pool.request()
    .input('email', email)
    .input('password', password)
    .query(`
      SELECT TOP 1 id, full_name, email, phone, address, role
      FROM dbo.users
      WHERE email = @email AND password = @password
    `);

  if (!result.recordset.length) {
    sendJson(res, 401, { success: false, message: 'Email hoặc mật khẩu không đúng' });
    return;
  }

  sendJson(res, 200, { success: true, data: mapUser(result.recordset[0]) });
}

async function register(req, res, sendJson) {
  const body = await readJsonBody(req);
  const { fullName, email, phone, password } = body;

  if (!fullName || !email || !phone || !password) {
    sendJson(res, 400, { success: false, message: 'Vui lòng nhập đầy đủ thông tin' });
    return;
  }

  const pool = await getConnectionPool();
  const existed = await pool.request()
    .input('email', email)
    .query('SELECT TOP 1 id FROM dbo.users WHERE email = @email');

  if (existed.recordset.length) {
    sendJson(res, 409, { success: false, message: 'Email đã được sử dụng' });
    return;
  }

  const result = await pool.request()
    .input('fullName', fullName)
    .input('email', email)
    .input('phone', phone)
    .input('password', password)
    .query(`
      INSERT INTO dbo.users (full_name, email, phone, password, role)
      OUTPUT inserted.id, inserted.full_name, inserted.email, inserted.phone, inserted.address, inserted.role
      VALUES (@fullName, @email, @phone, @password, N'user')
    `);

  sendJson(res, 201, { success: true, data: mapUser(result.recordset[0]) });
}

module.exports = { login, register };
