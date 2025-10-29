const express = require('express');
const router = express.Router();
const {
  getNotifications,
  markAsRead,
  sendAlert,
  sendNotificationToUser,
  deleteNotification
} = require('../controllers/notificationController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// All routes require authentication
router.use(authMiddleware);

router.get('/', getNotifications);
router.patch('/:id/read', markAsRead);
router.delete('/:id', deleteNotification);

// Admin only routes
router.post('/alert', adminMiddleware, sendAlert);
router.post('/send', adminMiddleware, sendNotificationToUser);

module.exports = router;
