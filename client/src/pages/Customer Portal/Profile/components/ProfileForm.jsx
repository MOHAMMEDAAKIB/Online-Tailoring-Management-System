import { useState } from 'react';
import './ProfileForm.css';

function ProfileForm() {
    const [formData, setFormData] = useState({
        fullName: 'Amelia Chen',
        email: 'amelia.chen@example.com',
        phone: '+1 (555) 123-4567',
        country: 'United States',
        streetAddress: '123 Artisan Lane',
        city: 'New York',
        state: 'NY',
        zipCode: '10001'
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
        console.log('Form submitted:', formData);
    };

    const handleCancel = () => {
        console.log('Form cancelled');
    };

    return (
        <form className="profile-form" onSubmit={handleSubmit}>
            <div className="profile-form-fields">
                <div className="profile-form-row">
                    <label className="profile-form-field">
                        <p className="profile-form-label">Full Name</p>
                        <input
                            className="profile-form-input"
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                        />
                    </label>
                    <label className="profile-form-field">
                        <p className="profile-form-label">Email Address</p>
                        <input
                            className="profile-form-input"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <div className="profile-form-row">
                    <label className="profile-form-field">
                        <p className="profile-form-label">Phone Number</p>
                        <input
                            className="profile-form-input"
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </label>
                    <label className="profile-form-field">
                        <p className="profile-form-label">Country</p>
                        <input
                            className="profile-form-input"
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <label className="profile-form-field full-width">
                    <p className="profile-form-label">Street Address</p>
                    <input
                        className="profile-form-input"
                        type="text"
                        name="streetAddress"
                        value={formData.streetAddress}
                        onChange={handleChange}
                    />
                </label>

                <div className="profile-form-row">
                    <label className="profile-form-field">
                        <p className="profile-form-label">City</p>
                        <input
                            className="profile-form-input"
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                        />
                    </label>
                    <label className="profile-form-field">
                        <p className="profile-form-label">State / Province</p>
                        <input
                            className="profile-form-input"
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <div className="profile-form-row">
                    <label className="profile-form-field">
                        <p className="profile-form-label">ZIP / Postal Code</p>
                        <input
                            className="profile-form-input"
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleChange}
                        />
                    </label>
                </div>
            </div>

            <div className="profile-form-actions">
                <button 
                    type="button" 
                    className="profile-form-button secondary"
                    onClick={handleCancel}
                >
                    <span>Cancel</span>
                </button>
                <button 
                    type="submit" 
                    className="profile-form-button primary"
                >
                    <span>Save Changes</span>
                </button>
            </div>
        </form>
    );
}

export default ProfileForm;
