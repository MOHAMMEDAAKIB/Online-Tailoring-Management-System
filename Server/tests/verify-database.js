// Verify database structure and show all table details
require('dotenv').config();
const db = require('../src/config/database');

(async () => {
  try {
    console.log('🔍 Verifying database structure...\n');
    
    // Get all tables
    const [tables] = await db.execute('SHOW TABLES');
    
    if (tables.length === 0) {
      console.log('⚠️  No tables found. Run migrations first.');
      process.exit(1);
    }
    
    console.log(`✅ Found ${tables.length} tables\n`);
    
    // Show structure of each table
    for (const tableRow of tables) {
      const tableName = Object.values(tableRow)[0];
      console.log(`\n📋 Table: ${tableName}`);
      console.log('─'.repeat(80));
      
      const [columns] = await db.execute(`DESCRIBE ${tableName}`);
      
      columns.forEach(col => {
        const key = col.Key ? `[${col.Key}]` : '';
        const defaultVal = col.Default ? `(default: ${col.Default})` : '';
        console.log(`   ${col.Field.padEnd(25)} ${col.Type.padEnd(30)} ${key} ${defaultVal}`);
      });
    }
    
    console.log('\n\n🎉 Database verification complete!');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Verification failed:', error.message);
    process.exit(1);
  }
})();
