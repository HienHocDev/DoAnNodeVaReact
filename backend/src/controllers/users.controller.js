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

async function updateUser(req, res, sendJson) {
  const match = req.url.match(/^\/api\/users\/(\d+)$/);
  const userId = Number(match?.[1]);

  if (!userId) {
    sendJson(res, 400, { success: false, message: 'Thiếu mã người dùng' });
    return;
  }

  const body = await readJsonBody(req);
  const { fullName, email, phone, address } = body;

  if (!fullName || !email || !phone) {
    sendJson(res, 400, { success: false, message: 'Vui lòng nhập đầy đủ họ tên, email và số điện thoại' });
    return;
  }

  const pool = await getConnectionPool();
  const duplicatedEmail = await pool.request()
    .input('id', userId)
    .input('email', email)
    .query('SELECT TOP 1 id FROM dbo.users WHERE email = @email AND id <> @id');

  if (duplicatedEmail.recordset.length) {
    sendJson(res, 409, { success: false, message: 'Email đã được sử dụng bởi tài khoản khác' });
    return;
  }

  const result = await pool.request()
    .input('id', userId)
    .input('fullName', fullName)
    .input('email', email)
    .input('phone', phone)
    .input('address', address || '')
    .query(`
      UPDATE dbo.users
      SET
        full_name = @fullName,
        email = @email,
        phone = @phone,
        address = @address,
        updated_at = SYSDATETIME()
      OUTPUT inserted.id, inserted.full_name, inserted.email, inserted.phone, inserted.address, inserted.role
      WHERE id = @id
    `);

  if (!result.recordset.length) {
    sendJson(res, 404, { success: false, message: 'Không tìm thấy tài khoản' });
    return;
  }

  sendJson(res, 200, { success: true, data: mapUser(result.recordset[0]) });
}

module.exports = { updateUser };
