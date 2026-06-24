const { env } = require('../config/env');

function getDatabaseConfig() {
  return env.database;
}

module.exports = { getDatabaseConfig };
