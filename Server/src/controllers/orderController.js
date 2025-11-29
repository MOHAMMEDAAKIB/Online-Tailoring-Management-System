// =============================================================================
// ORDER CONTROLLER
// =============================================================================
// Handles order creation, listing, status updates
// Role-based access: Admin can create/manage all, Customer can view own

const Order = require('../models/Order');
const Measurement = require('../models/Measurement');

// =============================================================================
// 1. CREATE ORDER (Admin only)
// =============================================================================
/**
 * Create a new tailoring order
 * Admin creates order for a customer using their latest measurements
 * 
 * @route   POST /api/orders
 * @access  Private (Admin only)
 */
const createOrder = async (req, res) => {
  try {
    const { userId: adminId } = req.user; // Admin creating the order
    const {
      user_id,      // Customer ID
      items,        // Array of order items
      subtotal,
      tax,
      discount,
      total,
      status
    } = req.body;

    // Get customer's latest measurement for snapshot
    const latestMeasurement = await Measurement.findLatestByUserId(user_id);
    
    if (!latestMeasurement) {
      return res.status(400).json({
        success: false,
        message: 'No measurements found for this customer. Please add measurements first.'
      });
    }

    // Create measurement snapshot (preserve historical accuracy)
    const measurementSnapshot = {
      chest: latestMeasurement.chest,
      waist: latestMeasurement.waist,
      hips: latestMeasurement.hips,
      sleeve: latestMeasurement.sleeve,
      shoulder: latestMeasurement.shoulder,
      neck: latestMeasurement.neck,
      length: latestMeasurement.length,
      unit: latestMeasurement.unit
    };

    // Create order
    const orderId = await Order.create({
      user_id,
      created_by: adminId,
      status: status || 'pending',
      items,
      measurement_snapshot: measurementSnapshot,
      subtotal,
      tax,
      discount,
      total
    });

    // Fetch created order
    const order = await Order.findById(orderId);

    console.log(`✅ Order ${orderId} created by admin ${adminId} for customer ${user_id}`);

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: {
        order
      }
    });

  } catch (error) {
    console.error('❌ Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating order',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// =============================================================================
// 2. GET ALL ORDERS (with role-based filtering)
// =============================================================================
/**
 * Get orders based on user role:
 * - Customer: Only their own orders
 * - Admin: All orders OR filter by customer_id/status
 * 
 * Query parameters:
 * - customer_id (admin only): Filter by specific customer
 * - status: Filter by status (pending, in_progress, ready, delivered)
 * - limit: Max results (default: 50)
 * - offset: Skip results (default: 0)
 * 
 * @route   GET /api/orders
 * @access  Private
 */
const getAllOrders = async (req, res) => {
  try {
    const { userId, role } = req.user;
    const { customer_id, status, limit, offset } = req.query;

    let orders;

    if (role === 'customer') {
      // Customers can only see their own orders
      orders = await Order.findByUserId(userId);
      
      // Apply status filter if provided
      if (status) {
        orders = orders.filter(order => order.status === status);
      }

      console.log(`📦 Customer ${userId} retrieved ${orders.length} orders`);

    } else if (role === 'admin') {
      // Admin can see all orders or filter
      if (customer_id) {
        orders = await Order.findByUserId(parseInt(customer_id));
      } else {
        orders = await Order.findAll({
          limit: limit ? parseInt(limit) : 50,
          offset: offset ? parseInt(offset) : 0,
          status
        });
      }

      console.log(`📦 Admin retrieved ${orders.length} orders`);

    } else {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      count: orders.length,
      data: {
        orders
      }
    });

  } catch (error) {
    console.error('❌ Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// =============================================================================
// 3. GET SINGLE ORDER BY ID (with ownership check)
// =============================================================================
/**
 * Get a specific order by ID
 * - Customer: Can only get their own orders
 * - Admin: Can get any order
 * 
 * @route   GET /api/orders/:id
 * @access  Private
 */
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, role } = req.user;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check ownership (if customer)
    if (role === 'customer' && order.user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: 'You can only access your own orders'
      });
    }

    console.log(`📦 Order ${id} retrieved by user ${userId}`);

    res.json({
      success: true,
      data: {
        order
      }
    });

  } catch (error) {
    console.error('❌ Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching order',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// =============================================================================
// 4. UPDATE ORDER STATUS (Admin only)
// =============================================================================
/**
 * Update order status
 * Status flow: pending → in_progress → ready → delivered
 * 
 * @route   PATCH /api/orders/:id/status
 * @access  Private (Admin only)
 */
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ['pending', 'in_progress', 'ready', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    // Check if order exists
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Update status
    const updated = await Order.updateStatus(id, status);

    if (!updated) {
      return res.status(500).json({
        success: false,
        message: 'Failed to update order status'
      });
    }

    // Fetch updated order
    const updatedOrder = await Order.findById(id);

    console.log(`✏️ Order ${id} status updated to: ${status}`);

    res.json({
      success: true,
      message: `Order status updated to ${status}`,
      data: {
        order: updatedOrder
      }
    });

  } catch (error) {
    console.error('❌ Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating order status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// =============================================================================
// Export all controller functions
// =============================================================================
module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus
};
