import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMeasurementById, updateMeasurement } from '../../../api/masermentAPI';
import './MeasurementFormPage.css';
import MeasurementNavBar from './components/MeasurementNavBar';
import MeasurementHeader from './components/MeasurementHeader';
import MeasurementDiagram from './components/MeasurementDiagram';

function EditMeasurementPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [unit, setUnit] = useState('inch');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        neck: '',
        chest: '',
        shoulder: '',
        sleeve: '',
        waist: '',
        hips: '',
        length: '',
        notes: ''
    });

    useEffect(() => {
        fetchMeasurement();
    }, [id]);

    const fetchMeasurement = async () => {
        try {
            setLoading(true);
            const response = await getMeasurementById(id);
            if (response.data.success) {
                const measurement = response.data.data.measurement;
                setFormData({
                    neck: measurement.neck || '',
                    chest: measurement.chest || '',
                    shoulder: measurement.shoulder || '',
                    sleeve: measurement.sleeve || '',
                    waist: measurement.waist || '',
                    hips: measurement.hips || '',
                    length: measurement.length || '',
                    notes: measurement.notes || ''
                });
                setUnit(measurement.unit || 'inch');
            }
        } catch (err) {
            console.error('Error fetching measurement:', err);
            setError(err.response?.data?.message || 'Failed to load measurement.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        try {
            const measurementData = {
                chest: formData.chest ? parseFloat(formData.chest) : undefined,
                waist: formData.waist ? parseFloat(formData.waist) : undefined,
                hips: formData.hips ? parseFloat(formData.hips) : undefined,
                sleeve: formData.sleeve ? parseFloat(formData.sleeve) : undefined,
                shoulder: formData.shoulder ? parseFloat(formData.shoulder) : undefined,
                neck: formData.neck ? parseFloat(formData.neck) : undefined,
                length: formData.length ? parseFloat(formData.length) : undefined,
                unit: unit,
                notes: formData.notes || undefined
            };

            // Remove undefined values
            Object.keys(measurementData).forEach(key => 
                measurementData[key] === undefined && delete measurementData[key]
            );

            const response = await updateMeasurement(id, measurementData);
            
            if (response.data.success) {
                alert('Measurement updated successfully!');
                navigate('/customer/measurements');
            }
        } catch (err) {
            console.error('Error updating measurement:', err);
            setError(err.response?.data?.message || 'Failed to update measurement. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        navigate('/customer/measurements');
    };

    if (loading) {
        return (
            <div className="measurement-form-page">
                <MeasurementNavBar />
                <main className="measurement-form-main">
                    <div className="measurement-form-container">
                        <div style={{ textAlign: 'center', padding: '40px' }}>
                            Loading measurement...
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="measurement-form-page">
            <MeasurementNavBar />
            <main className="measurement-form-main">
                <div className="measurement-form-container">
                    <MeasurementHeader title="Edit Measurement" />
                    <div className="measurement-form-content">
                        <MeasurementDiagram />
                        <div className="measurement-form-wrapper">
                            <form className="measurement-form-card" onSubmit={handleSubmit}>
                                {error && (
                                    <div style={{ 
                                        padding: '12px', 
                                        marginBottom: '20px', 
                                        backgroundColor: '#fee', 
                                        color: '#c33',
                                        borderRadius: '8px',
                                        border: '1px solid #fcc'
                                    }}>
                                        {error}
                                    </div>
                                )}
                                
                                <div className="measurement-form-section">
                                    <div className="measurement-form-top-row">
                                        <div className="measurement-form-field">
                                            <p className="measurement-form-label">Units</p>
                                            <div className="measurement-form-unit-toggle">
                                                <label className={`measurement-form-unit-option ${unit === 'inch' ? 'active' : ''}`}>
                                                    <span>Inches</span>
                                                    <input
                                                        type="radio"
                                                        name="unit"
                                                        value="inch"
                                                        checked={unit === 'inch'}
                                                        onChange={(e) => setUnit(e.target.value)}
                                                        className="measurement-form-radio"
                                                    />
                                                </label>
                                                <label className={`measurement-form-unit-option ${unit === 'cm' ? 'active' : ''}`}>
                                                    <span>Centimeters (cm)</span>
                                                    <input
                                                        type="radio"
                                                        name="unit"
                                                        value="cm"
                                                        checked={unit === 'cm'}
                                                        onChange={(e) => setUnit(e.target.value)}
                                                        className="measurement-form-radio"
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="measurement-form-section">
                                    <h2 className="measurement-form-section-title">Upper Body Measurements</h2>
                                    <div className="measurement-form-grid">
                                        <label className="measurement-form-field">
                                            <p className="measurement-form-label">Neck</p>
                                            <input
                                                className="measurement-form-input"
                                                type="number"
                                                step="0.1"
                                                name="neck"
                                                value={formData.neck}
                                                onChange={handleChange}
                                                placeholder="e.g., 15.5"
                                            />
                                        </label>
                                        <label className="measurement-form-field">
                                            <p className="measurement-form-label">Chest</p>
                                            <input
                                                className="measurement-form-input"
                                                type="number"
                                                step="0.1"
                                                name="chest"
                                                value={formData.chest}
                                                onChange={handleChange}
                                                placeholder="e.g., 40"
                                            />
                                        </label>
                                        <label className="measurement-form-field">
                                            <p className="measurement-form-label">Shoulder</p>
                                            <input
                                                className="measurement-form-input"
                                                type="number"
                                                step="0.1"
                                                name="shoulder"
                                                value={formData.shoulder}
                                                onChange={handleChange}
                                                placeholder="e.g., 18"
                                            />
                                        </label>
                                        <label className="measurement-form-field">
                                            <p className="measurement-form-label">Sleeve</p>
                                            <input
                                                className="measurement-form-input"
                                                type="number"
                                                step="0.1"
                                                name="sleeve"
                                                value={formData.sleeve}
                                                onChange={handleChange}
                                                placeholder="e.g., 25"
                                            />
                                        </label>
                                        <label className="measurement-form-field">
                                            <p className="measurement-form-label">Waist</p>
                                            <input
                                                className="measurement-form-input"
                                                type="number"
                                                step="0.1"
                                                name="waist"
                                                value={formData.waist}
                                                onChange={handleChange}
                                                placeholder="e.g., 32"
                                            />
                                        </label>
                                    </div>
                                </div>

                                <div className="measurement-form-section">
                                    <h2 className="measurement-form-section-title">Lower Body Measurements</h2>
                                    <div className="measurement-form-grid">
                                        <label className="measurement-form-field">
                                            <p className="measurement-form-label">Hips</p>
                                            <input
                                                className="measurement-form-input"
                                                type="number"
                                                step="0.1"
                                                name="hips"
                                                value={formData.hips}
                                                onChange={handleChange}
                                                placeholder="e.g., 38"
                                            />
                                        </label>
                                        <label className="measurement-form-field">
                                            <p className="measurement-form-label">Length</p>
                                            <input
                                                className="measurement-form-input"
                                                type="number"
                                                step="0.1"
                                                name="length"
                                                value={formData.length}
                                                onChange={handleChange}
                                                placeholder="e.g., 42"
                                            />
                                        </label>
                                    </div>
                                </div>

                                <label className="measurement-form-field full-width">
                                    <p className="measurement-form-label">Special Instructions or Notes</p>
                                    <textarea
                                        className="measurement-form-textarea"
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleChange}
                                        placeholder="Add any special requests, such as fit preferences or specific alterations..."
                                        maxLength="500"
                                    />
                                </label>

                                <div className="measurement-form-actions">
                                    <button 
                                        type="button" 
                                        className="measurement-form-button secondary"
                                        onClick={handleCancel}
                                        disabled={saving}
                                    >
                                        <span>Cancel</span>
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="measurement-form-button primary"
                                        disabled={saving}
                                    >
                                        <span>{saving ? 'Updating...' : 'Update Measurement'}</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default EditMeasurementPage;
