import api from "./apiService";

// ============ ORDERS API ============

/**
 * Create a new order (Admin only)
 * @param {Object} data - Order data
 * @returns {Promise}
 */
export const createOrder = (data) => {
  return api.post("/api/orders", data);
};

/**
 * Get all orders (Customer: own orders, Admin: all or filtered)
 * @param {Object} params - Query parameters { customer_id, status, limit, offset }
 * @returns {Promise}
 */
export const getAllOrders = (params = {}) => {
  return api.get("/api/orders", { params });
};

/**
 * Get single order by ID
 * @param {number} id - Order ID
 * @returns {Promise}
 */
export const getOrderById = (id) => {
  return api.get(`/api/orders/${id}`);
};

/**
 * Update order status (Admin only)
 * @param {number} id - Order ID
 * @param {string} status - New status (pending, in_progress, ready, delivered, cancelled)
 * @returns {Promise}
 */
export const updateOrderStatus = (id, status) => {
  return api.patch(`/api/orders/${id}/status`, { status });
};
