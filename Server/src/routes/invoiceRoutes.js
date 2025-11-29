// =============================================================================
// INVOICE ROUTES
// =============================================================================
// Maps HTTP routes to invoice controller functions

const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
const { authMiddleware } = require('../middleware/auth');

// Apply authentication to all routes
router.use(authMiddleware);

// =============================================================================
// INVOICE ROUTES
// =============================================================================

/**
 * @route   GET /api/invoices/:orderId
 * @desc    Get or generate invoice for an order
 * @access  Private (Customer: own orders, Admin: all)
 */
router.get(
  '/:orderId',
  invoiceController.getInvoiceByOrderId
);

module.exports = router;
