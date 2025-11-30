// =============================================================================
// INPUT VALIDATORS - Using express-validator
// =============================================================================
// Validates and sanitizes user input to prevent bad data and security issues
// Think of this as a "bouncer" checking what comes into your API

const { body, validationResult } = require('express-validator');

// =============================================================================
// VALIDATION ERROR HANDLER
// =============================================================================
/**
 * Middleware to check if validation errors occurred
 * Must be used AFTER validation middleware
 * 
 * Usage:
 * router.post('/register', validateRegister, handleValidationErrors, controller);
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.path || err.param,
        message: err.msg
      }))
    });
  }
  
  next();
};

// =============================================================================
// REGISTER VALIDATION RULES
// =============================================================================
/**
 * Validates registration data
 * 
 * Checks:
 * - Name: required, 2-100 characters
 * - Email: required, valid email format
 * - Password: required, min 8 characters, contains letter and number
 * - Phone: optional, valid phone format
 * - Role: optional, must be 'admin' or 'customer'
 */
const validateRegister = [
  // Name validation
  body('name')
    .trim() // Remove whitespace
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
  
  // Email validation
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(), // Convert to lowercase
  
  // Password validation
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)/)
    .withMessage('Password must contain at least one letter and one number'),
  
  // Phone validation (optional)
  body('phone')
    .optional()
    .trim()
    .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/)
    .withMessage('Please provide a valid phone number'),
  
  // Role validation (optional)
  body('role')
    .optional()
    .isIn(['admin', 'customer'])
    .withMessage('Role must be either "admin" or "customer"'),
  
  // Middleware to handle validation errors
  handleValidationErrors
];

// =============================================================================
// LOGIN VALIDATION RULES
// =============================================================================
/**
 * Validates login data
 * 
 * Checks:
 * - Email: required, valid format
 * - Password: required
 */
const validateLogin = [
  // Email validation
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  // Password validation
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  
  handleValidationErrors
];

// =============================================================================
// REFRESH TOKEN VALIDATION
// =============================================================================
/**
 * Validates refresh token request
 * 
 * Checks:
 * - Refresh token: required, not empty
 */
const validateRefreshToken = [
  body('refreshToken')
    .notEmpty()
    .withMessage('Refresh token is required')
    .isString()
    .withMessage('Refresh token must be a string'),
  
  handleValidationErrors
];

// =============================================================================
// UPDATE PROFILE VALIDATION
// =============================================================================
/**
 * Validates profile update data
 * 
 * Checks:
 * - Name: optional, 2-100 characters
 * - Phone: optional, valid phone format
 */
const validateUpdateProfile = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
  
  body('phone')
    .optional()
    .trim()
    .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/)
    .withMessage('Please provide a valid phone number'),
  
  handleValidationErrors
];

// =============================================================================
// CHANGE PASSWORD VALIDATION
// =============================================================================
/**
 * Validates password change request
 * 
 * Checks:
 * - Current password: required
 * - New password: required, min 8 characters, strong
 * - Confirm password: required, matches new password
 */
const validateChangePassword = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  
  body('newPassword')
    .notEmpty()
    .withMessage('New password is required')
    .isLength({ min: 8 })
    .withMessage('New password must be at least 8 characters long')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)/)
    .withMessage('New password must contain at least one letter and one number')
    .custom((value, { req }) => {
      if (value === req.body.currentPassword) {
        throw new Error('New password must be different from current password');
      }
      return true;
    }),
  
  body('confirmPassword')
    .notEmpty()
    .withMessage('Please confirm your new password')
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
  
  handleValidationErrors
];

// =============================================================================
// MEASUREMENT VALIDATION RULES
// =============================================================================
/**
 * Validates measurement creation data
 * 
 * Checks:
 * - user_id: optional (admin only), must be positive integer
 * - chest, waist, hips, sleeve, shoulder, neck, length: optional, must be positive numbers
 * - unit: optional, must be 'cm', 'inch', or 'm'
 * - notes: optional, max 500 characters
 */
const validateCreateMeasurement = [
  body('user_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('User ID must be a positive integer'),
  
  body('label')
    .optional()
    .isString()
    .isLength({ min: 1, max: 100 })
    .withMessage('Label must be between 1 and 100 characters'),
  
  body('chest')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Chest measurement must be a positive number'),
  
  body('waist')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Waist measurement must be a positive number'),
  
  body('hips')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Hips measurement must be a positive number'),
  
  body('sleeve')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Sleeve measurement must be a positive number'),
  
  body('shoulder')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Shoulder measurement must be a positive number'),
  
  body('neck')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Neck measurement must be a positive number'),
  
  body('length')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Length measurement must be a positive number'),
  
  body('unit')
    .optional()
    .isIn(['cm', 'inch', 'm'])
    .withMessage('Unit must be "cm", "inch", or "m"'),
  
  body('notes')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Notes must not exceed 500 characters'),
  
  handleValidationErrors
];

/**
 * Validates measurement update data
 * Same as create but all fields are optional
 */
const validateUpdateMeasurement = [
  body('chest')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Chest measurement must be a positive number'),
  
  body('waist')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Waist measurement must be a positive number'),
  
  body('hips')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Hips measurement must be a positive number'),
  
  body('sleeve')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Sleeve measurement must be a positive number'),
  
  body('shoulder')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Shoulder measurement must be a positive number'),
  
  body('neck')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Neck measurement must be a positive number'),
  
  body('length')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Length measurement must be a positive number'),
  
  body('unit')
    .optional()
    .isIn(['cm', 'inch', 'm'])
    .withMessage('Unit must be "cm", "inch", or "m"'),
  
  body('notes')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Notes must not exceed 500 characters'),
  
  handleValidationErrors
];

// =============================================================================
// ORDER VALIDATION RULES
// =============================================================================
/**
 * Validates order creation data
 * 
 * Checks:
 * - user_id: required, positive integer
 * - items: required, must be array with at least 1 item
 * - subtotal, tax, total: required, positive numbers
 * - discount: optional, positive number
 * - status: optional, valid status
 */
const createOrderValidator = [
  body('user_id')
    .notEmpty()
    .withMessage('Customer ID is required')
    .isInt({ min: 1 })
    .withMessage('Customer ID must be a positive integer'),
  
  body('items')
    .notEmpty()
    .withMessage('Order items are required')
    .isArray({ min: 1 })
    .withMessage('Order must contain at least one item'),
  
  body('items.*.item_name')
    .notEmpty()
    .withMessage('Each item must have a name')
    .isString()
    .withMessage('Item name must be a string'),
  
  body('items.*.quantity')
    .notEmpty()
    .withMessage('Each item must have a quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),
  
  body('items.*.price')
    .notEmpty()
    .withMessage('Each item must have a price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  
  body('subtotal')
    .notEmpty()
    .withMessage('Subtotal is required')
    .isFloat({ min: 0 })
    .withMessage('Subtotal must be a positive number'),
  
  body('tax')
    .notEmpty()
    .withMessage('Tax is required')
    .isFloat({ min: 0 })
    .withMessage('Tax must be a positive number'),
  
  body('discount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Discount must be a positive number'),
  
  body('total')
    .notEmpty()
    .withMessage('Total is required')
    .isFloat({ min: 0 })
    .withMessage('Total must be a positive number'),
  
  body('status')
    .optional()
    .isIn(['pending', 'in_progress', 'ready', 'delivered', 'cancelled'])
    .withMessage('Invalid order status'),
  
  handleValidationErrors
];

/**
 * Validates order status update
 */
const updateOrderStatusValidator = [
  body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isIn(['pending', 'in_progress', 'ready', 'delivered', 'cancelled'])
    .withMessage('Status must be one of: pending, in_progress, ready, delivered, cancelled'),
  
  handleValidationErrors
];

// =============================================================================
// PAYMENT VALIDATION RULES
// =============================================================================
/**
 * Validates checkout session creation
 * 
 * Checks:
 * - order_id: required, positive integer
 * - provider: required, valid payment provider
 */
const createCheckoutValidator = [
  body('order_id')
    .notEmpty()
    .withMessage('Order ID is required')
    .isInt({ min: 1 })
    .withMessage('Order ID must be a positive integer'),
  
  body('provider')
    .notEmpty()
    .withMessage('Payment provider is required')
    .isIn(['stripe', 'payhere', 'cash', 'bank_transfer'])
    .withMessage('Provider must be one of: stripe, payhere, cash, bank_transfer'),
  
  handleValidationErrors
];

// =============================================================================
// NOTIFICATION VALIDATION RULES
// =============================================================================
/**
 * Validates notification sending
 * 
 * Checks:
 * - user_id: required, positive integer
 * - channel: required, email or sms
 * - template: required, valid template name
 * - payload: required, object with notification data
 */
const sendNotificationValidator = [
  body('user_id')
    .notEmpty()
    .withMessage('User ID is required')
    .isInt({ min: 1 })
    .withMessage('User ID must be a positive integer'),
  
  body('channel')
    .notEmpty()
    .withMessage('Notification channel is required')
    .isIn(['email', 'sms'])
    .withMessage('Channel must be either "email" or "sms"'),
  
  body('template')
    .notEmpty()
    .withMessage('Template is required')
    .isIn(['order_confirmation', 'payment_received', 'order_ready', 'order_delivered', 'custom'])
    .withMessage('Invalid template name'),
  
  body('payload')
    .notEmpty()
    .withMessage('Payload is required')
    .isObject()
    .withMessage('Payload must be an object'),
  
  // If email, validate email field in payload
  body('payload.email')
    .if(body('channel').equals('email'))
    .notEmpty()
    .withMessage('Email address is required for email notifications')
    .isEmail()
    .withMessage('Invalid email address'),
  
  // If SMS, validate phone field in payload
  body('payload.phone')
    .if(body('channel').equals('sms'))
    .notEmpty()
    .withMessage('Phone number is required for SMS notifications')
    .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/)
    .withMessage('Invalid phone number format'),
  
  handleValidationErrors
];

// =============================================================================
// Export all validators
// =============================================================================
module.exports = {
  validateRegister,
  validateLogin,
  validateRefreshToken,
  validateUpdateProfile,
  validateChangePassword,
  validateCreateMeasurement,
  validateUpdateMeasurement,
  createOrderValidator,
  updateOrderStatusValidator,
  createCheckoutValidator,
  sendNotificationValidator,
  handleValidationErrors
};

// =============================================================================
// USAGE IN ROUTES:
// =============================================================================
/*

const { 
  validateRegister,
  validateLogin
} = require('./middleware/validators');

// Apply validation before controller
router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin, authController.login);

// If validation fails, user gets response like:
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    },
    {
      "field": "password",
      "message": "Password must be at least 8 characters long"
    }
  ]
}

*/

// =============================================================================
// WHY VALIDATION IS IMPORTANT:
// =============================================================================
/*

1. SECURITY
   - Prevents SQL injection
   - Prevents XSS attacks
   - Ensures data integrity

2. DATA QUALITY
   - Ensures consistent data format
   - Prevents bad data in database
   - Makes debugging easier

3. USER EXPERIENCE
   - Clear error messages
   - Immediate feedback
   - Prevents wasted server requests

4. EXAMPLE WITHOUT VALIDATION:
   ❌ User registers with email: "notanemail"
   ❌ Backend tries to send email → fails silently
   ❌ User never receives confirmation
   ❌ User frustrated, can't login

5. EXAMPLE WITH VALIDATION:
   ✅ User tries to register with "notanemail"
   ✅ Validator catches it immediately
   ✅ Returns: "Please provide a valid email address"
   ✅ User corrects it and registers successfully

*/
