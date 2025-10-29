const express = require('express');
const router = express.Router();
const {
  createMeasurement,
  getMeasurements,
  getMeasurementById,
  updateMeasurement,
  deleteMeasurement,
  estimateMeasurements
} = require('../controllers/measurementController');
const { authMiddleware } = require('../middleware/auth');
const { apiLimiter } = require('../middleware/rateLimiter');

// All routes require authentication and rate limiting
router.use(authMiddleware);
router.use(apiLimiter);

router.post('/', createMeasurement);
router.get('/', getMeasurements);
router.get('/:id', getMeasurementById);
router.put('/:id', updateMeasurement);
router.delete('/:id', deleteMeasurement);

// AI measurement estimation endpoint
router.post('/estimate', estimateMeasurements);

module.exports = router;
