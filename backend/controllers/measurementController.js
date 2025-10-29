const pool = require('../config/database');
const { sendEmail } = require('../utils/email');

// Create a new measurement
const createMeasurement = async (req, res) => {
  try {
    const {
      measurement_type, chest, waist, hip, shoulder,
      sleeve_length, shirt_length, pant_length, inseam, neck,
      additional_notes, photo_url
    } = req.body;

    const userId = req.user.id;

    const [result] = await pool.query(
      `INSERT INTO measurements 
      (user_id, measurement_type, chest, waist, hip, shoulder, sleeve_length, 
       shirt_length, pant_length, inseam, neck, additional_notes, photo_url) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [userId, measurement_type, chest, waist, hip, shoulder, sleeve_length,
       shirt_length, pant_length, inseam, neck, additional_notes, photo_url]
    );

    // Create notification
    await pool.query(
      'INSERT INTO notifications (user_id, title, message, type) VALUES (?, ?, ?, ?)',
      [userId, 'Measurement Submitted', 'Your measurements have been recorded successfully.', 'success']
    );

    res.status(201).json({ 
      message: 'Measurement created successfully', 
      measurementId: result.insertId 
    });
  } catch (error) {
    console.error('Create measurement error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all measurements for a user
const getMeasurements = async (req, res) => {
  try {
    const userId = req.user.role === 'admin' ? req.query.userId : req.user.id;
    
    const [measurements] = await pool.query(
      'SELECT * FROM measurements WHERE user_id = ? ORDER BY created_at DESC',
      [userId || req.user.id]
    );

    res.json({ measurements });
  } catch (error) {
    console.error('Get measurements error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get measurement by ID
const getMeasurementById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [measurements] = await pool.query(
      'SELECT * FROM measurements WHERE id = ?',
      [id]
    );

    if (measurements.length === 0) {
      return res.status(404).json({ message: 'Measurement not found' });
    }

    // Check authorization
    if (req.user.role !== 'admin' && measurements[0].user_id !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json({ measurement: measurements[0] });
  } catch (error) {
    console.error('Get measurement error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update measurement
const updateMeasurement = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      measurement_type, chest, waist, hip, shoulder,
      sleeve_length, shirt_length, pant_length, inseam, neck,
      additional_notes
    } = req.body;

    // Check if measurement exists and belongs to user
    const [measurements] = await pool.query(
      'SELECT * FROM measurements WHERE id = ?',
      [id]
    );

    if (measurements.length === 0) {
      return res.status(404).json({ message: 'Measurement not found' });
    }

    if (req.user.role !== 'admin' && measurements[0].user_id !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await pool.query(
      `UPDATE measurements SET 
       measurement_type = ?, chest = ?, waist = ?, hip = ?, shoulder = ?,
       sleeve_length = ?, shirt_length = ?, pant_length = ?, inseam = ?, neck = ?,
       additional_notes = ?
       WHERE id = ?`,
      [measurement_type, chest, waist, hip, shoulder, sleeve_length,
       shirt_length, pant_length, inseam, neck, additional_notes, id]
    );

    res.json({ message: 'Measurement updated successfully' });
  } catch (error) {
    console.error('Update measurement error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete measurement
const deleteMeasurement = async (req, res) => {
  try {
    const { id } = req.params;

    const [measurements] = await pool.query(
      'SELECT * FROM measurements WHERE id = ?',
      [id]
    );

    if (measurements.length === 0) {
      return res.status(404).json({ message: 'Measurement not found' });
    }

    if (req.user.role !== 'admin' && measurements[0].user_id !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await pool.query('DELETE FROM measurements WHERE id = ?', [id]);

    res.json({ message: 'Measurement deleted successfully' });
  } catch (error) {
    console.error('Delete measurement error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// AI measurement estimation placeholder
const estimateMeasurements = async (req, res) => {
  try {
    // Placeholder for future AI implementation
    res.status(501).json({ 
      message: 'AI measurement estimation feature coming soon',
      description: 'This feature will use AI to estimate body measurements from photos'
    });
  } catch (error) {
    console.error('Estimate measurements error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createMeasurement,
  getMeasurements,
  getMeasurementById,
  updateMeasurement,
  deleteMeasurement,
  estimateMeasurements
};
