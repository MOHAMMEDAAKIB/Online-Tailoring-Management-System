import api from "./apiService";

// ============ NOTIFICATIONS API ============

/**
 * Send notification (Admin only)
 * @param {Object} data - Notification data
 * @param {number} data.user_id - Target user ID
 * @param {string} data.channel - Channel: email or sms
 * @param {string} data.template - Template: order_confirmation, payment_received, order_ready, order_delivered, custom
 * @param {Object} data.payload - Template data (email, phone, order_id, etc.)
 * @returns {Promise}
 */
export const sendNotification = (data) => {
  return api.post("/api/notifications/send", data);
};

/**
 * Get notification logs (Customer: own, Admin: all or filtered)
 * @param {Object} params - Query parameters { user_id, channel, status, limit }
 * @returns {Promise}
 */
export const getNotificationLogs = (params = {}) => {
  return api.get("/api/notifications/logs", { params });
};
