// =============================================================================
// MEASUREMENT MODEL - Handles customer body measurements
// =============================================================================
// This model stores and retrieves customer measurements for tailoring
// Tables: measurements

const db = require('../config/database');

class Measurement {
  
  // ===========================================================================
  // CREATE - Add new measurement
  // ===========================================================================
  /**
   * Create a new measurement record for a customer
   * @param {Object} data - Measurement data
   * @param {number} data.user_id - Customer ID
   * @param {string} data.label - Measurement label (e.g., "Formal Shirt", "Wedding Suit")
   * @param {number} data.chest - Chest measurement
   * @param {number} data.waist - Waist measurement
   * @param {number} data.hips - Hips measurement (optional)
   * @param {number} data.sleeve - Sleeve length (optional)
   * @param {number} data.shoulder - Shoulder width (optional)
   * @param {number} data.neck - Neck size (optional)
   * @param {number} data.length - Length measurement (optional)
   * @param {string} data.unit - 'Cm', 'm', or 'inch' (default: 'Cm')
   * @param {string} data.notes - Additional notes (optional)
   * @returns {number} - The new measurement ID
   */
  static async create({
    user_id,
    label,
    chest,
    waist,
    hips,
    sleeve,
    shoulder,
    neck,
    length,
    unit = 'Cm',
    notes
  }) {
    const sql = `
      INSERT INTO measurements (
        user_id, label, chest, waist, hips, sleeve, 
        shoulder, neck, length, unit, notes, created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `;
    
    const [result] = await db.execute(sql, [
      user_id, label, chest, waist, hips, sleeve,
      shoulder, neck, length, unit, notes
    ]);
    
    return result.insertId;
  }

  // ===========================================================================
  // READ - Get all measurements for a customer
  // ===========================================================================
  /**
   * Get all measurements for a specific customer
   * @param {number} userId - Customer ID
   * @returns {Array} - Array of measurement objects
   */
  static async findByUserId(userId) {
    const sql = `
      SELECT *
      FROM measurements
      WHERE user_id = ?
      ORDER BY created_at DESC
    `;
    
    const [rows] = await db.execute(sql, [userId]);
    return rows;
  }

  // ===========================================================================
  // READ - Get specific measurement by ID
  // ===========================================================================
  /**
   * Get a single measurement by its ID
   * @param {number} id - Measurement ID
   * @returns {Object|undefined} - Measurement object or undefined
   */
  static async findById(id) {
    const sql = `
      SELECT m.*, u.name as customer_name, u.email as customer_email
      FROM measurements m
      JOIN users u ON m.user_id = u.id
      WHERE m.id = ?
      LIMIT 1
    `;
    
    const [rows] = await db.execute(sql, [id]);
    return rows[0];
  }

  // ===========================================================================
  // READ - Get latest measurement for a customer
  // ===========================================================================
  /**
   * Get the most recent measurement for a customer
   * Useful when creating a new order
   * @param {number} userId - Customer ID
   * @returns {Object|undefined} - Latest measurement or undefined
   */
  static async findLatestByUserId(userId) {
    const sql = `
      SELECT *
      FROM measurements
      WHERE user_id = ?
      ORDER BY created_at DESC
      LIMIT 1
    `;
    
    const [rows] = await db.execute(sql, [userId]);
    return rows[0];
  }

  // ===========================================================================
  // READ - Get all measurements (admin view)
  // ===========================================================================
  /**
   * Get all measurements with customer details
   * Used by admins to view all measurements
   * @param {number} limit - Maximum number of results (optional)
   * @returns {Array} - Array of measurements with customer info
   */
  static async findAll(limit = 100) {
    const sql = `
      SELECT m.*, u.name as customer_name, u.email as customer_email
      FROM measurements m
      JOIN users u ON m.user_id = u.id
      ORDER BY m.created_at DESC
      LIMIT ?
    `;
    
    const [rows] = await db.execute(sql, [limit]);
    return rows;
  }

  // ===========================================================================
  // UPDATE - Update measurement
  // ===========================================================================
  /**
   * Update an existing measurement
   * @param {number} id - Measurement ID
   * @param {Object} updates - Fields to update
   * @returns {boolean} - True if updated, false if not found
   */
  static async update(id, {
    label,
    chest,
    waist,
    hips,
    sleeve,
    shoulder,
    neck,
    length,
    unit,
    notes
  }) {
    const sql = `
      UPDATE measurements
      SET 
        label = COALESCE(?, label),
        chest = COALESCE(?, chest),
        waist = COALESCE(?, waist),
        hips = COALESCE(?, hips),
        sleeve = COALESCE(?, sleeve),
        shoulder = COALESCE(?, shoulder),
        neck = COALESCE(?, neck),
        length = COALESCE(?, length),
        unit = COALESCE(?, unit),
        notes = COALESCE(?, notes)
      WHERE id = ?
    `;
    
    const [result] = await db.execute(sql, [
      label, chest, waist, hips, sleeve, shoulder, neck, length, unit, notes, id
    ]);
    
    return result.affectedRows > 0;
  }

  // ===========================================================================
  // DELETE - Remove measurement
  // ===========================================================================
  /**
   * Delete a measurement
   * @param {number} id - Measurement ID
   * @returns {boolean} - True if deleted, false if not found
   */
  static async delete(id) {
    const sql = `DELETE FROM measurements WHERE id = ?`;
    const [result] = await db.execute(sql, [id]);
    return result.affectedRows > 0;
  }

  // ===========================================================================
  // UTILITY - Count measurements per customer
  // ===========================================================================
  /**
   * Count how many measurements a customer has
   * @param {number} userId - Customer ID
   * @returns {number} - Count of measurements
   */
  static async countByUserId(userId) {
    const sql = `SELECT COUNT(*) as count FROM measurements WHERE user_id = ?`;
    const [rows] = await db.execute(sql, [userId]);
    return rows[0].count;
  }

  // ===========================================================================
  // UTILITY - Search measurements by label
  // ===========================================================================
  /**
   * Search measurements by label (e.g., "Wedding", "Formal")
   * @param {string} searchTerm - Search term
   * @returns {Array} - Matching measurements
   */
  static async searchByLabel(searchTerm) {
    const sql = `
      SELECT m.*, u.name as customer_name
      FROM measurements m
      JOIN users u ON m.user_id = u.id
      WHERE m.label LIKE ?
      ORDER BY m.created_at DESC
    `;
    
    const [rows] = await db.execute(sql, [`%${searchTerm}%`]);
    return rows;
  }
}

module.exports = Measurement;

// =============================================================================
// USAGE EXAMPLES:
// =============================================================================
/*

// 1. Create a new measurement
const measurementId = await Measurement.create({
  user_id: 5,
  label: 'Wedding Suit',
  chest: 40,
  waist: 32,
  hips: 38,
  sleeve: 24,
  shoulder: 18,
  neck: 15,
  length: 28,
  unit: 'inch',
  notes: 'Customer prefers slim fit'
});

// 2. Get all measurements for a customer
const customerMeasurements = await Measurement.findByUserId(5);

// 3. Get latest measurement
const latest = await Measurement.findLatestByUserId(5);

// 4. Update a measurement
await Measurement.update(1, {
  chest: 41,
  notes: 'Updated after fitting'
});

// 5. Delete a measurement
await Measurement.delete(1);

*/
