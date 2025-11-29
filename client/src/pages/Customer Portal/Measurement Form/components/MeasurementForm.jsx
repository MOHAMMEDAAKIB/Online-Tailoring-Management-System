import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMeasurement } from '../../../../api/masermentAPI';
import './MeasurementForm.css';

function MeasurementForm() {
    const navigate = useNavigate();
    const [unit, setUnit] = useState('inch');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        profileName: '',
        neck: '',
        chest: '',
        shoulder: '',
        sleeve: '',
        bicep: '',
        waist: '',
        hips: '',
        thigh: '',
        inseam: '',
        outseam: '',
        length: '',
        notes: ''
    });

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
        setLoading(true);
        setError('');

        try {
            // Prepare measurement data according to API specification
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

            const response = await createMeasurement(measurementData);
            
            if (response.data.success) {
                alert('Measurement created successfully!');
                navigate('/customer/measurements');
            }
        } catch (err) {
            console.error('Error creating measurement:', err);
            setError(err.response?.data?.message || 'Failed to save measurement. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/customer/measurements');
    };

    return (
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
                        <label className="measurement-form-field">
                            <p className="measurement-form-label">Profile Name</p>
                            <input
                                className="measurement-form-input"
                                type="text"
                                name="profileName"
                                value={formData.profileName}
                                onChange={handleChange}
                                placeholder="e.g., John's Suit - 2024"
                            />
                        </label>
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
                            <p className="measurement-form-label">Bicep</p>
                            <input
                                className="measurement-form-input"
                                type="number"
                                step="0.1"
                                name="bicep"
                                value={formData.bicep}
                                onChange={handleChange}
                                placeholder="e.g., 14"
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
                            <p className="measurement-form-label">Thigh</p>
                            <input
                                className="measurement-form-input"
                                type="number"
                                step="0.1"
                                name="thigh"
                                value={formData.thigh}
                                onChange={handleChange}
                                placeholder="e.g., 22"
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
                        <label className="measurement-form-field">
                            <p className="measurement-form-label-with-info">
                                Inseam
                                <span 
                                    className="material-symbols-outlined measurement-form-info-icon"
                                    title="Measure from the crotch to the desired pants length."
                                >
                                    info
                                </span>
                            </p>
                            <input
                                className="measurement-form-input"
                                type="number"
                                step="0.1"
                                name="inseam"
                                value={formData.inseam}
                                onChange={handleChange}
                                placeholder="e.g., 30"
                            />
                        </label>
                        <label className="measurement-form-field">
                            <p className="measurement-form-label-with-info">
                                Outseam
                                <span 
                                    className="material-symbols-outlined measurement-form-info-icon"
                                    title="Measure from the waistband to the desired pants length."
                                >
                                    info
                                </span>
                            </p>
                            <input
                                className="measurement-form-input"
                                type="number"
                                step="0.1"
                                name="outseam"
                                value={formData.outseam}
                                onChange={handleChange}
                                placeholder="e.g., 40"
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
                        disabled={loading}
                    >
                        <span>Cancel</span>
                    </button>
                    <button 
                        type="submit" 
                        className="measurement-form-button primary"
                        disabled={loading}
                    >
                        <span>{loading ? 'Saving...' : 'Save Measurements'}</span>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default MeasurementForm;
