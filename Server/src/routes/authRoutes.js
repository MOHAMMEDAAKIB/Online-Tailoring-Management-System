// =============================================================================
// AUTHENTICATION ROUTES
// =============================================================================
// Maps URLs to controller functions with validation and security middleware
// Think of this as a "phone directory" for authentication features

const express = require('express');
const router = express.Router();

// Import controllers (the workers who do the job)
const authController = require('../controllers/authController');

// Import middleware (the security guards and validators)
const { authMiddleware } = require('../middleware/auth');
const {
  validateRegister,
  validateLogin,
  validateRefreshToken,
  validateUpdateProfile,
  validateChangePassword
} = require('../middleware/validators');

// =============================================================================
// PUBLIC ROUTES (No authentication required)
// =============================================================================

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user (customer or admin)
 * @access  Public
 * 
 * Request body example:
 * {
 *   "name": "John Doe",
 *   "email": "john@example.com",
 *   "password": "SecurePass123",
 *   "phone": "+94771234567",
 *   "role": "customer"
 * }
 * 
 * Response: 201 Created
 * {
 *   "success": true,
 *   "message": "User registered successfully",
 *   "data": {
 *     "user": { id, name, email, role },
 *     "accessToken": "eyJhbGci...",
 *     "refreshToken": "eyJhbGci..."
 *   }
 * }
 */
router.post('/register', validateRegister, authController.register);

/**
 * @route   POST /api/auth/login
 * @desc    Login with email and password
 * @access  Public
 * 
 * Request body example:
 * {
 *   "email": "john@example.com",
 *   "password": "SecurePass123"
 * }
 * 
 * Response: 200 OK
 * {
 *   "success": true,
 *   "message": "Login successful",
 *   "data": {
 *     "user": { id, name, email, role },
 *     "accessToken": "eyJhbGci...",
 *     "refreshToken": "eyJhbGci..."
 *   }
 * }
 */
router.post('/login', validateLogin, authController.login);

/**
 * @route   POST /api/auth/refresh
 * @desc    Get new access token using refresh token
 * @access  Public (but requires valid refresh token)
 * 
 * Use case: When accessToken expires (after 24h), use this to get new one
 * 
 * Request body example:
 * {
 *   "refreshToken": "eyJhbGci..."
 * }
 * 
 * Response: 200 OK
 * {
 *   "success": true,
 *   "message": "Token refreshed successfully",
 *   "data": {
 *     "accessToken": "eyJhbGci..."
 *   }
 * }
 */
router.post('/refresh', validateRefreshToken, authController.refreshToken);

// =============================================================================
// PROTECTED ROUTES (Authentication required)
// =============================================================================
// All routes below require valid JWT token in Authorization header

/**
 * @route   GET /api/auth/me
 * @desc    Get current user's profile
 * @access  Private (requires authentication)
 * 
 * Headers required:
 * Authorization: Bearer eyJhbGci...
 * 
 * Response: 200 OK
 * {
 *   "success": true,
 *   "data": {
 *     "id": 1,
 *     "name": "John Doe",
 *     "email": "john@example.com",
 *     "role": "customer",
 *     "phone": "+94771234567",
 *     "created_at": "2025-11-10T10:30:00.000Z"
 *   }
 * }
 */
router.get('/me', authMiddleware, authController.getCurrentUser);

/**
 * @route   GET /api/auth/users
 * @desc    Get all users (admin only)
 * @access  Private (Admin only)
 * 
 * Headers required:
 * Authorization: Bearer eyJhbGci...
 * 
 * Response: 200 OK
 * {
 *   "success": true,
 *   "count": 10,
 *   "data": [
 *     {
 *       "id": 1,
 *       "name": "John Doe",
 *       "email": "john@example.com",
 *       "role": "customer",
 *       "phone": "+94771234567",
 *       "created_at": "2025-11-10T10:30:00.000Z"
 *     }
 *   ]
 * }
 */
router.get('/users', authMiddleware, authController.getAllUsers);

/**
 * @route   PUT /api/auth/profile
 * @desc    Update user's profile (name, phone)
 * @access  Private
 * 
 * Headers: Authorization: Bearer <token>
 * 
 * Request body example:
 * {
 *   "name": "John Updated",
 *   "phone": "+94779876543"
 * }
 * 
 * Response: 200 OK
 * {
 *   "success": true,
 *   "message": "Profile updated successfully",
 *   "data": { updated user object }
 * }
 */
router.put('/profile', authMiddleware, validateUpdateProfile, authController.updateProfile);

/**
 * @route   PUT /api/auth/change-password
 * @desc    Change user's password
 * @access  Private
 * 
 * Headers: Authorization: Bearer <token>
 * 
 * Request body example:
 * {
 *   "currentPassword": "OldPass123",
 *   "newPassword": "NewSecurePass456",
 *   "confirmPassword": "NewSecurePass456"
 * }
 * 
 * Response: 200 OK
 * {
 *   "success": true,
 *   "message": "Password changed successfully"
 * }
 */
router.put('/change-password', authMiddleware, validateChangePassword, authController.changePassword);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user (invalidate tokens)
 * @access  Private
 * 
 * Headers: Authorization: Bearer <token>
 * 
 * Note: Currently client-side logout (delete tokens from storage)
 * Future: Can implement token blacklist in database
 * 
 * Response: 200 OK
 * {
 *   "success": true,
 *   "message": "Logged out successfully"
 * }
 */
router.post('/logout', authMiddleware, authController.logout);

// =============================================================================
// Export the router
// =============================================================================
module.exports = router;

// =============================================================================
// HOW TO USE IN app.js:
// =============================================================================
/*

const authRoutes = require('./src/routes/authRoutes');

// Mount the router at /api/auth
app.use('/api/auth', authRoutes);

// Now all routes are accessible:
// POST   http://localhost:4000/api/auth/register
// POST   http://localhost:4000/api/auth/login
// POST   http://localhost:4000/api/auth/refresh
// GET    http://localhost:4000/api/auth/me
// PUT    http://localhost:4000/api/auth/profile
// PUT    http://localhost:4000/api/auth/change-password
// POST   http://localhost:4000/api/auth/logout

*/

// =============================================================================
// MIDDLEWARE EXECUTION ORDER EXAMPLE:
// =============================================================================
/*

User makes request: POST /api/auth/register
                                ↓
                    1. Express receives request
                                ↓
                    2. Matches route: router.post('/register', ...)
                                ↓
                    3. Runs validateRegister middleware
                                ↓ (if validation passes)
                    4. Runs authController.register
                                ↓
                    5. Controller sends response
                                ↓
                    6. User receives response

If validation fails at step 3:
→ Returns 400 error immediately
→ Controller never runs

*/

// =============================================================================
// PROTECTED ROUTE FLOW EXAMPLE:
// =============================================================================
/*

User makes request: GET /api/auth/me
Headers: Authorization: Bearer eyJhbGci...
                                ↓
                    1. Express receives request
                                ↓
                    2. Matches route: router.get('/me', authMiddleware, ...)
                                ↓
                    3. Runs authMiddleware
                       - Extracts token from header
                       - Verifies JWT signature
                       - Attaches req.user = { userId, email, role }
                                ↓ (if token valid)
                    4. Runs authController.getCurrentUser
                       - Uses req.user.userId to fetch from database
                                ↓
                    5. Returns user profile
                                ↓
                    6. User receives response

If token invalid at step 3:
→ Returns 401 Unauthorized immediately
→ Controller never runs
→ User must login again

*/
