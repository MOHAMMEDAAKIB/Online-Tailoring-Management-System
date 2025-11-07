-- Migration: Create invoices table
-- Generates invoices for orders with payment tracking

USE `tailoring_management`;

CREATE TABLE IF NOT EXISTS `invoices` (
  -- Primary key
  `id` INT NOT NULL AUTO_INCREMENT,
  
  -- Foreign keys
  `order_id` INT NOT NULL COMMENT 'Reference to orders table',
  
  -- Invoice details
  `invoice_no` VARCHAR(50) NOT NULL COMMENT 'Human-readable invoice number (e.g., INV-2025-001)',
  `items_snapshot` JSON NOT NULL COMMENT 'Copy of order items at invoice time',
  
  -- Financial details
  `subtotal` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `tax` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `total` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  
  -- Payment tracking
  `paid` TINYINT(1) NOT NULL DEFAULT 0 COMMENT 'Boolean: 1 = paid, 0 = unpaid',
  `payment_id` INT NULL COMMENT 'Reference to payment_transactions if paid',
  
  -- Timestamps
  `issued_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  
  -- Constraints
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_invoices_invoice_no` (`invoice_no`),
  KEY `idx_invoices_order_id` (`order_id`),
  KEY `idx_invoices_paid` (`paid`),
  
  -- Foreign key constraints
  CONSTRAINT `fk_invoices_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE
  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Example invoice_no format: INV-2025-001, INV-2025-002, etc.
