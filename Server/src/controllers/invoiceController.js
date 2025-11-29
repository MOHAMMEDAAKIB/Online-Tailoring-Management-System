// =============================================================================
// INVOICE CONTROLLER
// =============================================================================
// Handles invoice generation and retrieval for orders

const Invoice = require('../models/Invoice');
const Order = require('../models/Order');

// =============================================================================
// GET/GENERATE INVOICE FOR ORDER
// =============================================================================
/**
 * Fetch or generate invoice for an order
 * If invoice exists, return it. If not, generate new one.
 * 
 * @route   GET /api/invoices/:orderId
 * @access  Private (Customer: own orders, Admin: all)
 */
const getInvoiceByOrderId = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { userId, role } = req.user;

    // Check if order exists
    const order = await Order.findById(orderId);
    
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
        message: 'You can only access invoices for your own orders'
      });
    }

    // Check if invoice already exists
    let invoice = await Invoice.findByOrderId(orderId);

    // If no invoice exists, generate one
    if (!invoice) {
      console.log(`📄 Generating new invoice for order ${orderId}`);

      // Generate invoice number
      const invoiceNo = await Invoice.generateInvoiceNumber();

      // Create invoice with order snapshot
      const invoiceId = await Invoice.create({
        order_id: orderId,
        invoice_no: invoiceNo,
        items_snapshot: order.items_json,
        subtotal: order.subtotal,
        tax: order.tax,
        total: order.total,
        paid: false
      });

      // Fetch created invoice
      invoice = await Invoice.findById(invoiceId);
      
      console.log(`✅ Invoice ${invoiceNo} created for order ${orderId}`);
    } else {
      console.log(`📄 Invoice ${invoice.invoice_no} retrieved for order ${orderId}`);
    }

    res.json({
      success: true,
      data: {
        invoice
      }
    });

  } catch (error) {
    console.error('❌ Get/Generate invoice error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing invoice',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// =============================================================================
// Export controller function
// =============================================================================
module.exports = {
  getInvoiceByOrderId
};
