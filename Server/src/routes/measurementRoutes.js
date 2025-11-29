// =============================================================================
// MEASUREMENT ROUTES
// =============================================================================
// Maps URLs to measurement controller functions with authentication and validation

const express = require('express');
const router = express.Router();

// Import controller
const measurementController = require('../controllers/measurementController');

// Import middleware
const { authMiddleware } = require('../middleware/auth');
const {
  validateCreateMeasurement,
  validateUpdateMeasurement
} = require('../middleware/validators');

// =============================================================================
// ALL ROUTES REQUIRE AUTHENTICATION
// =============================================================================
// Apply authMiddleware to all routes in this router
router.use(authMiddleware);

// =============================================================================
// MEASUREMENT ROUTES
// =============================================================================

/**
 * @route   GET /api/measurements
 * @desc    Get all measurements (filtered by role)
 *          - Customer: Only their own measurements
 *          - Admin: All measurements OR filter by ?customer_id=X
 * @access  Private
 * 
 * Query Parameters (Admin only):
 * - customer_id: Filter measurements for specific customer
 * 
 * Example requests:
 * - Customer: GET /api/measurements
 * - Admin (all): GET /api/measurements
 * - Admin (filter): GET /api/measurements?customer_id=5
 * 
 * Response: 200 OK
 * {
 *   "success": true,
 *   "count": 2,
 *   "data": {
 *     "measurements": [...]
 *   }
 * }
 */
router.get('/', measurementController.getAllMeasurements);

/**
 * @route   POST /api/measurements
 * @desc    Create new measurement
 *          - Customer: Creates for themselves (user_id auto-set)
 *          - Admin: Can specify user_id or creates for self
 * @access  Private
 * 
 * Request body example:
 * {
 *   "user_id": 5,        // Optional, admin only
 *   "chest": 38.5,
 *   "waist": 32,
 *   "hips": 40,
 *   "sleeve": 24,
 *   "shoulder": 16,
 *   "neck": 15,
 *   "length": 42,
 *   "unit": "inch",
 *   "notes": "Prefer loose fit"
 * }
 * 
 * Response: 201 Created
 * {
 *   "success": true,
 *   "message": "Measurement created successfully",
 *   "data": {
 *     "measurement": {...}
 *   }
 * }
 */
router.post('/', validateCreateMeasurement, measurementController.createMeasurement);

/**
 * @route   GET /api/measurements/:id
 * @desc    Get single measurement by ID
 *          - Customer: Can only get their own
 *          - Admin: Can get any
 * @access  Private
 * 
 * Response: 200 OK
 * {
 *   "success": true,
 *   "data": {
 *     "measurement": {
 *       "id": 1,
 *       "user_id": 5,
 *       "chest": 38.5,
 *       "waist": 32,
 *       ...
 *     }
 *   }
 * }
 */
router.get('/:id', measurementController.getMeasurementById);

/**
 * @route   PUT /api/measurements/:id
 * @desc    Update measurement
 *          - Customer: Can only update their own
 *          - Admin: Can update any
 * @access  Private
 * 
 * Request body example (all fields optional):
 * {
 *   "waist": 33,
 *   "notes": "Updated measurement"
 * }
 * 
 * Response: 200 OK
 * {
 *   "success": true,
 *   "message": "Measurement updated successfully",
 *   "data": {
 *     "measurement": {...}
 *   }
 * }
 */
router.put('/:id', validateUpdateMeasurement, measurementController.updateMeasurement);

/**
 * @route   DELETE /api/measurements/:id
 * @desc    Delete measurement
 *          - Customer: Can only delete their own
 *          - Admin: Can delete any
 * @access  Private
 * 
 * Response: 200 OK
 * {
 *   "success": true,
 *   "message": "Measurement deleted successfully"
 * }
 */
router.delete('/:id', measurementController.deleteMeasurement);

// =============================================================================
// Export router
// =============================================================================
module.exports = router;

// =============================================================================
// USAGE IN app.js:
// =============================================================================
/*

const measurementRoutes = require('./src/routes/measurementRoutes');

// Mount the router at /api/measurements
app.use('/api/measurements', measurementRoutes);

// Now all routes are accessible:
// GET    http://localhost:4000/api/measurements
// POST   http://localhost:4000/api/measurements
// GET    http://localhost:4000/api/measurements/:id
// PUT    http://localhost:4000/api/measurements/:id
// DELETE http://localhost:4000/api/measurements/:id

*/

// =============================================================================
// ACCESS CONTROL EXAMPLES:
// =============================================================================
/*

CUSTOMER PERSPECTIVE:
--------------------
Customer (ID: 5) makes request: GET /api/measurements
Headers: Authorization: Bearer <customer_token>
                    ↓
Result: Returns ONLY measurements where user_id = 5


Customer (ID: 5) tries: GET /api/measurements/10
(Measurement 10 belongs to Customer ID: 3)
                    ↓
Result: 403 Forbidden - "You can only access your own measurements"


ADMIN PERSPECTIVE:
------------------
Admin makes request: GET /api/measurements
Headers: Authorization: Bearer <admin_token>
                    ↓
Result: Returns ALL measurements from ALL customers


Admin makes request: GET /api/measurements?customer_id=5
                    ↓
Result: Returns only measurements for customer ID 5


Admin makes request: GET /api/measurements/10
(Measurement 10 belongs to Customer ID: 3)
                    ↓
Result: 200 OK - Returns measurement 10 (admin can access any)

*/

// =============================================================================
// REAL-WORLD FLOW EXAMPLE:
// =============================================================================
/*

Scenario: Customer wants to create a measurement

1. Frontend makes request:
   POST /api/measurements
   Headers: Authorization: Bearer eyJhbGci...
   Body: {
     "chest": 38,
     "waist": 32,
     "hips": 40,
     "unit": "inch"
   }

2. Express receives request → app.js

3. Routes to: /api/measurements → measurementRoutes

4. Matches: router.post('/', ...)

5. Runs middleware chain:
   a) authMiddleware → Verifies token → Sets req.user = {userId: 5, role: 'customer'}
   b) validateCreateMeasurement → Checks all fields are valid numbers
   c) measurementController.createMeasurement → Business logic

6. Controller logic:
   - Extracts userId = 5 from req.user
   - Creates measurement with user_id = 5
   - Returns measurement data

7. Response sent to frontend:
   {
     "success": true,
     "message": "Measurement created successfully",
     "data": {
       "measurement": {
         "id": 15,
         "user_id": 5,
         "chest": 38,
         ...
       }
     }
   }

*/
