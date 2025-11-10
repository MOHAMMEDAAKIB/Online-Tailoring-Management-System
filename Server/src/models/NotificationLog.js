// =============================================================================
// NOTIFICATION LOG MODEL - Tracks email and SMS notifications
// =============================================================================
// This model logs all notifications sent to users
// Tables: notification_logs

const db = require('../config/database');

class NotificationLog {
  
  // ===========================================================================
  // CREATE - Log new notification
  // ===========================================================================
  /**
   * Create a notification log entry
   * @param {Object} data - Notification data
   * @param {number} data.user_id - Recipient user ID
   * @param {string} data.channel - 'email' or 'sms'
   * @param {string} data.template - Template name (e.g., 'order_confirmation', 'payment_received')
   * @param {Object} data.payload - Data used in the notification
   * @param {string} data.status - 'pending', 'sent', or 'failed' (default: 'pending')
   * @param {string} data.error - Error message if failed (optional)
   * @returns {number} - The new log ID
   */
  static async create({
    user_id,
    channel,
    template,
    payload,
    status = 'pending',
    error = null
  }) {
    const sql = `
      INSERT INTO notification_logs (
        user_id, channel, template, payload, status, error, created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, NOW())
    `;
    
    const payloadJson = JSON.stringify(payload);
    
    const [result] = await db.execute(sql, [
      user_id, channel, template, payloadJson, status, error
    ]);
    
    return result.insertId;
  }

  // ===========================================================================
  // READ - Get log by ID
  // ===========================================================================
  /**
   * Get notification log with user details
   * @param {number} id - Log ID
   * @returns {Object|undefined} - Log object
   */
  static async findById(id) {
    const sql = `
      SELECT 
        nl.*,
        u.name as user_name,
        u.email as user_email,
        u.phone as user_phone
      FROM notification_logs nl
      JOIN users u ON nl.user_id = u.id
      WHERE nl.id = ?
      LIMIT 1
    `;
    
    const [rows] = await db.execute(sql, [id]);
    
    if (rows[0]) {
      rows[0].payload = JSON.parse(rows[0].payload);
    }
    
    return rows[0];
  }

  // ===========================================================================
  // READ - Get all logs for a user
  // ===========================================================================
  /**
   * Get all notification logs for a specific user
   * @param {number} userId - User ID
   * @param {number} limit - Max results (default: 50)
   * @returns {Array} - Array of log entries
   */
  static async findByUserId(userId, limit = 50) {
    const sql = `
      SELECT *
      FROM notification_logs
      WHERE user_id = ?
      ORDER BY created_at DESC
      LIMIT ?
    `;
    
    const [rows] = await db.execute(sql, [userId, limit]);
    
    rows.forEach(row => {
      row.payload = JSON.parse(row.payload);
    });
    
    return rows;
  }

  // ===========================================================================
  // READ - Get all logs
  // ===========================================================================
  /**
   * Get all notification logs with pagination
   * @param {Object} options - Query options
   * @param {number} options.limit - Max results (default: 50)
   * @param {number} options.offset - Skip results (default: 0)
   * @param {string} options.status - Filter by status (optional)
   * @param {string} options.channel - Filter by channel (optional)
   * @returns {Array} - Array of logs
   */
  static async findAll({ limit = 50, offset = 0, status, channel } = {}) {
    let sql = `
      SELECT 
        nl.*,
        u.name as user_name,
        u.email as user_email
      FROM notification_logs nl
      JOIN users u ON nl.user_id = u.id
    `;
    
    const params = [];
    const conditions = [];
    
    if (status) {
      conditions.push('nl.status = ?');
      params.push(status);
    }
    
    if (channel) {
      conditions.push('nl.channel = ?');
      params.push(channel);
    }
    
    if (conditions.length > 0) {
      sql += ` WHERE ${conditions.join(' AND ')}`;
    }
    
    sql += ` ORDER BY nl.created_at DESC LIMIT ? OFFSET ?`;
    params.push(limit, offset);
    
    const [rows] = await db.execute(sql, params);
    
    rows.forEach(row => {
      row.payload = JSON.parse(row.payload);
    });
    
    return rows;
  }

  // ===========================================================================
  // UPDATE - Mark notification as sent
  // ===========================================================================
  /**
   * Update notification status to 'sent'
   * @param {number} id - Log ID
   * @returns {boolean} - True if updated
   */
  static async markAsSent(id) {
    const sql = `
      UPDATE notification_logs
      SET status = 'sent', sent_at = NOW()
      WHERE id = ?
    `;
    
    const [result] = await db.execute(sql, [id]);
    return result.affectedRows > 0;
  }

  // ===========================================================================
  // UPDATE - Mark notification as failed
  // ===========================================================================
  /**
   * Update notification status to 'failed' with error message
   * @param {number} id - Log ID
   * @param {string} errorMessage - Error description
   * @returns {boolean} - True if updated
   */
  static async markAsFailed(id, errorMessage) {
    const sql = `
      UPDATE notification_logs
      SET status = 'failed', error = ?
      WHERE id = ?
    `;
    
    const [result] = await db.execute(sql, [errorMessage, id]);
    return result.affectedRows > 0;
  }

  // ===========================================================================
  // DELETE - Delete log
  // ===========================================================================
  /**
   * Delete a notification log
   * @param {number} id - Log ID
   * @returns {boolean} - True if deleted
   */
  static async delete(id) {
    const sql = `DELETE FROM notification_logs WHERE id = ?`;
    const [result] = await db.execute(sql, [id]);
    return result.affectedRows > 0;
  }

  // ===========================================================================
  // UTILITY - Get pending notifications
  // ===========================================================================
  /**
   * Get all pending notifications (for background processing)
   * @param {number} limit - Max results (default: 100)
   * @returns {Array} - Pending notifications
   */
  static async getPending(limit = 100) {
    const sql = `
      SELECT 
        nl.*,
        u.email as user_email,
        u.phone as user_phone
      FROM notification_logs nl
      JOIN users u ON nl.user_id = u.id
      WHERE nl.status = 'pending'
      ORDER BY nl.created_at ASC
      LIMIT ?
    `;
    
    const [rows] = await db.execute(sql, [limit]);
    
    rows.forEach(row => {
      row.payload = JSON.parse(row.payload);
    });
    
    return rows;
  }

  // ===========================================================================
  // UTILITY - Get failed notifications
  // ===========================================================================
  /**
   * Get all failed notifications (for retry or investigation)
   * @param {number} limit - Max results (default: 50)
   * @returns {Array} - Failed notifications
   */
  static async getFailed(limit = 50) {
    const sql = `
      SELECT 
        nl.*,
        u.name as user_name,
        u.email as user_email
      FROM notification_logs nl
      JOIN users u ON nl.user_id = u.id
      WHERE nl.status = 'failed'
      ORDER BY nl.created_at DESC
      LIMIT ?
    `;
    
    const [rows] = await db.execute(sql, [limit]);
    
    rows.forEach(row => {
      row.payload = JSON.parse(row.payload);
    });
    
    return rows;
  }

  // ===========================================================================
  // UTILITY - Count notifications by status
  // ===========================================================================
  /**
   * Count notifications grouped by status
   * @returns {Object} - { pending: 10, sent: 500, failed: 5 }
   */
  static async countByStatus() {
    const sql = `
      SELECT status, COUNT(*) as count
      FROM notification_logs
      GROUP BY status
    `;
    
    const [rows] = await db.execute(sql);
    
    const result = {
      pending: 0,
      sent: 0,
      failed: 0
    };
    
    rows.forEach(row => {
      result[row.status] = row.count;
    });
    
    return result;
  }

  // ===========================================================================
  // UTILITY - Count notifications by channel
  // ===========================================================================
  /**
   * Count notifications grouped by channel
   * @returns {Object} - { email: 300, sms: 200 }
   */
  static async countByChannel() {
    const sql = `
      SELECT channel, COUNT(*) as count
      FROM notification_logs
      GROUP BY channel
    `;
    
    const [rows] = await db.execute(sql);
    
    const result = {
      email: 0,
      sms: 0
    };
    
    rows.forEach(row => {
      result[row.channel] = row.count;
    });
    
    return result;
  }

  // ===========================================================================
  // UTILITY - Get recent notifications for dashboard
  // ===========================================================================
  /**
   * Get most recent notifications
   * @param {number} limit - Max results (default: 10)
   * @returns {Array} - Recent notifications
   */
  static async getRecent(limit = 10) {
    const sql = `
      SELECT 
        nl.id, nl.channel, nl.template, nl.status, nl.created_at,
        u.name as user_name
      FROM notification_logs nl
      JOIN users u ON nl.user_id = u.id
      ORDER BY nl.created_at DESC
      LIMIT ?
    `;
    
    const [rows] = await db.execute(sql, [limit]);
    return rows;
  }
}

module.exports = NotificationLog;

// =============================================================================
// USAGE EXAMPLES:
// =============================================================================
/*

// 1. Log a pending notification
const logId = await NotificationLog.create({
  user_id: 5,
  channel: 'email',
  template: 'order_confirmation',
  payload: {
    order_id: 123,
    order_total: 150.00,
    items: ['Shirt x2', 'Pants x1']
  },
  status: 'pending'
});

// 2. Mark notification as sent
await NotificationLog.markAsSent(logId);

// 3. Mark notification as failed
await NotificationLog.markAsFailed(logId, 'SMTP connection timeout');

// 4. Get pending notifications (for background worker)
const pending = await NotificationLog.getPending(100);

// 5. Get statistics
const stats = await NotificationLog.countByStatus();
// { pending: 10, sent: 500, failed: 5 }

const channelStats = await NotificationLog.countByChannel();
// { email: 300, sms: 200 }

*/
