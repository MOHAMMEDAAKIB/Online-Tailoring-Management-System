const pool = require('../config/database');
const { sendEmail } = require('../utils/email');

// Get all notifications for user
const getNotifications = async (req, res) => {
  try {
    const [notifications] = await pool.query(
      'SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );

    res.json({ notifications });
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Mark notification as read
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      'UPDATE notifications SET is_read = TRUE WHERE id = ? AND user_id = ?',
      [id, req.user.id]
    );

    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    console.error('Mark as read error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Send alert to all customers (admin only)
const sendAlert = async (req, res) => {
  try {
    const { title, message, type } = req.body;

    // Get all customer users
    const [users] = await pool.query('SELECT id, email, name FROM users WHERE role = ?', ['customer']);

    // Create notifications for all customers
    for (const user of users) {
      await pool.query(
        'INSERT INTO notifications (user_id, title, message, type) VALUES (?, ?, ?, ?)',
        [user.id, title, message, type || 'info']
      );

      // Send email
      await sendEmail(
        user.email,
        title,
        `<h1>${title}</h1><p>Dear ${user.name},</p><p>${message}</p>`
      );
    }

    res.json({ 
      message: 'Alert sent successfully',
      recipientCount: users.length
    });
  } catch (error) {
    console.error('Send alert error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Send notification to specific user (admin only)
const sendNotificationToUser = async (req, res) => {
  try {
    const { userId, title, message, type } = req.body;

    // Create notification
    await pool.query(
      'INSERT INTO notifications (user_id, title, message, type) VALUES (?, ?, ?, ?)',
      [userId, title, message, type || 'info']
    );

    // Get user email
    const [users] = await pool.query('SELECT email, name FROM users WHERE id = ?', [userId]);

    if (users.length > 0) {
      await sendEmail(
        users[0].email,
        title,
        `<h1>${title}</h1><p>Dear ${users[0].name},</p><p>${message}</p>`
      );
    }

    res.json({ message: 'Notification sent successfully' });
  } catch (error) {
    console.error('Send notification error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete notification
const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      'DELETE FROM notifications WHERE id = ? AND user_id = ?',
      [id, req.user.id]
    );

    res.json({ message: 'Notification deleted successfully' });
  } catch (error) {
    console.error('Delete notification error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getNotifications,
  markAsRead,
  sendAlert,
  sendNotificationToUser,
  deleteNotification
};
