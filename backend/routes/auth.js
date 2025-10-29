const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateProfile } = require('../controllers/authController');
const { authMiddleware } = require('../middleware/auth');
const { authLimiter, apiLimiter } = require('../middleware/rateLimiter');

// Public routes with strict rate limiting
router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);

// Protected routes with general rate limiting
router.get('/profile', authMiddleware, apiLimiter, getProfile);
router.put('/profile', authMiddleware, apiLimiter, updateProfile);

module.exports = router;
