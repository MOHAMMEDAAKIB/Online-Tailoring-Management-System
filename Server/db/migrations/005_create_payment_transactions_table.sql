-- Migration: Create payment_transactions table
-- Records all payment attempts and results from payment gateways

USE `tailoring_management`;

CREATE TABLE IF NOT EXISTS `payment_transactions` (
  -- Primary key
  `id` INT NOT NULL AUTO_INCREMENT,
  
  -- Payment provider details
  `provider` VARCHAR(50) NOT NULL COMMENT 'Payment gateway: stripe, payhere, cash, bank_transfer',
  `provider_payment_id` VARCHAR(255) NULL COMMENT 'Unique ID from payment provider (e.g., Stripe payment intent)',
  
  -- Order reference
  `order_id` INT NOT NULL COMMENT 'Reference to orders table',
  
  -- Payment amount
  `amount` DECIMAL(10,2) NOT NULL COMMENT 'Payment amount',
  `currency` VARCHAR(3) NOT NULL DEFAULT 'USD' COMMENT 'ISO 4217 currency code (USD, LKR, EUR)',
  
  -- Payment status
  `status` ENUM('pending', 'completed', 'failed', 'refunded') 
    NOT NULL DEFAULT 'pending',
  
  -- Raw data from payment gateway (for debugging and reconciliation)
  `raw_payload` JSON NULL COMMENT 'Full webhook/response from payment provider',
  
  -- Timestamps
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  
  -- Constraints
  PRIMARY KEY (`id`),
  KEY `idx_payment_order_id` (`order_id`),
  KEY `idx_payment_status` (`status`),
  KEY `idx_payment_provider_id` (`provider_payment_id`),
  
  -- Foreign key constraints
  CONSTRAINT `fk_payment_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE
  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Example raw_payload from Stripe:
-- {
--   "id": "pi_3ABC123...",
--   "amount": 5000,
--   "status": "succeeded",
--   "payment_method": "card"
-- }
