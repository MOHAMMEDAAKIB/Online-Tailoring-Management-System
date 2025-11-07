-- Migration: Create notification_logs table
-- Tracks all email and SMS notifications sent to users

USE `tailoring_management`;

CREATE TABLE IF NOT EXISTS `notification_logs` (
  -- Primary key
  `id` INT NOT NULL AUTO_INCREMENT,
  
  -- Recipient
  `user_id` INT NOT NULL COMMENT 'User who received the notification',
  
  -- Notification details
  `channel` ENUM('email', 'sms') NOT NULL COMMENT 'Delivery channel',
  `template` VARCHAR(100) NOT NULL COMMENT 'Template name: order_confirmation, payment_received, etc.',
  `payload` JSON NULL COMMENT 'Data used to populate the template',
  
  -- Delivery status
  `status` ENUM('pending', 'sent', 'failed') NOT NULL DEFAULT 'pending',
  `sent_at` TIMESTAMP NULL DEFAULT NULL COMMENT 'When notification was successfully sent',
  `error` TEXT NULL COMMENT 'Error message if delivery failed',
  
  -- Timestamps
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  -- Constraints
  PRIMARY KEY (`id`),
  KEY `idx_notifications_user_id` (`user_id`),
  KEY `idx_notifications_status` (`status`),
  KEY `idx_notifications_channel` (`channel`),
  
  -- Foreign key constraints
  CONSTRAINT `fk_notifications_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Example payload for order_confirmation template:
-- {
--   "order_id": 123,
--   "order_total": 150.00,
--   "items": ["Shirt x2", "Pants x1"]
-- }
