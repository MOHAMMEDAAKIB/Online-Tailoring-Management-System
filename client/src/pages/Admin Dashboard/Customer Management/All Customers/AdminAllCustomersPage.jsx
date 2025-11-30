import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';
import { getAllUsers } from '../../../../api/authAPI';
import './AdminAllCustomersPage.css';

function AdminAllCustomersPage() {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCustomers, setSelectedCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getAllUsers();
            if (response.data.success) {
                // Filter only customers (not admins)
                const customerUsers = response.data.data.filter(user => user.role === 'customer');
                setCustomers(customerUsers);
            }
        } catch (err) {
            console.error('Error fetching customers:', err);
            setError(err.response?.data?.message || 'Failed to load customers');
        } finally {
            setLoading(false);
        }
    };

    const filteredCustomers = customers.filter((c) => {
        const searchLower = searchTerm.toLowerCase();
        return (
            c.name?.toLowerCase().includes(searchLower) ||
            c.email?.toLowerCase().includes(searchLower) ||
            c.phone?.includes(searchTerm)
        );
    });

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedCustomers(filteredCustomers.map(c => c.id));
        } else {
            setSelectedCustomers([]);
        }
    };

    const handleSelectCustomer = (id) => {
        setSelectedCustomers(prev => 
            prev.includes(id) ? prev.filter(cid => cid !== id) : [...prev, id]
        );
    };

    const handleViewCustomer = (id) => {
        navigate(`/admin/customers/${id}`);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="admin-all-customers-page">
                <AdminSidebar />
                <main className="admin-all-customers-main">
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Loading customers...</p>
                    </div>
                </main>
            </div>
        );
    }

    if (error) {
        return (
            <div className="admin-all-customers-page">
                <AdminSidebar />
                <main className="admin-all-customers-main">
                    <div className="error-state">
                        <span className="material-symbols-outlined">error</span>
                        <h3>Error Loading Customers</h3>
                        <p>{error}</p>
                        <button onClick={fetchCustomers}>Retry</button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="admin-all-customers-page">
            <AdminSidebar />
            <main className="admin-all-customers-main">
                <div className="admin-all-customers-container">
                    {/* Page Header */}
                    <header className="admin-all-customers-header">
                        <div>
                            <h1 className="admin-all-customers-title">All Customers</h1>
                            <p className="admin-all-customers-subtitle">
                                Manage, filter, and export your customer list.
                            </p>
                        </div>
                        <div className="admin-all-customers-header-actions">
                            <button className="admin-all-customers-export-btn">
                                <span className="material-symbols-outlined">download</span>
                                <span>Export List</span>
                            </button>
                            <button className="admin-all-customers-add-btn">
                                <span 
                                    className="material-symbols-outlined"
                                    style={{ fontVariationSettings: "'FILL' 1" }}
                                >
                                    add
                                </span>
                                <span>Add New Customer</span>
                            </button>
                        </div>
                    </header>

                    <div className="admin-all-customers-content">
                        {/* Search and Filters */}
                        <div className="admin-all-customers-filters">
                            <div className="admin-all-customers-search-wrapper">
                                <span className="material-symbols-outlined">search</span>
                                <input
                                    type="text"
                                    placeholder="Search customers..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="admin-all-customers-search-input"
                                />
                            </div>
                            <div className="admin-all-customers-filter-chips">
                                <button className="admin-all-customers-filter-chip">
                                    <span className="material-symbols-outlined">filter_list</span>
                                    <span>Filter</span>
                                    <span className="material-symbols-outlined">expand_more</span>
                                </button>
                                <div className="admin-all-customers-active-chip">
                                    <span>Last Order: 30 days</span>
                                    <button>
                                        <span className="material-symbols-outlined">close</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="admin-all-customers-table-wrapper">
                            {loading ? (
                                <div className="admin-all-customers-loading">
                                    Loading customers...
                                </div>
                            ) : (
                                <table className="admin-all-customers-table">
                                    <thead>
                                        <tr>
                                            <th>
                                                <input
                                                    type="checkbox"
                                                    onChange={handleSelectAll}
                                                    checked={selectedCustomers.length === filteredCustomers.length}
                                                />
                                            </th>
                                            <th>Customer</th>
                                            <th>Contact</th>
                                            <th>Total Orders</th>
                                            <th>Last Order</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredCustomers.map((customer) => (
                                            <tr key={customer.id}>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedCustomers.includes(customer.id)}
                                                        onChange={() => handleSelectCustomer(customer.id)}
                                                    />
                                                </td>
                                                <td>
                                                    <div className="admin-all-customers-customer-cell">
                                                        <div className="admin-all-customers-avatar">
                                                            {customer.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <div className="admin-all-customers-name">
                                                                {customer.name}
                                                            </div>
                                                            <div className="admin-all-customers-email">
                                                                {customer.email}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{customer.phone}</td>
                                                <td>
                                                    <span className="admin-all-customers-badge">
                                                        N/A
                                                    </span>
                                                </td>
                                                <td>N/A</td>
                                                <td>
                                                    <button
                                                        onClick={() => handleViewCustomer(customer.id)}
                                                        className="admin-all-customers-view-btn"
                                                    >
                                                        <span className="material-symbols-outlined">visibility</span>
                                                        <span>View</span>
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
            </main>
        </div>
    );
}

export default AdminAllCustomersPage;
