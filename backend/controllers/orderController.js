const pool = require('../config/database');
const { sendEmail } = require('../utils/email');

// Create a new order
const createOrder = async (req, res) => {
  try {
    const {
      measurement_id, order_type, fabric_type, color,
      design_preference, quantity, delivery_date
    } = req.body;

    const userId = req.user.id;

    const [result] = await pool.query(
      `INSERT INTO orders 
      (user_id, measurement_id, order_type, fabric_type, color, 
       design_preference, quantity, delivery_date) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [userId, measurement_id, order_type, fabric_type, color,
       design_preference, quantity, delivery_date]
    );

    // Get user email
    const [users] = await pool.query('SELECT email, name FROM users WHERE id = ?', [userId]);
    
    if (users.length > 0) {
      await sendEmail(
        users[0].email,
        'Order Confirmation',
        `<h1>Order Placed Successfully</h1>
         <p>Dear ${users[0].name},</p>
         <p>Your order #${result.insertId} has been placed successfully.</p>
         <p>Order Type: ${order_type}</p>
         <p>We will notify you once your order is in progress.</p>`
      );
    }

    // Create notification
    await pool.query(
      'INSERT INTO notifications (user_id, title, message, type) VALUES (?, ?, ?, ?)',
      [userId, 'Order Placed', `Your order #${result.insertId} has been placed successfully.`, 'success']
    );

    res.status(201).json({ 
      message: 'Order created successfully', 
      orderId: result.insertId 
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all orders
const getOrders = async (req, res) => {
  try {
    let query = `
      SELECT o.*, u.name as customer_name, u.email as customer_email 
      FROM orders o 
      JOIN users u ON o.user_id = u.id
    `;
    let params = [];

    if (req.user.role === 'customer') {
      query += ' WHERE o.user_id = ?';
      params.push(req.user.id);
    }

    query += ' ORDER BY o.created_at DESC';

    const [orders] = await pool.query(query, params);

    res.json({ orders });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [orders] = await pool.query(
      `SELECT o.*, u.name as customer_name, u.email as customer_email,
       m.chest, m.waist, m.hip, m.shoulder, m.sleeve_length
       FROM orders o 
       JOIN users u ON o.user_id = u.id
       LEFT JOIN measurements m ON o.measurement_id = m.id
       WHERE o.id = ?`,
      [id]
    );

    if (orders.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check authorization
    if (req.user.role !== 'admin' && orders[0].user_id !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json({ order: orders[0] });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update order status (admin only)
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const [orders] = await pool.query('SELECT * FROM orders WHERE id = ?', [id]);

    if (orders.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await pool.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);

    // Get user details for notification
    const [users] = await pool.query(
      'SELECT email, name FROM users WHERE id = ?',
      [orders[0].user_id]
    );

    if (users.length > 0) {
      await sendEmail(
        users[0].email,
        'Order Status Update',
        `<h1>Order Status Updated</h1>
         <p>Dear ${users[0].name},</p>
         <p>Your order #${id} status has been updated to: <strong>${status}</strong></p>`
      );

      // Create notification
      await pool.query(
        'INSERT INTO notifications (user_id, title, message, type) VALUES (?, ?, ?, ?)',
        [orders[0].user_id, 'Order Status Update', 
         `Your order #${id} status has been updated to ${status}.`, 'info']
      );
    }

    res.json({ message: 'Order status updated successfully' });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update order details
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      order_type, fabric_type, color, design_preference,
      quantity, delivery_date
    } = req.body;

    const [orders] = await pool.query('SELECT * FROM orders WHERE id = ?', [id]);

    if (orders.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (req.user.role !== 'admin' && orders[0].user_id !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await pool.query(
      `UPDATE orders SET 
       order_type = ?, fabric_type = ?, color = ?, design_preference = ?,
       quantity = ?, delivery_date = ?
       WHERE id = ?`,
      [order_type, fabric_type, color, design_preference, quantity, delivery_date, id]
    );

    res.json({ message: 'Order updated successfully' });
  } catch (error) {
    console.error('Update order error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete order
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const [orders] = await pool.query('SELECT * FROM orders WHERE id = ?', [id]);

    if (orders.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (req.user.role !== 'admin' && orders[0].user_id !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await pool.query('DELETE FROM orders WHERE id = ?', [id]);

    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Delete order error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  updateOrder,
  deleteOrder
};
