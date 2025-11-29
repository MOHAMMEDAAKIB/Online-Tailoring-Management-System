// =============================================================================
// DATABASE CONNECTION CONFIGURATION
// =============================================================================
// Supports both MySQL (local development) and PostgreSQL (production - Aiven.io)
// Automatically selects the correct driver based on DB_TYPE environment variable

require('dotenv').config();

const DB_TYPE = process.env.DB_TYPE || 'mysql';

let pool;

if (DB_TYPE === 'postgres') {
  // ==========================================================================
  // POSTGRESQL CONFIGURATION (For Aiven.io Production)
  // ==========================================================================
  const { Pool } = require('pg');
  
  pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'tailoring_management',
    max: process.env.DB_CONNECTION_LIMIT ? parseInt(process.env.DB_CONNECTION_LIMIT, 10) : 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    
    // SSL Configuration for Aiven.io
    ssl: process.env.DB_SSL === 'true' ? {
      rejectUnauthorized: false // Aiven provides valid certificates
    } : false
  });

  // PostgreSQL error handling
  pool.on('error', (err) => {
    console.error('❌ Unexpected PostgreSQL error:', err);
    process.exit(-1);
  });

  // Test connection on startup
  pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('❌ PostgreSQL connection error:', err);
    } else {
      console.log('✅ PostgreSQL connected successfully at:', res.rows[0].now);
    }
  });

  // Export with query wrapper for consistent API
  module.exports = {
    query: (text, params) => pool.query(text, params),
    execute: async (text, params) => {
      const result = await pool.query(text, params);
      return [result.rows, result.fields];
    },
    getConnection: () => pool.connect(),
    pool: pool
  };

} else {
  // ==========================================================================
  // MYSQL CONFIGURATION (For Local Development)
  // ==========================================================================
  const mysql = require('mysql2/promise');
  
  pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'tailoring_management',
    waitForConnections: true,
    connectionLimit: process.env.DB_CONNECTION_LIMIT ? parseInt(process.env.DB_CONNECTION_LIMIT, 10) : 10,
    queueLimit: 0
  });

  // Test connection on startup
  pool.getConnection()
    .then(connection => {
      console.log('✅ MySQL connected successfully');
      connection.release();
    })
    .catch(err => {
      console.error('❌ MySQL connection error:', err);
    });

  module.exports = pool;
}

// =============================================================================
// USAGE EXAMPLES
// =============================================================================
// 
// MySQL usage:
// const db = require('./config/database');
// const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [userId]);
//
// PostgreSQL usage:
// const db = require('./config/database');
// const [rows] = await db.execute('SELECT * FROM users WHERE id = $1', [userId]);
// Note: PostgreSQL uses $1, $2, etc. for placeholders instead of ?
