// =============================================================================
// NOTIFICATION ROUTES
// =============================================================================
// Maps HTTP routes to notification controller functions

const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { authMiddleware, adminOnly } = require('../middleware/auth');
const { sendNotificationValidator } = require('../middleware/validators');

// Apply authentication to all routes
router.use(authMiddleware);

// =============================================================================
// NOTIFICATION ROUTES
// =============================================================================

/**
 * @route   POST /api/notifications/send
 * @desc    Send email/SMS notification (Admin only)
 * @access  Private (Admin)
 */
router.post(
  '/send',
  adminOnly,
  sendNotificationValidator,
  notificationController.sendNotification
);

/**
 * @route   GET /api/notifications/logs
 * @desc    Get notification logs (Customer: own, Admin: all)
 * @access  Private
 */
router.get(
  '/logs',
  notificationController.getNotificationLogs
);

module.exports = router;
