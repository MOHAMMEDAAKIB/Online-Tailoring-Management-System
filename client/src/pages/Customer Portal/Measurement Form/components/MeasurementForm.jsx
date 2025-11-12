import { useState } from 'react';
import './MeasurementForm.css';

function MeasurementForm() {
    const [unit, setUnit] = useState('inches');
    const [formData, setFormData] = useState({
        profileName: '',
        neck: '',
        chest: '',
        shoulders: '',
        sleeve: '',
        bicep: '',
        waist: '',
        hips: '',
        thigh: '',
        inseam: '',
        outseam: '',
        notes: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', { ...formData, unit });
    };

    const handleCancel = () => {
        console.log('Form cancelled');
    };

    return (
        <div className="measurement-form-wrapper">
            <form className="measurement-form-card" onSubmit={handleSubmit}>
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
                                <label className={`measurement-form-unit-option ${unit === 'inches' ? 'active' : ''}`}>
                                    <span>Inches</span>
                                    <input
                                        type="radio"
                                        name="unit"
                                        value="inches"
                                        checked={unit === 'inches'}
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
                                type="text"
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
                                type="text"
                                name="chest"
                                value={formData.chest}
                                onChange={handleChange}
                                placeholder="e.g., 40"
                            />
                        </label>
                        <label className="measurement-form-field">
                            <p className="measurement-form-label">Shoulders</p>
                            <input
                                className="measurement-form-input"
                                type="text"
                                name="shoulders"
                                value={formData.shoulders}
                                onChange={handleChange}
                                placeholder="e.g., 18"
                            />
                        </label>
                        <label className="measurement-form-field">
                            <p className="measurement-form-label">Sleeve</p>
                            <input
                                className="measurement-form-input"
                                type="text"
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
                                type="text"
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
                                type="text"
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
                                type="text"
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
                                type="text"
                                name="thigh"
                                value={formData.thigh}
                                onChange={handleChange}
                                placeholder="e.g., 22"
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
                                type="text"
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
                                type="text"
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
                    />
                </label>

                <div className="measurement-form-actions">
                    <button 
                        type="button" 
                        className="measurement-form-button secondary"
                        onClick={handleCancel}
                    >
                        <span>Cancel</span>
                    </button>
                    <button 
                        type="submit" 
                        className="measurement-form-button primary"
                    >
                        <span>Save Measurements</span>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default MeasurementForm;
