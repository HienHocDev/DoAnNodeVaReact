const { checkDatabaseConnection } = require('../database/connection');

function getHealth(req, res, sendJson) {
  sendJson(res, 200, {
    success: true,
    message: 'Backend API đang hoạt động',
    timestamp: new Date().toISOString()
  });
}

async function getDatabaseHealth(req, res, sendJson) {
  const database = await checkDatabaseConnection();

  sendJson(res, 200, {
    success: true,
    message: 'Kết nối SQL Server thành công',
    database
  });
}

module.exports = { getHealth, getDatabaseHealth };
