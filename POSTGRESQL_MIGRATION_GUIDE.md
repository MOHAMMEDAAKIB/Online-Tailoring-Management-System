# PostgreSQL Migration Guide

This guide helps you migrate from MySQL to PostgreSQL for production deployment on Aiven.io.

## Key Differences: MySQL vs PostgreSQL

### 1. Parameter Placeholders
```javascript
// MySQL - uses ? for all parameters
db.execute('SELECT * FROM users WHERE id = ? AND role = ?', [userId, role]);

// PostgreSQL - uses $1, $2, $3, etc.
db.execute('SELECT * FROM users WHERE id = $1 AND role = $2', [userId, role]);
```

### 2. Data Types
| MySQL | PostgreSQL | Notes |
|-------|-----------|-------|
| `INT` | `INTEGER` | Same functionality |
| `VARCHAR(255)` | `VARCHAR(255)` | Same |
| `TEXT` | `TEXT` | Same |
| `DATETIME` | `TIMESTAMP` | PostgreSQL more precise |
| `TINYINT(1)` | `BOOLEAN` | Use true/false in PostgreSQL |
| `ENUM('a','b')` | `VARCHAR` with CHECK | PostgreSQL has ENUM but VARCHAR is simpler |

### 3. Auto-increment
```sql
-- MySQL
id INT PRIMARY KEY AUTO_INCREMENT

-- PostgreSQL
id SERIAL PRIMARY KEY
-- or
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY
```

### 4. Case Sensitivity
- PostgreSQL is case-sensitive for table/column names (unless quoted)
- Use lowercase names consistently: `users`, `user_id`, not `Users`, `UserId`

---

## Converting Your SQL Migrations

Your MySQL migrations in `Server/db/migrations/` need minor adjustments for PostgreSQL.

### Example: 001_create_users_table.sql

**MySQL version**:
```sql
CREATE TABLE users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  is_admin TINYINT(1) DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**PostgreSQL version**:
```sql
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Updating Your Code

### 1. Update Query Placeholders

The `database.js` file has been updated to support both MySQL and PostgreSQL.

**Before (MySQL only)**:
```javascript
const [rows] = await db.execute(
  'SELECT * FROM users WHERE email = ?', 
  [email]
);
```

**After (works with both)**:
```javascript
// For MySQL: uses ?
// For PostgreSQL: uses $1
const [rows] = await db.execute(
  'SELECT * FROM users WHERE email = ?',  // Will be converted based on DB_TYPE
  [email]
);
```

### 2. Handle Boolean Values

**MySQL** returns `0` or `1` for boolean fields.  
**PostgreSQL** returns `true` or `false`.

```javascript
// Your code should work with both
if (user.is_admin) {  // Works for both 1/0 and true/false
  // Admin logic
}

// When inserting
await db.execute(
  'INSERT INTO users (is_admin) VALUES (?)',
  [true]  // PostgreSQL accepts true/false, MySQL accepts 1/0
);
```

### 3. Date Handling

Both MySQL and PostgreSQL support similar date functions:

```javascript
// Works in both
const [rows] = await db.execute(
  'SELECT * FROM orders WHERE created_at >= ?',
  [new Date()]
);
```

---

## Migration Steps

### Option 1: Fresh PostgreSQL Database (Recommended)

1. **Use your existing migration files** (convert them if needed)
2. **Run migrations on PostgreSQL**:
   ```bash
   # Set environment to PostgreSQL
   DB_TYPE=postgres
   DB_HOST=your-aiven-host.aivencloud.com
   DB_PORT=12345
   DB_USER=avnadmin
   DB_PASSWORD=your-password
   DB_NAME=defaultdb
   DB_SSL=true

   # Run migrations
   node Server/tests/run-all-migrations.js
   ```

### Option 2: Export Data from MySQL to PostgreSQL

If you have existing data in MySQL:

1. **Export data from MySQL**:
   ```bash
   mysqldump -u root -p tailoring_management > backup.sql
   ```

2. **Convert MySQL dump to PostgreSQL**:
   - Use [mysql2postgres](https://github.com/maxlapshin/mysql2postgres)
   - Or manually edit the dump file

3. **Import to PostgreSQL**:
   ```bash
   psql "postgresql://avnadmin:PASSWORD@HOST:PORT/defaultdb?sslmode=require" < converted_backup.sql
   ```

---

## Testing Your PostgreSQL Connection

Create a test file to verify connection:

**`Server/tests/test-postgres.js`**:
```javascript
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false }
});

async function testConnection() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ PostgreSQL connected successfully!');
    console.log('Server time:', result.rows[0].now);
    
    // Test table access
    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log('\nAvailable tables:', tables.rows.map(r => r.table_name));
    
    await pool.end();
  } catch (error) {
    console.error('❌ Connection error:', error.message);
    process.exit(1);
  }
}

testConnection();
```

Run test:
```bash
DB_TYPE=postgres node Server/tests/test-postgres.js
```

---

## Common Issues

### Issue: SSL Connection Failed

**Solution**: Ensure `DB_SSL=true` and use `rejectUnauthorized: false` for Aiven certificates:
```javascript
ssl: {
  rejectUnauthorized: false
}
```

### Issue: Syntax Errors in Queries

**Problem**: Using MySQL-specific syntax in PostgreSQL.

**Common fixes**:
- Change `LIMIT ?` → `LIMIT $1`
- Change `TINYINT` → `BOOLEAN`
- Change `AUTO_INCREMENT` → `SERIAL`
- Change backticks → double quotes (for identifiers)

### Issue: Case Sensitivity

PostgreSQL treats unquoted identifiers as lowercase:
```sql
-- This creates table "users" (lowercase)
CREATE TABLE users (...);

-- This looks for "Users" (exact case) and fails
SELECT * FROM Users;

-- Solution: Always use lowercase
SELECT * FROM users;
```

---

## Production Checklist

- [ ] All SQL migrations converted to PostgreSQL syntax
- [ ] Database connection tested with Aiven.io
- [ ] All queries updated (if using raw SQL with placeholders)
- [ ] Boolean values handled correctly
- [ ] Date/time handling verified
- [ ] Connection pooling configured
- [ ] SSL enabled for Aiven connection
- [ ] Backup strategy in place

---

## Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [MySQL to PostgreSQL Migration Guide](https://wiki.postgresql.org/wiki/Converting_from_other_Databases_to_PostgreSQL)
- [Aiven PostgreSQL Documentation](https://docs.aiven.io/docs/products/postgresql)
- [node-postgres (pg) Documentation](https://node-postgres.com/)

---

**Your database configuration now supports both MySQL (local) and PostgreSQL (production)!** 🎉
