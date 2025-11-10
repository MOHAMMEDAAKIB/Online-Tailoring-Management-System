// =============================================================================
// INVOICE MODEL - Handles invoice generation and payment tracking
// =============================================================================
// This model manages invoices for orders
// Tables: invoices

const db = require('../config/database');

class Invoice {
  
  // ===========================================================================
  // CREATE - Generate invoice for an order
  // ===========================================================================
  /**
   * Create a new invoice for an order
   * @param {Object} data - Invoice data
   * @param {number} data.order_id - Order ID
   * @param {string} data.invoice_no - Human-readable invoice number (e.g., INV-2025-001)
   * @param {Array} data.items_snapshot - Copy of order items at invoice time
   * @param {number} data.subtotal - Subtotal amount
   * @param {number} data.tax - Tax amount
   * @param {number} data.total - Final total
   * @param {boolean} data.paid - Payment status (default: false)
   * @param {number} data.payment_id - Payment transaction ID (optional)
   * @returns {number} - The new invoice ID
   */
  static async create({
    order_id,
    invoice_no,
    items_snapshot,
    subtotal,
    tax,
    total,
    paid = false,
    payment_id = null
  }) {
    const sql = `
      INSERT INTO invoices (
        order_id, invoice_no, items_snapshot, subtotal, tax, total,
        paid, payment_id, issued_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `;
    
    const itemsJson = JSON.stringify(items_snapshot);
    
    const [result] = await db.execute(sql, [
      order_id, invoice_no, itemsJson, subtotal, tax, total, paid, payment_id
    ]);
    
    return result.insertId;
  }

  // ===========================================================================
  // READ - Get invoice by ID
  // ===========================================================================
  /**
   * Get invoice with order and customer details
   * @param {number} id - Invoice ID
   * @returns {Object|undefined} - Invoice object
   */
  static async findById(id) {
    const sql = `
      SELECT 
        i.*,
        o.status as order_status,
        u.name as customer_name,
        u.email as customer_email,
        u.phone as customer_phone,
        u.role as customer_role
      FROM invoices i
      JOIN orders o ON i.order_id = o.id
      JOIN users u ON o.user_id = u.id
      WHERE i.id = ?
      LIMIT 1
    `;
    
    const [rows] = await db.execute(sql, [id]);
    
    if (rows[0]) {
      rows[0].items_snapshot = JSON.parse(rows[0].items_snapshot);
    }
    
    return rows[0];
  }

  // ===========================================================================
  // READ - Get invoice by invoice number
  // ===========================================================================
  /**
   * Find invoice by its invoice number
   * @param {string} invoiceNo - Invoice number (e.g., "INV-2025-001")
   * @returns {Object|undefined} - Invoice object
   */
  static async findByInvoiceNo(invoiceNo) {
    const sql = `
      SELECT 
        i.*,
        o.status as order_status,
        u.name as customer_name,
        u.email as customer_email
      FROM invoices i
      JOIN orders o ON i.order_id = o.id
      JOIN users u ON o.user_id = u.id
      WHERE i.invoice_no = ?
      LIMIT 1
    `;
    
    const [rows] = await db.execute(sql, [invoiceNo]);
    
    if (rows[0]) {
      rows[0].items_snapshot = JSON.parse(rows[0].items_snapshot);
    }
    
    return rows[0];
  }

  // ===========================================================================
  // READ - Get invoice by order ID
  // ===========================================================================
  /**
   * Get invoice for a specific order
   * @param {number} orderId - Order ID
   * @returns {Object|undefined} - Invoice object
   */
  static async findByOrderId(orderId) {
    const sql = `
      SELECT *
      FROM invoices
      WHERE order_id = ?
      LIMIT 1
    `;
    
    const [rows] = await db.execute(sql, [orderId]);
    
    if (rows[0]) {
      rows[0].items_snapshot = JSON.parse(rows[0].items_snapshot);
    }
    
    return rows[0];
  }

  // ===========================================================================
  // READ - Get all invoices
  // ===========================================================================
  /**
   * Get all invoices with pagination
   * @param {Object} options - Query options
   * @param {number} options.limit - Max results (default: 50)
   * @param {number} options.offset - Skip results (default: 0)
   * @param {boolean} options.paid - Filter by payment status (optional)
   * @returns {Array} - Array of invoices
   */
  static async findAll({ limit = 50, offset = 0, paid } = {}) {
    let sql = `
      SELECT 
        i.*,
        u.name as customer_name,
        u.email as customer_email
      FROM invoices i
      JOIN orders o ON i.order_id = o.id
      JOIN users u ON o.user_id = u.id
    `;
    
    const params = [];
    
    if (paid !== undefined) {
      sql += ` WHERE i.paid = ?`;
      params.push(paid);
    }
    
    sql += ` ORDER BY i.issued_at DESC LIMIT ? OFFSET ?`;
    params.push(limit, offset);
    
    const [rows] = await db.execute(sql, params);
    
    // Parse JSON for each invoice
    rows.forEach(row => {
      row.items_snapshot = JSON.parse(row.items_snapshot);
    });
    
    return rows;
  }

  // ===========================================================================
  // UPDATE - Mark invoice as paid
  // ===========================================================================
  /**
   * Mark an invoice as paid and link payment transaction
   * @param {number} id - Invoice ID
   * @param {number} paymentId - Payment transaction ID
   * @returns {boolean} - True if updated
   */
  static async markAsPaid(id, paymentId) {
    const sql = `
      UPDATE invoices
      SET paid = 1, payment_id = ?, updated_at = NOW()
      WHERE id = ?
    `;
    
    const [result] = await db.execute(sql, [paymentId, id]);
    return result.affectedRows > 0;
  }

  // ===========================================================================
  // UPDATE - Mark invoice as unpaid
  // ===========================================================================
  /**
   * Mark an invoice as unpaid (for refunds/corrections)
   * @param {number} id - Invoice ID
   * @returns {boolean} - True if updated
   */
  static async markAsUnpaid(id) {
    const sql = `
      UPDATE invoices
      SET paid = 0, payment_id = NULL, updated_at = NOW()
      WHERE id = ?
    `;
    
    const [result] = await db.execute(sql, [id]);
    return result.affectedRows > 0;
  }

  // ===========================================================================
  // DELETE - Delete invoice
  // ===========================================================================
  /**
   * Delete an invoice
   * @param {number} id - Invoice ID
   * @returns {boolean} - True if deleted
   */
  static async delete(id) {
    const sql = `DELETE FROM invoices WHERE id = ?`;
    const [result] = await db.execute(sql, [id]);
    return result.affectedRows > 0;
  }

  // ===========================================================================
  // UTILITY - Generate next invoice number
  // ===========================================================================
  /**
   * Generate the next sequential invoice number
   * Format: INV-YYYY-XXX (e.g., INV-2025-001)
   * @returns {string} - Next invoice number
   */
  static async generateInvoiceNumber() {
    const year = new Date().getFullYear();
    const prefix = `INV-${year}-`;
    
    const sql = `
      SELECT invoice_no
      FROM invoices
      WHERE invoice_no LIKE ?
      ORDER BY invoice_no DESC
      LIMIT 1
    `;
    
    const [rows] = await db.execute(sql, [`${prefix}%`]);
    
    if (rows.length === 0) {
      // First invoice of the year
      return `${prefix}001`;
    }
    
    // Extract number and increment
    const lastNumber = parseInt(rows[0].invoice_no.split('-')[2]);
    const nextNumber = (lastNumber + 1).toString().padStart(3, '0');
    
    return `${prefix}${nextNumber}`;
  }

  // ===========================================================================
  // UTILITY - Get unpaid invoices
  // ===========================================================================
  /**
   * Get all unpaid invoices
   * @returns {Array} - Array of unpaid invoices
   */
  static async getUnpaid() {
    const sql = `
      SELECT 
        i.*,
        u.name as customer_name,
        u.email as customer_email
      FROM invoices i
      JOIN orders o ON i.order_id = o.id
      JOIN users u ON o.user_id = u.id
      WHERE i.paid = 0
      ORDER BY i.issued_at ASC
    `;
    
    const [rows] = await db.execute(sql);
    
    rows.forEach(row => {
      row.items_snapshot = JSON.parse(row.items_snapshot);
    });
    
    return rows;
  }

  // ===========================================================================
  // UTILITY - Calculate total revenue
  // ===========================================================================
  /**
   * Calculate total paid amount from all invoices
   * @returns {number} - Total revenue
   */
  static async getTotalRevenue() {
    const sql = `
      SELECT SUM(total) as revenue
      FROM invoices
      WHERE paid = 1
    `;
    
    const [rows] = await db.execute(sql);
    return rows[0].revenue || 0;
  }

  // ===========================================================================
  // UTILITY - Calculate outstanding amount
  // ===========================================================================
  /**
   * Calculate total unpaid amount
   * @returns {number} - Outstanding amount
   */
  static async getOutstandingAmount() {
    const sql = `
      SELECT SUM(total) as outstanding
      FROM invoices
      WHERE paid = 0
    `;
    
    const [rows] = await db.execute(sql);
    return rows[0].outstanding || 0;
  }
}

module.exports = Invoice;

// =============================================================================
// USAGE EXAMPLES:
// =============================================================================
/*

// 1. Generate invoice number
const invoiceNo = await Invoice.generateInvoiceNumber(); // "INV-2025-001"

// 2. Create invoice
const invoiceId = await Invoice.create({
  order_id: 1,
  invoice_no: invoiceNo,
  items_snapshot: [
    { item: 'Shirt', quantity: 2, price: 50 }
  ],
  subtotal: 100.00,
  tax: 10.00,
  total: 110.00,
  paid: false
});

// 3. Find invoice by number
const invoice = await Invoice.findByInvoiceNo('INV-2025-001');

// 4. Mark as paid
await Invoice.markAsPaid(1, paymentTransactionId);

// 5. Get unpaid invoices
const unpaid = await Invoice.getUnpaid();

// 6. Get financial statistics
const revenue = await Invoice.getTotalRevenue();
const outstanding = await Invoice.getOutstandingAmount();

*/
