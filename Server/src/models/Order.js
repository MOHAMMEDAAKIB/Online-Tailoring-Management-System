// =============================================================================
// ORDER MODEL - Handles tailoring orders
// =============================================================================
// This model manages order creation, tracking, and updates
// Tables: orders

const db = require('../config/database');

class Order {
  
  // ===========================================================================
  // CREATE - Create new order
  // ===========================================================================
  /**
   * Create a new order
   * @param {Object} data - Order data
   * @param {number} data.user_id - Customer ID
   * @param {number} data.created_by - Admin user ID who created the order
   * @param {string} data.status - Order status (default: 'pending')
   * @param {Array} data.items - Array of order items
   * @param {Object} data.measurement_snapshot - Customer measurements at time of order
   * @param {number} data.subtotal - Subtotal amount
   * @param {number} data.tax - Tax amount
   * @param {number} data.discount - Discount amount
   * @param {number} data.total - Final total amount
   * @returns {number} - The new order ID
   */
  static async create({
    user_id,
    created_by,
    status = 'pending',
    items,
    measurement_snapshot,
    subtotal,
    tax,
    discount,
    total
  }) {
    const sql = `
      INSERT INTO orders (
        user_id, created_by, status, items_json, measurement_snapshot,
        subtotal, tax, discount, total, created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `;
    
    // Convert JavaScript objects to JSON strings
    const itemsJson = JSON.stringify(items);
    const measurementJson = JSON.stringify(measurement_snapshot);
    
    const [result] = await db.execute(sql, [
      user_id, created_by, status, itemsJson, measurementJson,
      subtotal, tax, discount, total
    ]);
    
    return result.insertId;
  }

  // ===========================================================================
  // READ - Get order by ID
  // ===========================================================================
  /**
   * Get a single order with customer and creator details
   * @param {number} id - Order ID
   * @returns {Object|undefined} - Order object with related data
   */
  static async findById(id) {
    const sql = `
      SELECT 
        o.*,
        u.name as customer_name,
        u.email as customer_email,
        u.phone as customer_phone,
        admin.name as created_by_name
      FROM orders o
      JOIN users u ON o.user_id = u.id
      JOIN users admin ON o.created_by = admin.id
      WHERE o.id = ?
      LIMIT 1
    `;
    
    const [rows] = await db.execute(sql, [id]);
    
    if (rows[0]) {
      // Parse JSON fields back to JavaScript objects
      rows[0].items_json = JSON.parse(rows[0].items_json);
      rows[0].measurement_snapshot = JSON.parse(rows[0].measurement_snapshot);
    }
    
    return rows[0];
  }

  // ===========================================================================
  // READ - Get all orders for a customer
  // ===========================================================================
  /**
   * Get all orders for a specific customer
   * @param {number} userId - Customer ID
   * @returns {Array} - Array of order objects
   */
  static async findByUserId(userId) {
    const sql = `
      SELECT 
        o.*,
        admin.name as created_by_name
      FROM orders o
      JOIN users admin ON o.created_by = admin.id
      WHERE o.user_id = ?
      ORDER BY o.created_at DESC
    `;
    
    const [rows] = await db.execute(sql, [userId]);
    
    // Parse JSON fields for each order
    rows.forEach(row => {
      row.items_json = JSON.parse(row.items_json);
      row.measurement_snapshot = JSON.parse(row.measurement_snapshot);
    });
    
    return rows;
  }

  // ===========================================================================
  // READ - Get all orders (admin view)
  // ===========================================================================
  /**
   * Get all orders with pagination
   * @param {Object} options - Query options
   * @param {number} options.limit - Max results (default: 50)
   * @param {number} options.offset - Skip results (default: 0)
   * @param {string} options.status - Filter by status (optional)
   * @returns {Array} - Array of orders
   */
  static async findAll({ limit = 50, offset = 0, status } = {}) {
    let sql = `
      SELECT 
        o.*,
        u.name as customer_name,
        u.email as customer_email,
        admin.name as created_by_name
      FROM orders o
      JOIN users u ON o.user_id = u.id
      JOIN users admin ON o.created_by = admin.id
    `;
    
    const params = [];
    
    if (status) {
      sql += ` WHERE o.status = ?`;
      params.push(status);
    }
    
    sql += ` ORDER BY o.created_at DESC LIMIT ? OFFSET ?`;
    params.push(limit, offset);
    
    const [rows] = await db.execute(sql, params);
    
    // Parse JSON fields
    rows.forEach(row => {
      row.items_json = JSON.parse(row.items_json);
      row.measurement_snapshot = JSON.parse(row.measurement_snapshot);
    });
    
    return rows;
  }

  // ===========================================================================
  // UPDATE - Update order status
  // ===========================================================================
  /**
   * Update order status (pending → in_progress → ready → delivered)
   * @param {number} id - Order ID
   * @param {string} status - New status
   * @returns {boolean} - True if updated, false if not found
   */
  static async updateStatus(id, status) {
    const sql = `
      UPDATE orders
      SET status = ?, updated_at = NOW()
      WHERE id = ?
    `;
    
    const [result] = await db.execute(sql, [status, id]);
    return result.affectedRows > 0;
  }

  // ===========================================================================
  // UPDATE - Update order details
  // ===========================================================================
  /**
   * Update order financial details
   * @param {number} id - Order ID
   * @param {Object} updates - Fields to update
   * @returns {boolean} - True if updated
   */
  static async update(id, { subtotal, tax, discount, total }) {
    const sql = `
      UPDATE orders
      SET 
        subtotal = COALESCE(?, subtotal),
        tax = COALESCE(?, tax),
        discount = COALESCE(?, discount),
        total = COALESCE(?, total),
        updated_at = NOW()
      WHERE id = ?
    `;
    
    const [result] = await db.execute(sql, [subtotal, tax, discount, total, id]);
    return result.affectedRows > 0;
  }

  // ===========================================================================
  // DELETE - Cancel order
  // ===========================================================================
  /**
   * Delete an order
   * @param {number} id - Order ID
   * @returns {boolean} - True if deleted
   */
  static async delete(id) {
    const sql = `DELETE FROM orders WHERE id = ?`;
    const [result] = await db.execute(sql, [id]);
    return result.affectedRows > 0;
  }

  // ===========================================================================
  // UTILITY - Count orders by status
  // ===========================================================================
  /**
   * Count orders grouped by status (for dashboard)
   * @returns {Object} - { pending: 5, in_progress: 3, ready: 2, delivered: 10 }
   */
  static async countByStatus() {
    const sql = `
      SELECT status, COUNT(*) as count
      FROM orders
      GROUP BY status
    `;
    
    const [rows] = await db.execute(sql);
    
    const result = {
      pending: 0,
      in_progress: 0,
      ready: 0,
      delivered: 0,
      cancelled: 0
    };
    
    rows.forEach(row => {
      result[row.status] = row.count;
    });
    
    return result;
  }

  // ===========================================================================
  // UTILITY - Get total revenue
  // ===========================================================================
  /**
   * Calculate total revenue from delivered orders
   * @returns {number} - Total revenue
   */
  static async getTotalRevenue() {
    const sql = `
      SELECT SUM(total) as revenue
      FROM orders
      WHERE status = 'delivered'
    `;
    
    const [rows] = await db.execute(sql);
    return rows[0].revenue || 0;
  }

  // ===========================================================================
  // UTILITY - Get recent orders
  // ===========================================================================
  /**
   * Get most recent orders (for dashboard)
   * @param {number} limit - Number of orders (default: 10)
   * @returns {Array} - Recent orders
   */
  static async getRecent(limit = 10) {
    const sql = `
      SELECT 
        o.id, o.status, o.total, o.created_at,
        u.name as customer_name
      FROM orders o
      JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
      LIMIT ?
    `;
    
    const [rows] = await db.execute(sql, [limit]);
    return rows;
  }
}

module.exports = Order;

// =============================================================================
// USAGE EXAMPLES:
// =============================================================================
/*

// 1. Create a new order
const orderId = await Order.create({
  user_id: 5,
  created_by: 1, // Admin ID
  status: 'pending',
  items: [
    { item: 'Shirt', quantity: 2, price: 50, fabric: 'Cotton' },
    { item: 'Pants', quantity: 1, price: 75, fabric: 'Wool' }
  ],
  measurement_snapshot: {
    chest: 40,
    waist: 32,
    sleeve: 24
  },
  subtotal: 175.00,
  tax: 15.00,
  discount: 10.00,
  total: 180.00
});

// 2. Get order details
const order = await Order.findById(1);

// 3. Get all orders for a customer
const customerOrders = await Order.findByUserId(5);

// 4. Update order status
await Order.updateStatus(1, 'in_progress');

// 5. Get dashboard statistics
const stats = await Order.countByStatus();
const revenue = await Order.getTotalRevenue();

*/
