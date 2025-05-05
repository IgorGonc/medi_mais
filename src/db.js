// src/db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
  max: 10,               // limite de conexões
  idleTimeoutMillis: 30000,
  ssl: {
    // Para ambientes que usam certificado autoassinado:
    rejectUnauthorized: false
  }
});

module.exports = pool;
