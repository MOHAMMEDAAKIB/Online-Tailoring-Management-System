// =============================================================================
// AUTHENTICATION CONTROLLER
// =============================================================================
// Handles user registration, login, and token management
// This is the "brain" that coordinates authentication operations

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// =============================================================================
// HELPER FUNCTION: Generate JWT Access Token
// =============================================================================
/**
 * Creates a JWT token containing user information
 * This token is like an "ID card" the user carries
 * 
 * @param {Object} user - User object with id and role
 * @returns {string} - JWT token (expires in 24 hours)
 */
const generateAccessToken = (user) => {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role
  };
  
  return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
  );
};

// =============================================================================
// HELPER FUNCTION: Generate JWT Refresh Token
// =============================================================================
/**
 * Creates a long-lived refresh token for getting new access tokens
 * Like a "backup ID card" to get a new one when the first expires
 * 
 * @param {Object} user - User object with id
 * @returns {string} - Refresh token (expires in 7 days)
 */
const generateRefreshToken = (user) => {
  const payload = {
    userId: user.id
  };
  
  return jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
  );
};

// =============================================================================
// REGISTER - Create new user account
// =============================================================================
/**
 * Registers a new user (customer or admin)
 * 
 * Flow:
 * 1. Validate input (done by middleware before this runs)
 * 2. Check if email already exists
 * 3. Hash the password
 * 4. Create user in database
 * 5. Generate tokens
 * 6. Return success with tokens
 * 
 * @route POST /api/auth/register
 * @access Public
 */
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;
    
    // -----------------------------------------
    // STEP 1: Check if email already exists
    // -----------------------------------------
    const emailExists = await User.emailExists(email);
    
    if (emailExists) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered'
      });
    }
    
    // -----------------------------------------
    // STEP 2: Hash the password
    // -----------------------------------------
    // bcrypt.hash(password, saltRounds)
    // saltRounds = 10 is a good balance between speed and security
    const hashedPassword = await bcrypt.hash(password, 10);
    
    console.log(' Password hashed successfully');
    
    // -----------------------------------------
    // STEP 3: Create user in database
    // -----------------------------------------
    const userId = await User.create({
      name,
      email,
      password_hash: hashedPassword,
      phone: phone || null,
      role: role || 'customer' // Default to customer if not specified
    });
    
    console.log(` User created with ID: ${userId}`);
    
    // -----------------------------------------
    // STEP 4: Get the created user (without password)
    // -----------------------------------------
    const user = await User.findById(userId);
    
    // -----------------------------------------
    // STEP 5: Generate tokens
    // -----------------------------------------
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    
    console.log(' Tokens generated');
    
    // -----------------------------------------
    // STEP 6: Return success response
    // -----------------------------------------
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role
        },
        tokens: {
          accessToken,
          refreshToken
        }
      }
    });
    
  } catch (error) {
    console.error(' Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during registration',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// =============================================================================
// LOGIN - Authenticate existing user
// =============================================================================
/**
 * Logs in a user with email and password
 * 
 * Flow:
 * 1. Find user by email
 * 2. Verify password with bcrypt
 * 3. Generate tokens
 * 4. Return user info and tokens
 * 
 * @route POST /api/auth/login
 * @access Public
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // -----------------------------------------
    // STEP 1: Find user by email
    // -----------------------------------------
    const user = await User.findByEmail(email);
    
    if (!user) {
      // Don't reveal whether email exists (security)
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
    
    console.log(` User found: ${user.email}`);
    
    // -----------------------------------------
    // STEP 2: Verify password
    // -----------------------------------------
    // Compare plain password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
    
    console.log(' Password verified');
    
    // -----------------------------------------
    // STEP 3: Generate tokens
    // -----------------------------------------
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    
    console.log(` Tokens generated for user ${user.id}`);
    
    // -----------------------------------------
    // STEP 4: Return success response
    // -----------------------------------------
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role
        },
        tokens: {
          accessToken,
          refreshToken
        }
      }
    });
    
  } catch (error) {
    console.error(' Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during login',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// =============================================================================
// REFRESH TOKEN - Get new access token using refresh token
// =============================================================================
/**
 * Generates a new access token when the old one expires
 * Like getting a new ID card using your backup card
 * 
 * Flow:
 * 1. Verify refresh token
 * 2. Get user from database
 * 3. Generate new access token
 * 4. Return new token
 * 
 * @route POST /api/auth/refresh
 * @access Public (but requires valid refresh token)
 */
exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: 'Refresh token is required'
      });
    }
    
    // -----------------------------------------
    // STEP 1: Verify refresh token
    // -----------------------------------------
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired refresh token'
      });
    }
    
    // -----------------------------------------
    // STEP 2: Get user from database
    // -----------------------------------------
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // -----------------------------------------
    // STEP 3: Generate new access token
    // -----------------------------------------
    const newAccessToken = generateAccessToken(user);
    
    console.log(` Access token refreshed for user ${user.id}`);
    
    // -----------------------------------------
    // STEP 4: Return new token
    // -----------------------------------------
    res.json({
      success: true,
      message: 'Token refreshed successfully',
      data: {
        accessToken: newAccessToken
      }
    });
    
  } catch (error) {
    console.error(' Refresh token error:', error);
    res.status(500).json({
      success: false,
      message: 'Error refreshing token',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// =============================================================================
// GET CURRENT USER - Get logged-in user's profile
// =============================================================================
/**
 * Returns the current user's profile (from JWT token)
 * This requires authentication middleware to run first
 * 
 * @route GET /api/auth/me
 * @access Private (requires authentication)
 */
exports.getCurrentUser = async (req, res) => {
  try {
    // req.user is set by the authentication middleware
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          created_at: user.created_at
        }
      }
    });
    
  } catch (error) {
    console.error(' Get current user error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user profile',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// =============================================================================
// LOGOUT - Invalidate user session (client-side)
// =============================================================================
/**
 * Logs out a user
 * Note: With JWT, logout is primarily client-side (delete token)
 * Server can optionally maintain a blacklist of revoked tokens
 * 
 * @route POST /api/auth/logout
 * @access Private (requires authentication)
 */
exports.logout = async (req, res) => {
  try {
    // For JWT, logout is handled client-side by deleting the token
    // Server can optionally implement token blacklisting here
    
    console.log(`👋 User ${req.user.userId} logged out`);
    
    res.json({
      success: true,
      message: 'Logout successful'
    });
    
  } catch (error) {
    console.error(' Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during logout',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// =============================================================================
// UPDATE PROFILE - Update user's name and phone
// =============================================================================
/**
 * Updates the current user's profile
 * Only name and phone can be updated (not email for security)
 * 
 * @route PUT /api/auth/profile
 * @access Private (requires authentication)
 */
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId; // From authMiddleware
    const { name, phone } = req.body;
    
    // Build update object (only include provided fields)
    const updates = {};
    if (name) updates.name = name;
    if (phone) updates.phone = phone;
    
    // Check if any updates provided
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No updates provided'
      });
    }
    
    // Update in database
    await User.update(userId, updates);
    
    // Fetch updated user
    const updatedUser = await User.findById(userId);
    
    console.log(` Profile updated for user ${userId}`);
    
    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: updatedUser
      }
    });
    
  } catch (error) {
    console.error(' Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// =============================================================================
// CHANGE PASSWORD - Securely update user's password
// =============================================================================
/**
 * Changes the user's password
 * Requires current password for security verification
 * 
 * Flow:
 * 1. Verify current password is correct
 * 2. Hash new password
 * 3. Update in database
 * 
 * @route PUT /api/auth/change-password
 * @access Private (requires authentication)
 */
exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.userId; // From authMiddleware
    const { currentPassword, newPassword } = req.body;
    
    // -----------------------------------------
    // STEP 1: Get user with password
    // -----------------------------------------
    // We need a special method that includes password_hash
    const users = await User.findByEmail(req.user.email);
    const user = users[0];
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // -----------------------------------------
    // STEP 2: Verify current password
    // -----------------------------------------
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password_hash);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }
    
    // -----------------------------------------
    // STEP 3: Hash new password
    // -----------------------------------------
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    
    // -----------------------------------------
    // STEP 4: Update password in database
    // -----------------------------------------
    await User.updatePassword(userId, hashedNewPassword);
    
    console.log(` Password changed for user ${userId}`);
    
    res.json({
      success: true,
      message: 'Password changed successfully'
    });
    
  } catch (error) {
    console.error(' Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Error changing password',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// =============================================================================
// GET ALL USERS - Admin only
// =============================================================================
/**
 * Get all users in the system (admin only)
 * 
 * @route GET /api/auth/users
 * @access Private (Admin only)
 */
exports.getAllUsers = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin only.'
      });
    }

    // Get all users from database
    const users = await User.findAll();

    console.log(` Admin ${req.user.userId} fetched ${users.length} users`);

    res.json({
      success: true,
      count: users.length,
      data: users
    });

  } catch (error) {
    console.error(' Get all users error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// =============================================================================
// USAGE IN ROUTES:
// =============================================================================
/*

const authController = require('./controllers/authController');

// Public routes
router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin, authController.login);
router.post('/refresh', authController.refreshToken);

// Protected routes (require authentication middleware)
router.get('/me', authMiddleware, authController.getCurrentUser);
router.get('/users', authMiddleware, authController.getAllUsers); // Admin only
router.put('/profile', authMiddleware, validateUpdateProfile, authController.updateProfile);
router.put('/change-password', authMiddleware, validateChangePassword, authController.changePassword);
router.post('/logout', authMiddleware, authController.logout);

*/
