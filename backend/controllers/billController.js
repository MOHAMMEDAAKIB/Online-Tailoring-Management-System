const pool = require('../config/database');
const { sendEmail } = require('../utils/email');

// Create a new bill
const createBill = async (req, res) => {
  try {
    const { order_id, amount, tax } = req.body;

    // Check if order exists
    const [orders] = await pool.query('SELECT * FROM orders WHERE id = ?', [order_id]);
    
    if (orders.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const userId = orders[0].user_id;
    const totalAmount = parseFloat(amount) + parseFloat(tax || 0);

    const [result] = await pool.query(
      'INSERT INTO bills (order_id, user_id, amount, tax, total_amount) VALUES (?, ?, ?, ?, ?)',
      [order_id, userId, amount, tax, totalAmount]
    );

    // Get user email
    const [users] = await pool.query('SELECT email, name FROM users WHERE id = ?', [userId]);
    
    if (users.length > 0) {
      await sendEmail(
        users[0].email,
        'New Bill Generated',
        `<h1>Bill Generated</h1>
         <p>Dear ${users[0].name},</p>
         <p>A new bill has been generated for your order #${order_id}</p>
         <p>Amount: $${amount}</p>
         <p>Tax: $${tax || 0}</p>
         <p>Total Amount: $${totalAmount}</p>
         <p>Please login to view and pay your bill.</p>`
      );

      // Create notification
      await pool.query(
        'INSERT INTO notifications (user_id, title, message, type) VALUES (?, ?, ?, ?)',
        [userId, 'Bill Generated', 
         `A new bill of $${totalAmount} has been generated for order #${order_id}.`, 'info']
      );
    }

    res.status(201).json({ 
      message: 'Bill created successfully', 
      billId: result.insertId 
    });
  } catch (error) {
    console.error('Create bill error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all bills
const getBills = async (req, res) => {
  try {
    let query = `
      SELECT b.*, o.order_type, u.name as customer_name, u.email as customer_email 
      FROM bills b 
      JOIN orders o ON b.order_id = o.id
      JOIN users u ON b.user_id = u.id
    `;
    let params = [];

    if (req.user.role === 'customer') {
      query += ' WHERE b.user_id = ?';
      params.push(req.user.id);
    }

    query += ' ORDER BY b.created_at DESC';

    const [bills] = await pool.query(query, params);

    res.json({ bills });
  } catch (error) {
    console.error('Get bills error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get bill by ID
const getBillById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [bills] = await pool.query(
      `SELECT b.*, o.order_type, o.fabric_type, o.color, 
       u.name as customer_name, u.email as customer_email
       FROM bills b 
       JOIN orders o ON b.order_id = o.id
       JOIN users u ON b.user_id = u.id
       WHERE b.id = ?`,
      [id]
    );

    if (bills.length === 0) {
      return res.status(404).json({ message: 'Bill not found' });
    }

    // Check authorization
    if (req.user.role !== 'admin' && bills[0].user_id !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json({ bill: bills[0] });
  } catch (error) {
    console.error('Get bill error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update bill
const updateBill = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, tax, payment_status } = req.body;

    const [bills] = await pool.query('SELECT * FROM bills WHERE id = ?', [id]);

    if (bills.length === 0) {
      return res.status(404).json({ message: 'Bill not found' });
    }

    const totalAmount = parseFloat(amount) + parseFloat(tax || 0);

    await pool.query(
      'UPDATE bills SET amount = ?, tax = ?, total_amount = ?, payment_status = ? WHERE id = ?',
      [amount, tax, totalAmount, payment_status, id]
    );

    res.json({ message: 'Bill updated successfully' });
  } catch (error) {
    console.error('Update bill error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete bill
const deleteBill = async (req, res) => {
  try {
    const { id } = req.params;

    const [bills] = await pool.query('SELECT * FROM bills WHERE id = ?', [id]);

    if (bills.length === 0) {
      return res.status(404).json({ message: 'Bill not found' });
    }

    await pool.query('DELETE FROM bills WHERE id = ?', [id]);

    res.json({ message: 'Bill deleted successfully' });
  } catch (error) {
    console.error('Delete bill error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createBill,
  getBills,
  getBillById,
  updateBill,
  deleteBill
};
