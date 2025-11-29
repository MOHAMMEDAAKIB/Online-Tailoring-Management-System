// =============================================================================
// ORDER ROUTES
// =============================================================================
// Maps HTTP routes to order controller functions

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authMiddleware, adminOnly } = require('../middleware/auth');
const { createOrderValidator, updateOrderStatusValidator } = require('../middleware/validators');

// Apply authentication to all routes
router.use(authMiddleware);

// =============================================================================
// ORDER ROUTES
// =============================================================================

/**
 * @route   POST /api/orders
 * @desc    Create a new order (Admin only)
 * @access  Private (Admin)
 */
router.post(
  '/',
  adminOnly,
  createOrderValidator,
  orderController.createOrder
);

/**
 * @route   GET /api/orders
 * @desc    Get all orders (Customer: own, Admin: all or filtered)
 * @access  Private
 */
router.get(
  '/',
  orderController.getAllOrders
);

/**
 * @route   GET /api/orders/:id
 * @desc    Get single order by ID (with ownership check)
 * @access  Private
 */
router.get(
  '/:id',
  orderController.getOrderById
);

/**
 * @route   PATCH /api/orders/:id/status
 * @desc    Update order status (Admin only)
 * @access  Private (Admin)
 */
router.patch(
  '/:id/status',
  adminOnly,
  updateOrderStatusValidator,
  orderController.updateOrderStatus
);

module.exports = router;
