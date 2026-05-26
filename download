const mysql = require('mysql2/promise');

let pool;

function getDbConfig() {
  const sslEnabled = String(process.env.DB_SSL || '').toLowerCase() === 'true';

  if (process.env.DATABASE_URL) {
    const config = {
      uri: process.env.DATABASE_URL,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      multipleStatements: false
    };

    if (sslEnabled) {
      config.ssl = { rejectUnauthorized: false };
    }

    return config;
  }

  const config = {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ruthys_eatery',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: false
  };

  if (sslEnabled) {
    config.ssl = { rejectUnauthorized: false };
  }

  return config;
}

function getPool() {
  if (!pool) {
    pool = mysql.createPool(getDbConfig());
  }
  return pool;
}

async function query(sql, params = []) {
  const [rows] = await getPool().execute(sql, params);
  return rows;
}

module.exports = { getPool, query };
