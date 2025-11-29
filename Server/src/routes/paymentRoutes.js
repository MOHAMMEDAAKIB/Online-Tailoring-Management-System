// =============================================================================
// PAYMENT ROUTES
// =============================================================================
// Maps HTTP routes to payment controller functions

const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { authMiddleware, adminOnly } = require('../middleware/auth');
const { createCheckoutValidator } = require('../middleware/validators');

// =============================================================================
// PAYMENT ROUTES
// =============================================================================

/**
 * @route   POST /api/payments/create-checkout
 * @desc    Create payment checkout session
 * @access  Private
 */
router.post(
  '/create-checkout',
  authMiddleware,
  createCheckoutValidator,
  paymentController.createCheckout
);

/**
 * @route   POST /api/webhooks/payments
 * @desc    Handle payment provider webhooks (Stripe/PayHere)
 * @access  Public (verified via signature)
 * @note    This route should NOT have authMiddleware as webhooks come from external services
 */
router.post(
  '/webhook',
  paymentController.handleWebhook
);

module.exports = router;
