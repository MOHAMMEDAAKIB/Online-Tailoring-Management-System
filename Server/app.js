// =============================================================================
// LOAD ENVIRONMENT VARIABLES FIRST
// =============================================================================
// Must be at the very top before importing other modules
require('dotenv').config();

// =============================================================================
// IMPORT REQUIRED PACKAGES
// =============================================================================
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// =============================================================================
// IMPORT ROUTES
// =============================================================================
const authRoutes = require('./src/routes/authRoutes');

// =============================================================================
// CREATE EXPRESS APP
// =============================================================================
const app = express();
const PORT = process.env.PORT || 4000;

// =============================================================================
// MIDDLEWARE SETUP
// =============================================================================

// 1. CORS - Allow requests from frontend (React, Vue, Angular, etc.)
// Purpose: Enable cross-origin resource sharing
app.use(cors({
  origin: "http://localhost:5173", // allow React frontend
  methods: ["GET", "POST", "PUT", "DELETE"], // Frontend URL
  credentials: true // Allow cookies
}));

// 2. JSON Parser - Parse incoming JSON request bodies
// Purpose: Convert JSON in request body to JavaScript object
app.use(express.json());

// 3. URL Encoded Parser - Parse URL-encoded data (form submissions)
app.use(express.urlencoded({ extended: true }));

// 4. HTTP Request Logger - Log all HTTP requests
// Purpose: See what requests are coming in (helpful for debugging)
app.use(morgan('dev')); // Logs: GET /api/auth/login 200 45ms

// =============================================================================
// ROUTES
// =============================================================================

// Health check route (test if server is running)
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Online Tailoring Management System API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Mount authentication routes
app.use('/api/auth', authRoutes);

// Future routes will go here:
// app.use('/api/measurements', measurementRoutes);
// app.use('/api/orders', orderRoutes);
// app.use('/api/invoices', invoiceRoutes);
// app.use('/api/payments', paymentRoutes);

// =============================================================================
// ERROR HANDLING MIDDLEWARE
// =============================================================================

// Handle 404 - Route not found
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Global error:', err);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// =============================================================================
// START SERVER
// =============================================================================
app.listen(PORT, () => {
  console.log('='.repeat(60));
  console.log('🚀 Online Tailoring Management System API');
  console.log('='.repeat(60));
  console.log(`📡 Server running on: http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📦 Database: ${process.env.DB_NAME}`);
  console.log('='.repeat(60));
  console.log('Available Routes:');
  console.log('  GET    /                          - Health check');
  console.log('  POST   /api/auth/register         - Register new user');
  console.log('  POST   /api/auth/login            - Login');
  console.log('  POST   /api/auth/refresh          - Refresh access token');
  console.log('  GET    /api/auth/me               - Get current user');
  console.log('  PUT    /api/auth/profile          - Update profile');
  console.log('  PUT    /api/auth/change-password  - Change password');
  console.log('  POST   /api/auth/logout           - Logout');
  console.log('='.repeat(60));
});
