const pool = require('../config/database');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { sendEmail } = require('../utils/email');

// Create payment intent
const createPaymentIntent = async (req, res) => {
  try {
    const { billId } = req.body;

    // Get bill details
    const [bills] = await pool.query(
      'SELECT * FROM bills WHERE id = ? AND user_id = ?',
      [billId, req.user.id]
    );

    if (bills.length === 0) {
      return res.status(404).json({ message: 'Bill not found' });
    }

    const bill = bills[0];

    if (bill.payment_status === 'paid') {
      return res.status(400).json({ message: 'Bill already paid' });
    }

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(bill.total_amount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        billId: bill.id,
        orderId: bill.order_id,
        userId: req.user.id
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      amount: bill.total_amount
    });
  } catch (error) {
    console.error('Create payment intent error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Process payment
const processPayment = async (req, res) => {
  try {
    const { billId, paymentIntentId } = req.body;

    // Verify payment with Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ message: 'Payment not successful' });
    }

    // Get bill details
    const [bills] = await pool.query('SELECT * FROM bills WHERE id = ?', [billId]);

    if (bills.length === 0) {
      return res.status(404).json({ message: 'Bill not found' });
    }

    const bill = bills[0];

    // Update bill payment status
    await pool.query(
      'UPDATE bills SET payment_status = ?, payment_method = ?, transaction_id = ? WHERE id = ?',
      ['paid', 'stripe', paymentIntentId, billId]
    );

    // Record payment transaction
    await pool.query(
      'INSERT INTO payment_transactions (bill_id, stripe_payment_id, amount, status) VALUES (?, ?, ?, ?)',
      [billId, paymentIntentId, bill.total_amount, 'succeeded']
    );

    // Get user email
    const [users] = await pool.query('SELECT email, name FROM users WHERE id = ?', [bill.user_id]);

    if (users.length > 0) {
      await sendEmail(
        users[0].email,
        'Payment Successful',
        `<h1>Payment Confirmed</h1>
         <p>Dear ${users[0].name},</p>
         <p>Your payment of $${bill.total_amount} has been processed successfully.</p>
         <p>Transaction ID: ${paymentIntentId}</p>
         <p>Thank you for your payment!</p>`
      );

      // Create notification
      await pool.query(
        'INSERT INTO notifications (user_id, title, message, type) VALUES (?, ?, ?, ?)',
        [bill.user_id, 'Payment Successful', 
         `Your payment of $${bill.total_amount} has been processed successfully.`, 'success']
      );
    }

    res.json({ 
      message: 'Payment processed successfully',
      transactionId: paymentIntentId
    });
  } catch (error) {
    console.error('Process payment error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get payment history
const getPaymentHistory = async (req, res) => {
  try {
    let query = `
      SELECT pt.*, b.order_id, b.amount, o.order_type 
      FROM payment_transactions pt
      JOIN bills b ON pt.bill_id = b.id
      JOIN orders o ON b.order_id = o.id
    `;
    let params = [];

    if (req.user.role === 'customer') {
      query += ' WHERE b.user_id = ?';
      params.push(req.user.id);
    }

    query += ' ORDER BY pt.payment_date DESC';

    const [transactions] = await pool.query(query, params);

    res.json({ transactions });
  } catch (error) {
    console.error('Get payment history error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createPaymentIntent,
  processPayment,
  getPaymentHistory
};
