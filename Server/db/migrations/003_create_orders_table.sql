-- Migration: Create orders table
-- Stores customer orders with items and measurements

USE `tailoring_management`;

CREATE TABLE IF NOT EXISTS `orders` (
  -- Primary key
  `id` INT NOT NULL AUTO_INCREMENT,
  
  -- Foreign keys
  `user_id` INT NOT NULL COMMENT 'Customer who placed the order',
  `created_by` INT NOT NULL COMMENT 'Admin user who created the order',
  
  -- Order status: tracks lifecycle
  `status` ENUM('pending', 'in_progress', 'ready', 'delivered', 'cancelled') 
    NOT NULL DEFAULT 'pending',
  
  -- Order details (stored as JSON for flexibility)
  `items_json` JSON NOT NULL COMMENT 'Array of order items with quantities',
  `measurement_snapshot` JSON NULL COMMENT 'Customer measurements at time of order',
  
  -- Financial details (DECIMAL for exact money calculations)
  `subtotal` DECIMAL(10,2) NOT NULL DEFAULT 0.00 COMMENT 'Total before tax and discount',
  `tax` DECIMAL(10,2) NOT NULL DEFAULT 0.00 COMMENT 'Tax amount',
  `discount` DECIMAL(10,2) NOT NULL DEFAULT 0.00 COMMENT 'Discount amount',
  `total` DECIMAL(10,2) NOT NULL DEFAULT 0.00 COMMENT 'Final total amount',
  
  -- Timestamps
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  
  -- Constraints
  PRIMARY KEY (`id`),
  KEY `idx_orders_user_id` (`user_id`),
  KEY `idx_orders_status` (`status`),
  KEY `idx_orders_created_by` (`created_by`),
  
  -- Foreign key constraints (optional - uncomment if you want strict referential integrity)
  CONSTRAINT `fk_orders_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_orders_creator` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Example items_json structure:
-- [
--   {"item": "Shirt", "quantity": 2, "price": 50.00, "fabric": "Cotton"},
--   {"item": "Pants", "quantity": 1, "price": 75.00, "fabric": "Denim"}
-- ]

-- Example measurement_snapshot structure:
-- {
--   "chest": 40,
--   "waist": 32,
--   "sleeve": 24,
--   "unit": "inches"
-- }
