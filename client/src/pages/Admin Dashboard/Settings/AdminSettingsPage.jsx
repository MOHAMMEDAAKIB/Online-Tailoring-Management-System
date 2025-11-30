import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import './AdminSettingsPage.css';

function AdminSettingsPage() {
    const [formData, setFormData] = useState({
        businessName: 'TailorSwift',
        email: 'admin@tailorswift.com',
        phone: '+1 234 567 8900',
        address: '123 Fashion Street, New York, NY 10001',
        currency: 'USD',
        taxRate: '8.5',
        notifications: true,
        emailAlerts: true,
        orderAlerts: true,
        inventoryAlerts: true
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Settings saved:', formData);
        alert('Settings saved successfully!');
    };

    return (
        <div className="admin-settings-page">
            <Sidebar />
            <main className="admin-settings-main">
                <div className="admin-settings-header">
                    <h1>Settings</h1>
                </div>

                <form onSubmit={handleSubmit} className="admin-settings-content">
                    <div className="settings-section">
                        <h2>Business Information</h2>
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="businessName">Business Name</label>
                                <input
                                    type="text"
                                    id="businessName"
                                    name="businessName"
                                    value={formData.businessName}
                                    onChange={handleChange}
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group full-width">
                                <label htmlFor="address">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="form-input"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="settings-section">
                        <h2>Financial Settings</h2>
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="currency">Currency</label>
                                <select
                                    id="currency"
                                    name="currency"
                                    value={formData.currency}
                                    onChange={handleChange}
                                    className="form-input"
                                >
                                    <option value="USD">USD ($)</option>
                                    <option value="EUR">EUR (€)</option>
                                    <option value="GBP">GBP (£)</option>
                                    <option value="LKR">LKR (Rs)</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="taxRate">Tax Rate (%)</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    id="taxRate"
                                    name="taxRate"
                                    value={formData.taxRate}
                                    onChange={handleChange}
                                    className="form-input"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="settings-section">
                        <h2>Notification Preferences</h2>
                        <div className="form-checkboxes">
                            <div className="form-checkbox">
                                <input
                                    type="checkbox"
                                    id="notifications"
                                    name="notifications"
                                    checked={formData.notifications}
                                    onChange={handleChange}
                                />
                                <label htmlFor="notifications">
                                    <span className="checkbox-title">Enable Notifications</span>
                                    <span className="checkbox-desc">Receive system notifications</span>
                                </label>
                            </div>
                            <div className="form-checkbox">
                                <input
                                    type="checkbox"
                                    id="emailAlerts"
                                    name="emailAlerts"
                                    checked={formData.emailAlerts}
                                    onChange={handleChange}
                                />
                                <label htmlFor="emailAlerts">
                                    <span className="checkbox-title">Email Alerts</span>
                                    <span className="checkbox-desc">Receive important updates via email</span>
                                </label>
                            </div>
                            <div className="form-checkbox">
                                <input
                                    type="checkbox"
                                    id="orderAlerts"
                                    name="orderAlerts"
                                    checked={formData.orderAlerts}
                                    onChange={handleChange}
                                />
                                <label htmlFor="orderAlerts">
                                    <span className="checkbox-title">Order Alerts</span>
                                    <span className="checkbox-desc">Get notified about new orders</span>
                                </label>
                            </div>
                            <div className="form-checkbox">
                                <input
                                    type="checkbox"
                                    id="inventoryAlerts"
                                    name="inventoryAlerts"
                                    checked={formData.inventoryAlerts}
                                    onChange={handleChange}
                                />
                                <label htmlFor="inventoryAlerts">
                                    <span className="checkbox-title">Inventory Alerts</span>
                                    <span className="checkbox-desc">Alert when stock is low</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="settings-actions">
                        <button type="submit" className="btn-primary">
                            Save Changes
                        </button>
                        <button type="button" className="btn-secondary">
                            Cancel
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default AdminSettingsPage;
