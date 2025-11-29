// =============================================================================
// USER MODEL - Handles all database operations for users table
// =============================================================================
// This model manages user authentication, registration, and profile data
// Tables: users

const db = require('../config/database');

class User {
  
  // ===========================================================================
  // CREATE - Register a new user
  // ===========================================================================
  /**
   * Create a new user in the database
   * @param {Object} userData - User information
   * @param {string} userData.name - User's full name
   * @param {string} userData.email - User's email (must be unique)
   * @param {string} userData.password_hash - Hashed password (use bcrypt!)
   * @param {string} userData.phone - Phone number (optional)
   * @param {string} userData.role - 'admin' or 'customer' (default: customer)
   * @returns {number} - The new user's ID
   */
  static async create({ name, email, password_hash, phone, role = 'customer' }) {
    const sql = `
      INSERT INTO users (name, email, password_hash, phone, role, created_at)
      VALUES (?, ?, ?, ?, ?, NOW())
    `;
    
    // Execute query with parameters (prevents SQL injection)
    const [result] = await db.execute(sql, [name, email, password_hash, phone, role]);
    
    // Return the auto-generated ID
    return result.insertId;
  }

  // ===========================================================================
  // READ - Find user by email (for login)
  // ===========================================================================
  /**
   * Find a user by their email address
   * Used during login to verify credentials
   * @param {string} email - User's email
   * @returns {Object|undefined} - User object with password_hash, or undefined if not found
   */
  static async findByEmail(email) {
    const sql = `
      SELECT id, name, email, password_hash, phone, role, created_at, updated_at
      FROM users
      WHERE email = ?
      LIMIT 1
    `;
    
    const [rows] = await db.execute(sql, [email]);
    
    // Return first result or undefined if no user found
    return rows[0];
  }

  // ===========================================================================
  // READ - Find user by ID
  // ===========================================================================
  /**
   * Find a user by their ID
   * Used to get user profile (does NOT return password_hash for security)
   * @param {number} id - User's ID
   * @returns {Object|undefined} - User object without password_hash
   */
  static async findById(id) {
    const sql = `
      SELECT id, name, email, phone, role, created_at, updated_at
      FROM users
      WHERE id = ?
      LIMIT 1
    `;
    
    const [rows] = await db.execute(sql, [id]);
    return rows[0];
  }

  // ===========================================================================
  // READ - Get all users
  // ===========================================================================
  /**
   * Get all users in the system (admin only)
   * @returns {Array} - Array of all user objects
   */
  static async findAll() {
    const sql = `
      SELECT id, name, email, phone, role, created_at
      FROM users
      ORDER BY created_at DESC
    `;
    
    const [rows] = await db.execute(sql);
    return rows;
  }

  // ===========================================================================
  // READ - Get all customers (admin feature)
  // ===========================================================================
  /**
   * Get all users with role='customer'
   * Used by admins to see customer list
   * @returns {Array} - Array of customer objects
   */
  static async findAllCustomers() {
    const sql = `
      SELECT id, name, email, phone, created_at
      FROM users
      WHERE role = 'customer'
      ORDER BY created_at DESC
    `;
    
    const [rows] = await db.execute(sql);
    return rows;
  }

  // ===========================================================================
  // READ - Get all admins
  // ===========================================================================
  /**
   * Get all users with role='admin'
   * Used for admin management
   * @returns {Array} - Array of admin user objects
   */
  static async findAllAdmins() {
    const sql = `
      SELECT id, name, email, phone, created_at
      FROM users
      WHERE role = 'admin'
      ORDER BY created_at DESC
    `;
    
    const [rows] = await db.execute(sql);
    return rows;
  }

  // ===========================================================================
  // UPDATE - Update user profile
  // ===========================================================================
  /**
   * Update user's profile information
   * Does NOT update email or password (separate methods for those)
   * @param {number} id - User's ID
   * @param {Object} updates - Fields to update
   * @param {string} updates.name - New name
   * @param {string} updates.phone - New phone
   * @returns {boolean} - True if updated, false if user not found
   */
  static async update(id, { name, phone }) {
    const sql = `
      UPDATE users
      SET name = ?, phone = ?, updated_at = NOW()
      WHERE id = ?
    `;
    
    const [result] = await db.execute(sql, [name, phone, id]);
    
    // affectedRows > 0 means the user was found and updated
    return result.affectedRows > 0;
  }

  // ===========================================================================
  // UPDATE - Change password
  // ===========================================================================
  /**
   * Update user's password (requires hashed password)
   * @param {number} id - User's ID
   * @param {string} newPasswordHash - New hashed password (use bcrypt!)
   * @returns {boolean} - True if updated, false if user not found
   */
  static async updatePassword(id, newPasswordHash) {
    const sql = `
      UPDATE users
      SET password_hash = ?, updated_at = NOW()
      WHERE id = ?
    `;
    
    const [result] = await db.execute(sql, [newPasswordHash, id]);
    return result.affectedRows > 0;
  }

  // ===========================================================================
  // DELETE - Remove user
  // ===========================================================================
  /**
   * Delete a user from the database
   * WARNING: This will cascade delete related orders, measurements, etc.
   * @param {number} id - User's ID
   * @returns {boolean} - True if deleted, false if user not found
   */
  static async delete(id) {
    const sql = `DELETE FROM users WHERE id = ?`;
    const [result] = await db.execute(sql, [id]);
    return result.affectedRows > 0;
  }

  // ===========================================================================
  // UTILITY - Check if email exists
  // ===========================================================================
  /**
   * Check if an email is already registered
   * Used during registration to prevent duplicates
   * @param {string} email - Email to check
   * @returns {boolean} - True if email exists, false otherwise
   */
  static async emailExists(email) {
    const sql = `SELECT COUNT(*) as count FROM users WHERE email = ?`;
    const [rows] = await db.execute(sql, [email]);
    return rows[0].count > 0;
  }

  // ===========================================================================
  // UTILITY - Count users by role
  // ===========================================================================
  /**
   * Count users by role (for dashboard statistics)
   * @returns {Object} - { customers: 10, admins: 2, total: 12 }
   */
  static async countByRole() {
    const sql = `
      SELECT 
        role,
        COUNT(*) as count
      FROM users
      GROUP BY role
    `;
    
    const [rows] = await db.execute(sql);
    
    // Transform array into object
    const result = { customers: 0, admins: 0, total: 0 };
    rows.forEach(row => {
      result[row.role + 's'] = row.count;
      result.total += row.count;
    });
    
    return result;
  }
}

module.exports = User;

// =============================================================================
// USAGE EXAMPLES:
// =============================================================================
/*

// 1. Create a new user
const userId = await User.create({
  name: 'John Doe',
  email: 'john@example.com',
  password_hash: hashedPassword,
  phone: '+1234567890',
  role: 'customer'
});

// 2. Find user by email (for login)
const user = await User.findByEmail('john@example.com');
if (user) {
  // Compare password
  const isValid = await bcrypt.compare(password, user.password_hash);
}

// 3. Get user profile by ID
const profile = await User.findById(1);

// 4. Update user profile
const updated = await User.update(1, {
  name: 'John Smith',
  phone: '+0987654321'
});

// 5. Check if email exists
const exists = await User.emailExists('john@example.com');

// 6. Delete user
const deleted = await User.delete(1);

*/
