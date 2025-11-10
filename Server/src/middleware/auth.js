// =============================================================================
// AUTHENTICATION MIDDLEWARE
// =============================================================================
// Middleware functions that protect routes and verify user permissions
// Think of this as a "security guard" checking IDs before letting people in

const jwt = require('jsonwebtoken');

// =============================================================================
// AUTH MIDDLEWARE - Verify JWT Token
// =============================================================================
/**
 * Verifies that the user has a valid JWT token
 * This runs BEFORE the controller function
 * 
 * How it works:
 * 1. User sends request with token in Authorization header
 * 2. Middleware extracts and verifies token
 * 3. If valid: attach user info to req.user and continue
 * 4. If invalid: return 401 Unauthorized
 * 
 * Usage:
 * router.get('/protected', authMiddleware, controller);
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function (continue to controller)
 */
const authMiddleware = async (req, res, next) => {
  try {
    // -----------------------------------------
    // STEP 1: Get token from Authorization header
    // -----------------------------------------
    // Expected format: "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }
    
    // Check if it starts with "Bearer "
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token format. Use: Bearer <token>'
      });
    }
    
    // Extract the token (remove "Bearer " prefix)
    const token = authHeader.substring(7); // "Bearer ".length === 7
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Token is empty.'
      });
    }
    
    // -----------------------------------------
    // STEP 2: Verify the token
    // -----------------------------------------
    let decoded;
    
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      // Token is invalid or expired
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Token has expired. Please login again.'
        });
      }
      
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
          success: false,
          message: 'Invalid token. Please login again.'
        });
      }
      
      return res.status(401).json({
        success: false,
        message: 'Token verification failed.'
      });
    }
    
    // -----------------------------------------
    // STEP 3: Attach user info to request object
    // -----------------------------------------
    // Now the controller can access user info via req.user
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role
    };
    
    console.log(`✅ User ${decoded.userId} (${decoded.role}) authenticated`);
    
    // -----------------------------------------
    // STEP 4: Continue to the next middleware/controller
    // -----------------------------------------
    next();
    
  } catch (error) {
    console.error('❌ Auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during authentication'
    });
  }
};

// =============================================================================
// ADMIN ONLY MIDDLEWARE - Check if user is admin
// =============================================================================
/**
 * Checks if the authenticated user has admin role
 * MUST be used AFTER authMiddleware
 * 
 * Usage:
 * router.post('/orders', authMiddleware, adminOnly, orderController.create);
 * 
 * @param {Object} req - Express request object (must have req.user from authMiddleware)
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const adminOnly = async (req, res, next) => {
  try {
    // Check if req.user exists (set by authMiddleware)
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }
    
    // Check if user role is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
    }
    
    console.log(`✅ Admin access granted for user ${req.user.userId}`);
    
    // User is admin, continue to controller
    next();
    
  } catch (error) {
    console.error('❌ Admin middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Error checking admin privileges'
    });
  }
};

// =============================================================================
// CUSTOMER ONLY MIDDLEWARE - Check if user is customer
// =============================================================================
/**
 * Checks if the authenticated user has customer role
 * MUST be used AFTER authMiddleware
 * 
 * Usage:
 * router.get('/my-orders', authMiddleware, customerOnly, orderController.getMyOrders);
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const customerOnly = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }
    
    if (req.user.role !== 'customer') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Customer privileges required.'
      });
    }
    
    console.log(`✅ Customer access granted for user ${req.user.userId}`);
    
    next();
    
  } catch (error) {
    console.error('❌ Customer middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Error checking customer privileges'
    });
  }
};

// =============================================================================
// OPTIONAL AUTH MIDDLEWARE - Token is optional but validated if present
// =============================================================================
/**
 * Validates token if present, but doesn't require it
 * Useful for routes that work for both authenticated and guest users
 * 
 * Usage:
 * router.get('/public-info', optionalAuth, controller);
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    // If no token provided, continue without authentication
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      req.user = null;
      return next();
    }
    
    const token = authHeader.substring(7);
    
    if (!token) {
      req.user = null;
      return next();
    }
    
    // Try to verify token, but don't fail if invalid
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = {
        userId: decoded.userId,
        email: decoded.email,
        role: decoded.role
      };
    } catch (error) {
      // Token is invalid, but that's okay for optional auth
      req.user = null;
    }
    
    next();
    
  } catch (error) {
    console.error('❌ Optional auth middleware error:', error);
    req.user = null;
    next();
  }
};

// =============================================================================
// Export all middleware functions
// =============================================================================
module.exports = {
  authMiddleware,
  adminOnly,
  customerOnly,
  optionalAuth
};

// =============================================================================
// USAGE EXAMPLES:
// =============================================================================
/*

const { authMiddleware, adminOnly, customerOnly, optionalAuth } = require('./middleware/auth');

// 1. Public route (no authentication)
router.post('/register', authController.register);
router.post('/login', authController.login);

// 2. Protected route (authentication required)
router.get('/me', authMiddleware, authController.getCurrentUser);

// 3. Admin-only route (authentication + admin role)
router.post('/orders', authMiddleware, adminOnly, orderController.create);
router.get('/customers', authMiddleware, adminOnly, userController.getAllCustomers);

// 4. Customer-only route (authentication + customer role)
router.get('/my-orders', authMiddleware, customerOnly, orderController.getMyOrders);

// 5. Optional authentication (token validated if present)
router.get('/public-data', optionalAuth, dataController.getPublicData);

// 6. How the request flows:
// Client → authMiddleware → adminOnly → Controller
//          (verify token)     (check role)  (business logic)

*/

// =============================================================================
// HTTP STATUS CODES EXPLAINED:
// =============================================================================
/*

401 Unauthorized
- Token missing, invalid, or expired
- User needs to login

403 Forbidden
- User is authenticated but doesn't have permission
- Example: Customer trying to access admin route

500 Internal Server Error
- Something went wrong on the server
- Usually a code bug or database error

*/
