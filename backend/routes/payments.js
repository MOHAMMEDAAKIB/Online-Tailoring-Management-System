const express = require('express');
const router = express.Router();
const {
  createPaymentIntent,
  processPayment,
  getPaymentHistory
} = require('../controllers/paymentController');
const { authMiddleware } = require('../middleware/auth');

// All routes require authentication
router.use(authMiddleware);

router.post('/intent', createPaymentIntent);
router.post('/process', processPayment);
router.get('/history', getPaymentHistory);

module.exports = router;
