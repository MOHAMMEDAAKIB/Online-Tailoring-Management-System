require('dotenv').config();
const db = require('../src/config/database');

(async () => {
  try {
    const [rows] = await db.execute('SELECT 1 + 1 AS solution');
    console.log('DB test result:', rows);
    process.exit(0);
  } catch (err) {
    console.error('DB connection failed:', err.message || err);
    process.exit(1);
  }
})();

  
