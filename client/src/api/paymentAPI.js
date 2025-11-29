import api from "./apiService";

// ============ PAYMENTS API ============

/**
 * Create checkout session for payment
 * @param {Object} data - { order_id, provider }
 * @param {number} data.order_id - Order ID to pay for
 * @param {string} data.provider - Payment provider: stripe, payhere, cash, bank_transfer
 * @returns {Promise}
 */
export const createCheckout = (data) => {
  return api.post("/api/payments/create-checkout", data);
};

/**
 * Payment webhook handler (called by payment providers)
 * @param {Object} data - Webhook payload
 * @returns {Promise}
 */
export const handlePaymentWebhook = (data) => {
  return api.post("/api/payments/webhook", data);
};
