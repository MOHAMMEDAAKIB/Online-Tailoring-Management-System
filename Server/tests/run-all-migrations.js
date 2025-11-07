// Run all database migrations in order
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const migrations = [
  '001_create_users_table.sql',
  '002_create_measurements_table.sql',
  '003_create_orders_table.sql',
  '004_create_invoices_table.sql',
  '005_create_payment_transactions_table.sql',
  '006_create_notification_logs_table.sql'
];

(async () => {
  let connection;
  
  try {
    console.log('🚀 Starting database migrations...\n');
    
    // Connect without database (to create it if needed)
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      multipleStatements: true
    });

    // Run each migration
    for (const migrationFile of migrations) {
      const filePath = path.join(__dirname, '..', 'db', 'migrations', migrationFile);
      
      if (!fs.existsSync(filePath)) {
        console.log(`⚠️  Skipping ${migrationFile} (file not found)`);
        continue;
      }
      
      console.log(`📝 Running: ${migrationFile}`);
      const sql = fs.readFileSync(filePath, 'utf8');
      await connection.query(sql);
      console.log(`✅ Completed: ${migrationFile}\n`);
    }

    console.log('🎉 All migrations completed successfully!');
    
    // Show created tables
    await connection.query('USE tailoring_management');
    const [tables] = await connection.query('SHOW TABLES');
    console.log('\n📊 Database tables:');
    tables.forEach(table => {
      console.log(`   - ${Object.values(table)[0]}`);
    });
    
    await connection.end();
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    if (connection) await connection.end();
    process.exit(1);
  }
})();
