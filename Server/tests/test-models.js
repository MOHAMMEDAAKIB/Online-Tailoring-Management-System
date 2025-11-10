// =============================================================================
// TEST ALL MODELS - Verify database operations work correctly
// =============================================================================
// This script tests basic CRUD operations for all models
// Run this after migrations to ensure everything is set up correctly

require('dotenv').config();
const User = require('../src/models/User');
const Measurement = require('../src/models/Measurement');
const Order = require('../src/models/Order');
const Invoice = require('../src/models/Invoice');
const PaymentTransaction = require('../src/models/PaymentTransaction');
const NotificationLog = require('../src/models/NotificationLog');
const bcrypt = require('bcryptjs');

(async () => {
  try {
    console.log('🚀 Testing all models...\n');
    
    // =========================================================================
    // TEST 1: USER MODEL
    // =========================================================================
    console.log('📝 Testing User model...');
    
    // Create test user
    const hashedPassword = await bcrypt.hash('password123', 10);
    const userId = await User.create({
      name: 'Test Customer',
      email: `test${Date.now()}@example.com`,
      password_hash: hashedPassword,
      phone: '+1234567890',
      role: 'customer'
    });
    console.log(`   ✅ Created user ID: ${userId}`);
    
    // Find user by ID
    const user = await User.findById(userId);
    console.log(`   ✅ Found user: ${user.name}`);
    
    // Check email exists
    const exists = await User.emailExists(user.email);
    console.log(`   ✅ Email exists check: ${exists}`);
    
    // =========================================================================
    // TEST 2: MEASUREMENT MODEL
    // =========================================================================
    console.log('\n📏 Testing Measurement model...');
    
    const measurementId = await Measurement.create({
      user_id: userId,
      label: 'Test Measurement',
      chest: 40,
      waist: 32,
      hips: 38,
      sleeve: 24,
      shoulder: 18,
      neck: 15,
      length: 28,
      unit: 'inch',
      notes: 'Test measurement for verification'
    });
    console.log(`   ✅ Created measurement ID: ${measurementId}`);
    
    // Get user's measurements
    const measurements = await Measurement.findByUserId(userId);
    console.log(`   ✅ Found ${measurements.length} measurement(s) for user`);
    
    // =========================================================================
    // TEST 3: ORDER MODEL
    // =========================================================================
    console.log('\n📦 Testing Order model...');
    
    // Create admin user for order creation
    const adminId = await User.create({
      name: 'Test Admin',
      email: `admin${Date.now()}@example.com`,
      password_hash: hashedPassword,
      phone: '+0987654321',
      role: 'admin'
    });
    
    const orderId = await Order.create({
      user_id: userId,
      created_by: adminId,
      status: 'pending',
      items: [
        { item: 'Test Shirt', quantity: 2, price: 50.00, fabric: 'Cotton' },
        { item: 'Test Pants', quantity: 1, price: 75.00, fabric: 'Wool' }
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
    console.log(`   ✅ Created order ID: ${orderId}`);
    
    // Get order details
    const order = await Order.findById(orderId);
    console.log(`   ✅ Found order with ${order.items_json.length} items`);
    
    // Update order status
    await Order.updateStatus(orderId, 'in_progress');
    console.log(`   ✅ Updated order status to: in_progress`);
    
    // =========================================================================
    // TEST 4: INVOICE MODEL
    // =========================================================================
    console.log('\n🧾 Testing Invoice model...');
    
    const invoiceNo = await Invoice.generateInvoiceNumber();
    console.log(`   ✅ Generated invoice number: ${invoiceNo}`);
    
    const invoiceId = await Invoice.create({
      order_id: orderId,
      invoice_no: invoiceNo,
      items_snapshot: order.items_json,
      subtotal: 175.00,
      tax: 15.00,
      total: 180.00,
      paid: false
    });
    console.log(`   ✅ Created invoice ID: ${invoiceId}`);
    
    // Find invoice
    const invoice = await Invoice.findByInvoiceNo(invoiceNo);
    console.log(`   ✅ Found invoice for order ${invoice.order_id}`);
    
    // =========================================================================
    // TEST 5: PAYMENT TRANSACTION MODEL
    // =========================================================================
    console.log('\n💳 Testing PaymentTransaction model...');
    
    const transactionId = await PaymentTransaction.create({
      provider: 'stripe',
      provider_payment_id: `test_payment_${Date.now()}`,
      order_id: orderId,
      amount: 180.00,
      currency: 'USD',
      status: 'pending',
      raw_payload: {
        test: true,
        timestamp: Date.now()
      }
    });
    console.log(`   ✅ Created transaction ID: ${transactionId}`);
    
    // Update transaction status
    await PaymentTransaction.updateStatus(transactionId, 'completed');
    console.log(`   ✅ Updated transaction status to: completed`);
    
    // Mark invoice as paid
    await Invoice.markAsPaid(invoiceId, transactionId);
    console.log(`   ✅ Marked invoice as paid`);
    
    // =========================================================================
    // TEST 6: NOTIFICATION LOG MODEL
    // =========================================================================
    console.log('\n📧 Testing NotificationLog model...');
    
    const notifId = await NotificationLog.create({
      user_id: userId,
      channel: 'email',
      template: 'order_confirmation',
      payload: {
        order_id: orderId,
        order_total: 180.00,
        items: ['Test Shirt x2', 'Test Pants x1']
      },
      status: 'pending'
    });
    console.log(`   ✅ Created notification log ID: ${notifId}`);
    
    // Mark as sent
    await NotificationLog.markAsSent(notifId);
    console.log(`   ✅ Marked notification as sent`);
    
    // =========================================================================
    // GET STATISTICS
    // =========================================================================
    console.log('\n📊 Getting statistics...');
    
    const userStats = await User.countByRole();
    console.log(`   Users: ${userStats.total} (${userStats.customers} customers, ${userStats.admins} admins)`);
    
    const orderStats = await Order.countByStatus();
    console.log(`   Orders by status:`, orderStats);
    
    const revenue = await Invoice.getTotalRevenue();
    console.log(`   Total revenue: $${parseFloat(revenue || 0).toFixed(2)}`);
    
    const paymentStats = await PaymentTransaction.countByStatus();
    console.log(`   Payments by status:`, paymentStats);
    
    const notifStats = await NotificationLog.countByStatus();
    console.log(`   Notifications by status:`, notifStats);
    
    console.log('\n🎉 All model tests passed successfully!');
    console.log('\n⚠️  Note: This created test data in your database.');
    console.log('   You may want to clean it up manually.');
    
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ Model test failed:');
    console.error('Message:', error.message);
    console.error('Code:', error.code);
    console.error('SQL:', error.sql);
    console.error('\nFull error:', error);
    process.exit(1);
  }
})();
