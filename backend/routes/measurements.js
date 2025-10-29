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

// All routes require authentication
router.use(authMiddleware);

router.post('/', createMeasurement);
router.get('/', getMeasurements);
router.get('/:id', getMeasurementById);
router.put('/:id', updateMeasurement);
router.delete('/:id', deleteMeasurement);

// AI measurement estimation endpoint
router.post('/estimate', estimateMeasurements);

module.exports = router;
