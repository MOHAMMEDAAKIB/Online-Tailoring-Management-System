// =============================================================================
// MEASUREMENT CONTROLLER
// =============================================================================
// Handles measurement CRUD operations with role-based access control
// Think of this as the "manager" of customer body measurements

const Measurement = require('../models/Measurement');

// =============================================================================
// 1. GET ALL MEASUREMENTS (with role-based filtering)
// =============================================================================
/**
 * Get measurements based on user role:
 * - Customer: Only their own measurements
 * - Admin: All measurements OR filter by customer_id
 * 
 * Query parameters:
 * - customer_id (optional, admin only): Filter by specific customer
 * 
 * @route   GET /api/measurements
 * @access  Private (authentication required)
 */
const getAllMeasurements = async (req, res) => {
  try {
    const { userId, role } = req.user; // From authMiddleware
    const { customer_id } = req.query; // Optional filter for admin
    
    let measurements;
    
    // -----------------------------------------
    // ROLE-BASED ACCESS CONTROL
    // -----------------------------------------
    if (role === 'customer') {
      // Customers can only see their own measurements
      measurements = await Measurement.findByUserId(userId);
      
      console.log(`📏 Customer ${userId} retrieved ${measurements.length} measurements`);
      
    } else if (role === 'admin') {
      // Admin can see all OR filter by customer_id
      if (customer_id) {
        measurements = await Measurement.findByUserId(customer_id);
        console.log(`📏 Admin retrieved ${measurements.length} measurements for customer ${customer_id}`);
      } else {
        measurements = await Measurement.findAll();
        console.log(`📏 Admin retrieved all ${measurements.length} measurements`);
      }
      
    } else {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }
    
    res.json({
      success: true,
      count: measurements.length,
      data: {
        measurements
      }
    });
    
  } catch (error) {
    console.error('❌ Get measurements error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching measurements',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// =============================================================================
// 2. GET SINGLE MEASUREMENT BY ID (with ownership check)
// =============================================================================
/**
 * Get a specific measurement by ID
 * - Customer: Can only get their own
 * - Admin: Can get any
 * 
 * @route   GET /api/measurements/:id
 * @access  Private
 */
const getMeasurementById = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, role } = req.user;
    
    // -----------------------------------------
    // STEP 1: Fetch measurement
    // -----------------------------------------
    const measurement = await Measurement.findById(id);
    
    if (!measurement) {
      return res.status(404).json({
        success: false,
        message: 'Measurement not found'
      });
    }
    
    // -----------------------------------------
    // STEP 2: Check ownership (if customer)
    // -----------------------------------------
    if (role === 'customer' && measurement.user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: 'You can only access your own measurements'
      });
    }
    
    console.log(`📏 Measurement ${id} retrieved by user ${userId}`);
    
    res.json({
      success: true,
      data: {
        measurement
      }
    });
    
  } catch (error) {
    console.error('❌ Get measurement error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching measurement',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// =============================================================================
// 3. CREATE NEW MEASUREMENT
// =============================================================================
/**
 * Create a new measurement
 * - Customer: Can only create for themselves
 * - Admin: Can create for any customer (must specify user_id)
 * 
 * @route   POST /api/measurements
 * @access  Private
 */
const createMeasurement = async (req, res) => {
  try {
    const { userId, role } = req.user;
    const {
      user_id,
      chest,
      waist,
      hips,
      sleeve,
      shoulder,
      neck,
      length,
      unit,
      notes
    } = req.body;
    
    // -----------------------------------------
    // STEP 1: Determine target user
    // -----------------------------------------
    let targetUserId;
    
    if (role === 'customer') {
      // Customer can only create for themselves
      targetUserId = userId;
      
      if (user_id && user_id !== userId) {
        return res.status(403).json({
          success: false,
          message: 'Customers can only create measurements for themselves'
        });
      }
      
    } else if (role === 'admin') {
      // Admin must specify user_id OR defaults to themselves
      targetUserId = user_id || userId;
      
    } else {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }
    
    // -----------------------------------------
    // STEP 2: Create measurement
    // -----------------------------------------
    const measurementId = await Measurement.create({
      user_id: targetUserId,
      chest,
      waist,
      hips,
      sleeve,
      shoulder,
      neck,
      length,
      unit: unit || 'cm',
      notes: notes || null
    });
    
    // -----------------------------------------
    // STEP 3: Fetch created measurement
    // -----------------------------------------
    const measurement = await Measurement.findById(measurementId);
    
    console.log(`✅ Measurement ${measurementId} created for user ${targetUserId}`);
    
    res.status(201).json({
      success: true,
      message: 'Measurement created successfully',
      data: {
        measurement
      }
    });
    
  } catch (error) {
    console.error('❌ Create measurement error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating measurement',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// =============================================================================
// 4. UPDATE MEASUREMENT
// =============================================================================
/**
 * Update an existing measurement
 * - Customer: Can only update their own
 * - Admin: Can update any
 * 
 * @route   PUT /api/measurements/:id
 * @access  Private
 */
const updateMeasurement = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, role } = req.user;
    const {
      chest,
      waist,
      hips,
      sleeve,
      shoulder,
      neck,
      length,
      unit,
      notes
    } = req.body;
    
    // -----------------------------------------
    // STEP 1: Check if measurement exists
    // -----------------------------------------
    const existingMeasurement = await Measurement.findById(id);
    
    if (!existingMeasurement) {
      return res.status(404).json({
        success: false,
        message: 'Measurement not found'
      });
    }
    
    // -----------------------------------------
    // STEP 2: Check ownership (if customer)
    // -----------------------------------------
    if (role === 'customer' && existingMeasurement.user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: 'You can only update your own measurements'
      });
    }
    
    // -----------------------------------------
    // STEP 3: Build update object
    // -----------------------------------------
    const updates = {};
    if (chest !== undefined) updates.chest = chest;
    if (waist !== undefined) updates.waist = waist;
    if (hips !== undefined) updates.hips = hips;
    if (sleeve !== undefined) updates.sleeve = sleeve;
    if (shoulder !== undefined) updates.shoulder = shoulder;
    if (neck !== undefined) updates.neck = neck;
    if (length !== undefined) updates.length = length;
    if (unit !== undefined) updates.unit = unit;
    if (notes !== undefined) updates.notes = notes;
    
    // Check if any updates provided
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No updates provided'
      });
    }
    
    // -----------------------------------------
    // STEP 4: Update measurement
    // -----------------------------------------
    await Measurement.update(id, updates);
    
    // -----------------------------------------
    // STEP 5: Fetch updated measurement
    // -----------------------------------------
    const updatedMeasurement = await Measurement.findById(id);
    
    console.log(`✏️ Measurement ${id} updated by user ${userId}`);
    
    res.json({
      success: true,
      message: 'Measurement updated successfully',
      data: {
        measurement: updatedMeasurement
      }
    });
    
  } catch (error) {
    console.error('❌ Update measurement error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating measurement',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// =============================================================================
// 5. DELETE MEASUREMENT
// =============================================================================
/**
 * Delete a measurement
 * - Customer: Can only delete their own
 * - Admin: Can delete any
 * 
 * @route   DELETE /api/measurements/:id
 * @access  Private
 */
const deleteMeasurement = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, role } = req.user;
    
    // -----------------------------------------
    // STEP 1: Check if measurement exists
    // -----------------------------------------
    const measurement = await Measurement.findById(id);
    
    if (!measurement) {
      return res.status(404).json({
        success: false,
        message: 'Measurement not found'
      });
    }
    
    // -----------------------------------------
    // STEP 2: Check ownership (if customer)
    // -----------------------------------------
    if (role === 'customer' && measurement.user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own measurements'
      });
    }
    
    // -----------------------------------------
    // STEP 3: Delete measurement
    // -----------------------------------------
    await Measurement.delete(id);
    
    console.log(`🗑️ Measurement ${id} deleted by user ${userId}`);
    
    res.json({
      success: true,
      message: 'Measurement deleted successfully'
    });
    
  } catch (error) {
    console.error('❌ Delete measurement error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting measurement',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// =============================================================================
// Export all controller functions
// =============================================================================
module.exports = {
  getAllMeasurements,
  getMeasurementById,
  createMeasurement,
  updateMeasurement,
  deleteMeasurement
};
