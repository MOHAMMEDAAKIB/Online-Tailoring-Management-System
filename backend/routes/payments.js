const express = require('express');
const router = express.Router();
const {
  createPaymentIntent,
  processPayment,
  getPaymentHistory
} = require('../controllers/paymentController');
const { authMiddleware } = require('../middleware/auth');
const { paymentLimiter, apiLimiter } = require('../middleware/rateLimiter');

// All routes require authentication
router.use(authMiddleware);

router.post('/intent', paymentLimiter, createPaymentIntent);
router.post('/process', paymentLimiter, processPayment);
router.get('/history', apiLimiter, getPaymentHistory);

module.exports = router;
