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
// Export all validators
// =============================================================================
module.exports = {
  validateRegister,
  validateLogin,
  validateRefreshToken,
  validateUpdateProfile,
  validateChangePassword,
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
