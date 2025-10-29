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

// All routes require authentication
router.use(authMiddleware);

router.get('/', getBills);
router.get('/:id', getBillById);

// Admin only routes
router.post('/', adminMiddleware, createBill);
router.put('/:id', adminMiddleware, updateBill);
router.delete('/:id', adminMiddleware, deleteBill);

module.exports = router;
