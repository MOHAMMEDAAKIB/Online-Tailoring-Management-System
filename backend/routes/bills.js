const express = require('express');
const router = express.Router();
const {
  createBill,
  getBills,
  getBillById,
  updateBill,
  deleteBill
} = require('../controllers/billController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const { apiLimiter } = require('../middleware/rateLimiter');

// All routes require authentication and rate limiting
router.use(authMiddleware);
router.use(apiLimiter);

router.get('/', getBills);
router.get('/:id', getBillById);

// Admin only routes
router.post('/', adminMiddleware, createBill);
router.put('/:id', adminMiddleware, updateBill);
router.delete('/:id', adminMiddleware, deleteBill);

module.exports = router;
