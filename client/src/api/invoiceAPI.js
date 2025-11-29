import api from "./apiService";

// ============ INVOICES API ============

/**
 * Get or generate invoice for an order
 * @param {number} orderId - Order ID
 * @returns {Promise}
 */
export const getInvoiceByOrderId = (orderId) => {
  return api.get(`/api/invoices/${orderId}`);
};
