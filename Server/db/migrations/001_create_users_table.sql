-- Migration: Create users table for authentication
-- Run this file once to set up the database

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS `tailoring_management` 
  DEFAULT CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;

-- Use the database
USE `tailoring_management`;

-- Create users table
CREATE TABLE IF NOT EXISTS `users` (
  -- Primary key: unique ID for each user
  `id` INT NOT NULL AUTO_INCREMENT,
  
  -- User information
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) DEFAULT NULL,
  
  -- Role: admin (tailor) or customer
  `role` ENUM('admin', 'customer') NOT NULL DEFAULT 'customer',
  
  -- Timestamps
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  
  -- Constraints
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_users_email` (`email`)
  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;