const env = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    name: process.env.DB_NAME || 'doannodevareact',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || ''
  }
};

module.exports = { env };
