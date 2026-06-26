const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

function readOptionalNumber(value) {
  if (!value) return undefined;
  const parsedValue = Number(value);
  return Number.isNaN(parsedValue) ? undefined : parsedValue;
}

const env = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  database: {
    server: process.env.DB_SERVER || 'localhost',
    instanceName: process.env.DB_INSTANCE || '',
    port: readOptionalNumber(process.env.DB_PORT),
    name: process.env.DB_NAME || 'doannodevareact',
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    trustedConnection: process.env.DB_TRUSTED_CONNECTION === 'true',
    driver: process.env.DB_DRIVER || 'ODBC Driver 17 for SQL Server',
    options: {
      encrypt: process.env.DB_ENCRYPT === 'true',
      trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE !== 'false'
    }
  }
};

module.exports = { env };
