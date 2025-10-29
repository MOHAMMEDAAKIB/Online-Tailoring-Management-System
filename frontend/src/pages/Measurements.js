import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { measurementService } from '../services';
import { toast } from 'react-toastify';

const Measurements = () => {
  const [measurements, setMeasurements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    measurement_type: 'shirt',
    chest: '',
    waist: '',
    hip: '',
    shoulder: '',
    sleeve_length: '',
    shirt_length: '',
    pant_length: '',
    inseam: '',
    neck: '',
    additional_notes: ''
  });

  useEffect(() => {
    fetchMeasurements();
  }, []);

  const fetchMeasurements = async () => {
    try {
      const response = await measurementService.getAll();
      setMeasurements(response.data.measurements);
    } catch (error) {
      toast.error('Failed to load measurements');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await measurementService.create(formData);
      toast.success('Measurement added successfully!');
      setShowForm(false);
      fetchMeasurements();
      setFormData({
        measurement_type: 'shirt',
        chest: '',
        waist: '',
        hip: '',
        shoulder: '',
        sleeve_length: '',
        shirt_length: '',
        pant_length: '',
        inseam: '',
        neck: '',
        additional_notes: ''
      });
    } catch (error) {
      toast.error('Failed to add measurement');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this measurement?')) {
      try {
        await measurementService.delete(id);
        toast.success('Measurement deleted successfully');
        fetchMeasurements();
      } catch (error) {
        toast.error('Failed to delete measurement');
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>My Measurements</h1>
          <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
            {showForm ? 'Cancel' : 'Add Measurement'}
          </button>
        </div>

        {showForm && (
          <div className="card" style={{ marginTop: '1rem' }}>
            <h2>Add New Measurement</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Measurement Type</label>
                <select
                  name="measurement_type"
                  value={formData.measurement_type}
                  onChange={handleChange}
                  required
                >
                  <option value="shirt">Shirt</option>
                  <option value="pant">Pant</option>
                  <option value="suit">Suit</option>
                  <option value="dress">Dress</option>
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                <div className="form-group">
                  <label>Chest (inches)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="chest"
                    value={formData.chest}
                    onChange={handleChange}
                    placeholder="e.g., 38.5"
                  />
                </div>
                <div className="form-group">
                  <label>Waist (inches)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="waist"
                    value={formData.waist}
                    onChange={handleChange}
                    placeholder="e.g., 32"
                  />
                </div>
                <div className="form-group">
                  <label>Hip (inches)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="hip"
                    value={formData.hip}
                    onChange={handleChange}
                    placeholder="e.g., 40"
                  />
                </div>
                <div className="form-group">
                  <label>Shoulder (inches)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="shoulder"
                    value={formData.shoulder}
                    onChange={handleChange}
                    placeholder="e.g., 17"
                  />
                </div>
                <div className="form-group">
                  <label>Sleeve Length (inches)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="sleeve_length"
                    value={formData.sleeve_length}
                    onChange={handleChange}
                    placeholder="e.g., 24"
                  />
                </div>
                <div className="form-group">
                  <label>Shirt Length (inches)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="shirt_length"
                    value={formData.shirt_length}
                    onChange={handleChange}
                    placeholder="e.g., 30"
                  />
                </div>
                <div className="form-group">
                  <label>Pant Length (inches)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="pant_length"
                    value={formData.pant_length}
                    onChange={handleChange}
                    placeholder="e.g., 42"
                  />
                </div>
                <div className="form-group">
                  <label>Inseam (inches)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="inseam"
                    value={formData.inseam}
                    onChange={handleChange}
                    placeholder="e.g., 32"
                  />
                </div>
                <div className="form-group">
                  <label>Neck (inches)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="neck"
                    value={formData.neck}
                    onChange={handleChange}
                    placeholder="e.g., 15.5"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Additional Notes</label>
                <textarea
                  name="additional_notes"
                  value={formData.additional_notes}
                  onChange={handleChange}
                  placeholder="Any special requirements or notes"
                />
              </div>
              <button type="submit" className="btn btn-success">
                Save Measurement
              </button>
            </form>
          </div>
        )}

        <div className="card" style={{ marginTop: '1rem' }}>
          {loading ? (
            <p>Loading measurements...</p>
          ) : measurements.length === 0 ? (
            <p>No measurements found. Add your first measurement!</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Chest</th>
                  <th>Waist</th>
                  <th>Hip</th>
                  <th>Shoulder</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {measurements.map((measurement) => (
                  <tr key={measurement.id}>
                    <td>{measurement.measurement_type}</td>
                    <td>{measurement.chest || '-'}</td>
                    <td>{measurement.waist || '-'}</td>
                    <td>{measurement.hip || '-'}</td>
                    <td>{measurement.shoulder || '-'}</td>
                    <td>{new Date(measurement.created_at).toLocaleDateString()}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(measurement.id)}
                        className="btn btn-danger"
                        style={{ padding: '0.5rem 1rem' }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Measurements;
