// =============================================================================
// PAYMENT TRANSACTION MODEL - Handles payment gateway transactions
// =============================================================================
// This model records all payment attempts and results from payment providers
// Tables: payment_transactions

const db = require('../config/database');

class PaymentTransaction {
  
  // ===========================================================================
  // CREATE - Record new payment transaction
  // ===========================================================================
  /**
   * Create a new payment transaction record
   * @param {Object} data - Transaction data
   * @param {string} data.provider - Payment provider ('stripe', 'payhere', 'cash', 'bank_transfer')
   * @param {string} data.provider_payment_id - Unique ID from payment provider
   * @param {number} data.order_id - Order ID
   * @param {number} data.amount - Payment amount
   * @param {string} data.currency - Currency code (default: 'USD')
   * @param {string} data.status - Payment status ('pending', 'completed', 'failed', 'refunded')
   * @param {Object} data.raw_payload - Full response from payment gateway
   * @returns {number} - The new transaction ID
   */
  static async create({
    provider,
    provider_payment_id,
    order_id,
    amount,
    currency = 'USD',
    status = 'pending',
    raw_payload
  }) {
    const sql = `
      INSERT INTO payment_transactions (
        provider, provider_payment_id, order_id, amount, currency,
        status, raw_payload, created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
    `;
    
    const payloadJson = JSON.stringify(raw_payload);
    
    const [result] = await db.execute(sql, [
      provider, provider_payment_id, order_id, amount, currency,
      status, payloadJson
    ]);
    
    return result.insertId;
  }

  // ===========================================================================
  // READ - Get transaction by ID
  // ===========================================================================
  /**
   * Get payment transaction with order details
   * @param {number} id - Transaction ID
   * @returns {Object|undefined} - Transaction object
   */
  static async findById(id) {
    const sql = `
      SELECT 
        pt.*,
        o.user_id,
        o.total as order_total,
        u.name as customer_name,
        u.email as customer_email
      FROM payment_transactions pt
      JOIN orders o ON pt.order_id = o.id
      JOIN users u ON o.user_id = u.id
      WHERE pt.id = ?
      LIMIT 1
    `;
    
    const [rows] = await db.execute(sql, [id]);
    
    if (rows[0]) {
      rows[0].raw_payload = JSON.parse(rows[0].raw_payload);
    }
    
    return rows[0];
  }

  // ===========================================================================
  // READ - Get transaction by provider payment ID
  // ===========================================================================
  /**
   * Find transaction by payment provider's unique ID
   * Used during webhook processing to update transaction status
   * @param {string} providerPaymentId - Provider's payment ID (e.g., Stripe payment_intent ID)
   * @returns {Object|undefined} - Transaction object
   */
  static async findByProviderPaymentId(providerPaymentId) {
    const sql = `
      SELECT *
      FROM payment_transactions
      WHERE provider_payment_id = ?
      LIMIT 1
    `;
    
    const [rows] = await db.execute(sql, [providerPaymentId]);
    
    if (rows[0]) {
      rows[0].raw_payload = JSON.parse(rows[0].raw_payload);
    }
    
    return rows[0];
  }

  // ===========================================================================
  // READ - Get all transactions for an order
  // ===========================================================================
  /**
   * Get all payment attempts for an order
   * @param {number} orderId - Order ID
   * @returns {Array} - Array of transactions
   */
  static async findByOrderId(orderId) {
    const sql = `
      SELECT *
      FROM payment_transactions
      WHERE order_id = ?
      ORDER BY created_at DESC
    `;
    
    const [rows] = await db.execute(sql, [orderId]);
    
    rows.forEach(row => {
      row.raw_payload = JSON.parse(row.raw_payload);
    });
    
    return rows;
  }

  // ===========================================================================
  // READ - Get all transactions
  // ===========================================================================
  /**
   * Get all payment transactions with pagination
   * @param {Object} options - Query options
   * @param {number} options.limit - Max results (default: 50)
   * @param {number} options.offset - Skip results (default: 0)
   * @param {string} options.status - Filter by status (optional)
   * @param {string} options.provider - Filter by provider (optional)
   * @returns {Array} - Array of transactions
   */
  static async findAll({ limit = 50, offset = 0, status, provider } = {}) {
    let sql = `
      SELECT 
        pt.*,
        o.user_id,
        u.name as customer_name,
        u.email as customer_email
      FROM payment_transactions pt
      JOIN orders o ON pt.order_id = o.id
      JOIN users u ON o.user_id = u.id
    `;
    
    const params = [];
    const conditions = [];
    
    if (status) {
      conditions.push('pt.status = ?');
      params.push(status);
    }
    
    if (provider) {
      conditions.push('pt.provider = ?');
      params.push(provider);
    }
    
    if (conditions.length > 0) {
      sql += ` WHERE ${conditions.join(' AND ')}`;
    }
    
    sql += ` ORDER BY pt.created_at DESC LIMIT ? OFFSET ?`;
    params.push(limit, offset);
    
    const [rows] = await db.execute(sql, params);
    
    rows.forEach(row => {
      row.raw_payload = JSON.parse(row.raw_payload);
    });
    
    return rows;
  }

  // ===========================================================================
  // UPDATE - Update transaction status
  // ===========================================================================
  /**
   * Update payment transaction status
   * Used when webhook confirms payment completion
   * @param {number} id - Transaction ID
   * @param {string} status - New status ('completed', 'failed', 'refunded')
   * @param {Object} additionalPayload - Additional data from webhook (optional)
   * @returns {boolean} - True if updated
   */
  static async updateStatus(id, status, additionalPayload = null) {
    let sql = `
      UPDATE payment_transactions
      SET status = ?, updated_at = NOW()
    `;
    
    const params = [status];
    
    if (additionalPayload) {
      sql += `, raw_payload = ?`;
      params.push(JSON.stringify(additionalPayload));
    }
    
    sql += ` WHERE id = ?`;
    params.push(id);
    
    const [result] = await db.execute(sql, params);
    return result.affectedRows > 0;
  }

  // ===========================================================================
  // UPDATE - Update by provider payment ID
  // ===========================================================================
  /**
   * Update transaction status by provider's payment ID
   * @param {string} providerPaymentId - Provider's payment ID
   * @param {string} status - New status
   * @param {Object} additionalPayload - Additional webhook data
   * @returns {boolean} - True if updated
   */
  static async updateByProviderPaymentId(providerPaymentId, status, additionalPayload = null) {
    let sql = `
      UPDATE payment_transactions
      SET status = ?, updated_at = NOW()
    `;
    
    const params = [status];
    
    if (additionalPayload) {
      sql += `, raw_payload = ?`;
      params.push(JSON.stringify(additionalPayload));
    }
    
    sql += ` WHERE provider_payment_id = ?`;
    params.push(providerPaymentId);
    
    const [result] = await db.execute(sql, params);
    return result.affectedRows > 0;
  }

  // ===========================================================================
  // DELETE - Delete transaction
  // ===========================================================================
  /**
   * Delete a payment transaction
   * @param {number} id - Transaction ID
   * @returns {boolean} - True if deleted
   */
  static async delete(id) {
    const sql = `DELETE FROM payment_transactions WHERE id = ?`;
    const [result] = await db.execute(sql, [id]);
    return result.affectedRows > 0;
  }

  // ===========================================================================
  // UTILITY - Get successful transaction for order
  // ===========================================================================
  /**
   * Get the successful (completed) payment for an order
   * @param {number} orderId - Order ID
   * @returns {Object|undefined} - Successful transaction or undefined
   */
  static async getSuccessfulPayment(orderId) {
    const sql = `
      SELECT *
      FROM payment_transactions
      WHERE order_id = ? AND status = 'completed'
      ORDER BY created_at DESC
      LIMIT 1
    `;
    
    const [rows] = await db.execute(sql, [orderId]);
    
    if (rows[0]) {
      rows[0].raw_payload = JSON.parse(rows[0].raw_payload);
    }
    
    return rows[0];
  }

  // ===========================================================================
  // UTILITY - Calculate total revenue by provider
  // ===========================================================================
  /**
   * Calculate total successful payments grouped by provider
   * @returns {Object} - { stripe: 5000, payhere: 3000, cash: 2000 }
   */
  static async getRevenueByProvider() {
    const sql = `
      SELECT provider, SUM(amount) as total
      FROM payment_transactions
      WHERE status = 'completed'
      GROUP BY provider
    `;
    
    const [rows] = await db.execute(sql);
    
    const result = {};
    rows.forEach(row => {
      result[row.provider] = parseFloat(row.total);
    });
    
    return result;
  }

  // ===========================================================================
  // UTILITY - Get failed transactions
  // ===========================================================================
  /**
   * Get all failed payment attempts (for troubleshooting)
   * @param {number} limit - Max results (default: 50)
   * @returns {Array} - Failed transactions
   */
  static async getFailedTransactions(limit = 50) {
    const sql = `
      SELECT 
        pt.*,
        o.user_id,
        u.name as customer_name,
        u.email as customer_email
      FROM payment_transactions pt
      JOIN orders o ON pt.order_id = o.id
      JOIN users u ON o.user_id = u.id
      WHERE pt.status = 'failed'
      ORDER BY pt.created_at DESC
      LIMIT ?
    `;
    
    const [rows] = await db.execute(sql, [limit]);
    
    rows.forEach(row => {
      row.raw_payload = JSON.parse(row.raw_payload);
    });
    
    return rows;
  }

  // ===========================================================================
  // UTILITY - Count transactions by status
  // ===========================================================================
  /**
   * Count transactions grouped by status
   * @returns {Object} - { pending: 5, completed: 100, failed: 3, refunded: 2 }
   */
  static async countByStatus() {
    const sql = `
      SELECT status, COUNT(*) as count
      FROM payment_transactions
      GROUP BY status
    `;
    
    const [rows] = await db.execute(sql);
    
    const result = {
      pending: 0,
      completed: 0,
      failed: 0,
      refunded: 0
    };
    
    rows.forEach(row => {
      result[row.status] = row.count;
    });
    
    return result;
  }
}

module.exports = PaymentTransaction;

// =============================================================================
// USAGE EXAMPLES:
// =============================================================================
/*

// 1. Create transaction when user initiates payment
const transactionId = await PaymentTransaction.create({
  provider: 'stripe',
  provider_payment_id: 'pi_3ABC123...',
  order_id: 1,
  amount: 110.00,
  currency: 'USD',
  status: 'pending',
  raw_payload: {
    id: 'pi_3ABC123...',
    amount: 11000,
    currency: 'usd'
  }
});

// 2. Update status when webhook confirms payment
await PaymentTransaction.updateByProviderPaymentId(
  'pi_3ABC123...',
  'completed',
  { status: 'succeeded', paid: true }
);

// 3. Get successful payment for order
const payment = await PaymentTransaction.getSuccessfulPayment(1);

// 4. Get revenue by provider
const revenue = await PaymentTransaction.getRevenueByProvider();
// { stripe: 50000, payhere: 30000, cash: 20000 }

// 5. Get failed transactions
const failed = await PaymentTransaction.getFailedTransactions(10);

*/
