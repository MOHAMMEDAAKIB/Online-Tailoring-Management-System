// Server/run-migration.js
require('dotenv').config();
const fs = require('fs');
const mysql = require('mysql2/promise');
 // Connect without specifying database (to create it)
const connection = require('../src/config/database');

(async () => {
  try {;

    // Read SQL file
    const sql = fs.readFileSync('./db/migrations/002_create_measurements_table.sql', 'utf8');
    
    // Execute migration
    console.log('Running migration...');
    await connection.query(sql);
    console.log('✅ Migration completed successfully!');
    
    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
})();