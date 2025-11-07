-- Migration: Create measurements table for storing user measurements
-- Run this file once to set up the database

-- Create measurements table
CREATE TABLE IF NOT EXISTS `measurements` (
  -- Primary key: unique ID for each measurements
  `id` INT NOT NULL AUTO_INCREMENT,
  
  -- User information
    `user_id` INT(255) NOT NULL,
    `label` VARCHAR(255) NOT NULL,
    `chest` INT(50) NOT NULL,
    `waist` INT(50) DEFAULT NULL,
    `hips` INT(50) DEFAULT NULL,
    `sleeve` INT(50) DEFAULT NULL,
    `shoulder` INT(50) DEFAULT NULL,
    `neck` INT(50) DEFAULT NULL,
    `length` INT(50) DEFAULT NULL,
    `notes` VARCHAR(255) NOT NULL,

  -- Unit of measurement: Cm, m, inch
  `unit` ENUM('Cm', 'm', 'inch') NOT NULL DEFAULT 'Cm',
  
  -- Timestamps
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  -- Constraints
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;