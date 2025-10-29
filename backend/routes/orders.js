const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  updateOrder,
  deleteOrder
} = require('../controllers/orderController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const { apiLimiter } = require('../middleware/rateLimiter');

// All routes require authentication and rate limiting
router.use(authMiddleware);
router.use(apiLimiter);

router.post('/', createOrder);
router.get('/', getOrders);
router.get('/:id', getOrderById);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

// Admin only route
router.patch('/:id/status', adminMiddleware, updateOrderStatus);

module.exports = router;
