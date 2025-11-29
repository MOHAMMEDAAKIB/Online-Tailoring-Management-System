// =============================================================================
// PAYMENT CONTROLLER
// =============================================================================
// Handles payment checkout creation and webhook processing
// Note: This is a basic implementation. Integrate with Stripe/PayHere as needed.

const PaymentTransaction = require('../models/PaymentTransaction');
const Invoice = require('../models/Invoice');
const Order = require('../models/Order');

// =============================================================================
// 1. CREATE CHECKOUT SESSION
// =============================================================================
/**
 * Create a payment checkout session
 * Returns a checkout URL or session ID for hosted checkout
 * 
 * For Stripe: Use stripe.checkout.sessions.create()
 * For PayHere: Use PayHere API to create payment
 * 
 * @route   POST /api/payments/create-checkout
 * @access  Private
 */
const createCheckout = async (req, res) => {
  try {
    const { userId, role } = req.user;
    const { order_id, provider } = req.body;

    // Validate provider
    const validProviders = ['stripe', 'payhere', 'cash', 'bank_transfer'];
    if (!validProviders.includes(provider)) {
      return res.status(400).json({
        success: false,
        message: `Invalid provider. Must be one of: ${validProviders.join(', ')}`
      });
    }

    // Check if order exists
    const order = await Order.findById(order_id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check ownership (if customer)
    if (role === 'customer' && order.user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: 'You can only create checkout for your own orders'
      });
    }

    // Check if order already has successful payment
    const existingPayment = await PaymentTransaction.getSuccessfulPayment(order_id);
    if (existingPayment) {
      return res.status(400).json({
        success: false,
        message: 'This order has already been paid'
      });
    }

    // =============================================================================
    // PAYMENT PROVIDER INTEGRATION
    // =============================================================================
    // TODO: Integrate with actual payment provider
    // For now, we'll create a mock checkout session

    let checkoutData;

    if (provider === 'stripe') {
      // TODO: Implement Stripe Checkout
      // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
      // const session = await stripe.checkout.sessions.create({
      //   payment_method_types: ['card'],
      //   line_items: order.items_json.map(item => ({...})),
      //   mode: 'payment',
      //   success_url: `${process.env.FRONTEND_URL}/orders/${order_id}/success`,
      //   cancel_url: `${process.env.FRONTEND_URL}/orders/${order_id}/cancel`,
      //   metadata: { order_id }
      // });
      // checkoutData = { url: session.url, session_id: session.id };

      checkoutData = {
        provider: 'stripe',
        checkout_url: `https://checkout.stripe.com/mock-session-${order_id}`,
        session_id: `cs_test_mock_${Date.now()}`
      };

    } else if (provider === 'payhere') {
      // TODO: Implement PayHere
      checkoutData = {
        provider: 'payhere',
        checkout_url: `https://www.payhere.lk/pay/mock-${order_id}`,
        merchant_id: process.env.PAYHERE_MERCHANT_ID || 'mock_merchant'
      };

    } else if (provider === 'cash' || provider === 'bank_transfer') {
      // Manual payment methods
      checkoutData = {
        provider,
        message: `Please complete ${provider.replace('_', ' ')} payment and provide proof to admin`
      };
    }

    // Create pending payment transaction
    const transactionId = await PaymentTransaction.create({
      provider,
      provider_payment_id: checkoutData.session_id || `manual_${Date.now()}`,
      order_id,
      amount: order.total,
      currency: 'USD',
      status: 'pending',
      raw_payload: checkoutData
    });

    console.log(`💳 Checkout created for order ${order_id} via ${provider}`);

    res.status(201).json({
      success: true,
      message: 'Checkout session created',
      data: {
        transaction_id: transactionId,
        ...checkoutData
      }
    });

  } catch (error) {
    console.error('❌ Create checkout error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating checkout session',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// =============================================================================
// 2. PAYMENT WEBHOOK HANDLER
// =============================================================================
/**
 * Handle payment provider webhooks
 * Verifies webhook signature and updates payment status
 * 
 * @route   POST /api/webhooks/payments
 * @access  Public (but verified via signature)
 */
const handleWebhook = async (req, res) => {
  try {
    const signature = req.headers['stripe-signature'] || req.headers['x-payhere-signature'];
    const payload = req.body;

    console.log('🔔 Payment webhook received');

    // =============================================================================
    // SIGNATURE VERIFICATION
    // =============================================================================
    // TODO: Verify webhook signature based on provider
    
    // For Stripe:
    // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    // const event = stripe.webhooks.constructEvent(
    //   req.body,
    //   signature,
    //   process.env.STRIPE_WEBHOOK_SECRET
    // );

    // For PayHere:
    // Verify using MD5 hash of merchant_id + order_id + amount + status_code + md5sig

    // Mock verification for now
    if (!payload || !payload.provider_payment_id) {
      return res.status(400).json({
        success: false,
        message: 'Invalid webhook payload'
      });
    }

    // =============================================================================
    // PROCESS PAYMENT STATUS
    // =============================================================================
    const { provider_payment_id, status, order_id } = payload;

    // Find transaction by provider payment ID
    const transaction = await PaymentTransaction.findByProviderPaymentId(provider_payment_id);

    if (!transaction) {
      console.error(`❌ Transaction not found for payment ID: ${provider_payment_id}`);
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    // Map webhook status to our status
    let newStatus = 'pending';
    if (status === 'succeeded' || status === 'completed' || status === 2) {
      newStatus = 'completed';
    } else if (status === 'failed' || status === -1) {
      newStatus = 'failed';
    }

    // Update transaction status
    await PaymentTransaction.updateByProviderPaymentId(
      provider_payment_id,
      newStatus,
      payload
    );

    // If payment completed, mark invoice as paid
    if (newStatus === 'completed') {
      const invoice = await Invoice.findByOrderId(transaction.order_id);
      if (invoice) {
        await Invoice.markAsPaid(invoice.id, transaction.id);
        console.log(`✅ Invoice ${invoice.invoice_no} marked as paid`);
      }

      // Update order status to in_progress
      await Order.updateStatus(transaction.order_id, 'in_progress');
      console.log(`✅ Order ${transaction.order_id} status updated to in_progress`);
    }

    console.log(`✅ Payment ${provider_payment_id} status updated to: ${newStatus}`);

    res.json({
      success: true,
      message: 'Webhook processed successfully'
    });

  } catch (error) {
    console.error('❌ Webhook processing error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing webhook',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// =============================================================================
// Export all controller functions
// =============================================================================
module.exports = {
  createCheckout,
  handleWebhook
};
