// Server/test-users-table.js
require('dotenv').config();
const db = require('../src/config/database');

(async () => {
  try {
    // Check if users table exists
    const [tables] = await db.execute('SHOW TABLES');
    console.log('Tables in database:', tables);
    
    // Check users table structure
    const [columns] = await db.execute('DESCRIBE users');
    console.log('\nUsers table structure:');
    console.table(columns);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
})();