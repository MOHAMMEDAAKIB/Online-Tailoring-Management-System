import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import './AdminInventoryPage.css';

function AdminInventoryPage() {
    const [inventory] = useState([
        {
            id: 1,
            name: 'Navy Blue Wool Fabric',
            category: 'Fabric',
            quantity: 45,
            unit: 'meters',
            reorderLevel: 20,
            status: 'in-stock'
        },
        {
            id: 2,
            name: 'Buttons (Black)',
            category: 'Accessories',
            quantity: 250,
            unit: 'pieces',
            reorderLevel: 100,
            status: 'in-stock'
        },
        {
            id: 3,
            name: 'Grey Silk Fabric',
            category: 'Fabric',
            quantity: 12,
            unit: 'meters',
            reorderLevel: 15,
            status: 'low-stock'
        },
        {
            id: 4,
            name: 'Zipper (15cm)',
            category: 'Accessories',
            quantity: 5,
            unit: 'pieces',
            reorderLevel: 20,
            status: 'critical'
        }
    ]);

    const getStatusClass = (status) => {
        const classes = {
            'in-stock': 'status-in-stock',
            'low-stock': 'status-low-stock',
            'critical': 'status-critical',
            'out-of-stock': 'status-out-of-stock'
        };
        return classes[status] || '';
    };

    const getStatusLabel = (status) => {
        return status.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    return (
        <div className="admin-inventory-page">
            <Sidebar />
            <main className="admin-inventory-main">
                <div className="admin-inventory-header">
                    <h1>Inventory Management</h1>
                    <button className="btn-primary">
                        <span className="material-symbols-outlined">add</span>
                        Add Item
                    </button>
                </div>

                <div className="admin-inventory-stats">
                    <div className="stat-card">
                        <span className="stat-icon" style={{background: '#dbeafe', color: '#1e40af'}}>
                            <span className="material-symbols-outlined">inventory_2</span>
                        </span>
                        <div className="stat-info">
                            <span className="stat-label">Total Items</span>
                            <span className="stat-value">312</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <span className="stat-icon" style={{background: '#fef3c7', color: '#92400e'}}>
                            <span className="material-symbols-outlined">warning</span>
                        </span>
                        <div className="stat-info">
                            <span className="stat-label">Low Stock</span>
                            <span className="stat-value">8</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <span className="stat-icon" style={{background: '#fee2e2', color: '#991b1b'}}>
                            <span className="material-symbols-outlined">priority_high</span>
                        </span>
                        <div className="stat-info">
                            <span className="stat-label">Critical</span>
                            <span className="stat-value">3</span>
                        </div>
                    </div>
                </div>

                <div className="admin-inventory-content">
                    <div className="inventory-table-wrapper">
                        <table className="inventory-table">
                            <thead>
                                <tr>
                                    <th>Item Name</th>
                                    <th>Category</th>
                                    <th>Quantity</th>
                                    <th>Unit</th>
                                    <th>Reorder Level</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inventory.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{item.category}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.unit}</td>
                                        <td>{item.reorderLevel}</td>
                                        <td>
                                            <span className={`status-badge ${getStatusClass(item.status)}`}>
                                                {getStatusLabel(item.status)}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="btn-icon">
                                                <span className="material-symbols-outlined">edit</span>
                                            </button>
                                            <button className="btn-icon">
                                                <span className="material-symbols-outlined">add_circle</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AdminInventoryPage;
