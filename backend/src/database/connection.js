const { env } = require('../config/env');

let sql;
let poolPromise;

function getDatabaseConfig() {
  if (env.database.trustedConnection) {
    return [
      `Driver={${env.database.driver}}`,
      `Server=${env.database.server}`,
      `Database=${env.database.name}`,
      'Trusted_Connection=Yes',
      'TrustServerCertificate=Yes'
    ].join(';');
  }

  const config = {
    server: env.database.server,
    database: env.database.name,
    options: {
      ...env.database.options,
      trustedConnection: env.database.trustedConnection
    }
  };

  if (env.database.port) {
    config.port = env.database.port;
  }

  if (env.database.instanceName) {
    config.options.instanceName = env.database.instanceName;
  }

  if (!env.database.trustedConnection) {
    config.user = env.database.user;
    config.password = env.database.password;
  }

  return config;
}

function loadSqlServerDriver() {
  if (!sql) {
    try {
      sql = env.database.trustedConnection ? require('mssql/msnodesqlv8') : require('mssql');
    } catch (error) {
      throw new Error('Chưa cài thư viện kết nối SQL Server. Hãy chạy: npm install --prefix backend');
    }
  }

  return sql;
}

async function getConnectionPool() {
  const sqlServer = loadSqlServerDriver();

  if (!poolPromise) {
    poolPromise = sqlServer.connect(getDatabaseConfig());
  }

  return poolPromise;
}

async function checkDatabaseConnection() {
  const pool = await getConnectionPool();
  const result = await pool.request().query('SELECT DB_NAME() AS databaseName, GETDATE() AS serverTime');
  return result.recordset[0];
}

module.exports = { getDatabaseConfig, getConnectionPool, checkDatabaseConnection };
