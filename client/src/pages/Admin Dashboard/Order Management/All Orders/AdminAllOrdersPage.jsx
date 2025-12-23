import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { getAllOrders } from '../../../../api/orderAPI';
import './AdminAllOrdersPage.css';

function AdminAllOrdersPage() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    useEffect(() => {
        fetchOrders();
    }, [statusFilter]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError(null);
            const params = {
                status: statusFilter !== 'All' ? statusFilter.toLowerCase().replace(' ', '_') : undefined,
                limit: 100
            };
            const response = await getAllOrders(params);
            if (response.data.success) {
                setOrders(response.data.data.orders || []);
            }
        } catch (err) {
            console.error('Error fetching orders:', err);
            setError(err.response?.data?.message || 'Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadgeClass = (status) => {
        const statusClasses = {
            'pending': 'status-pending',
            'in_progress': 'status-in-progress',
            'ready': 'status-ready',
            'delivered': 'status-completed',
            'cancelled': 'status-cancelled'
        };
        return statusClasses[status] || '';
    };

    const formatStatus = (status) => {
        return status.replace('_', ' ').split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    const filteredOrders = orders.filter((order) => {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
            order.id?.toString().includes(searchLower) ||
            order.customer_name?.toLowerCase().includes(searchLower) ||
            order.user_id?.toString().includes(searchLower);
        
        const matchesStatus = statusFilter === 'All' || 
            formatStatus(order.status) === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit'
        });
    };

    const formatCurrency = (amount) => {
        return `$${parseFloat(amount || 0).toFixed(2)}`;
    };

    const getItemsSummary = (items) => {
        if (!items || items.length === 0) return 'No items';
        return items.map(item => `${item.quantity}x ${item.garment_type}`).join(', ');
    };

    if (loading) {
        return (
            <div className="admin-all-orders-page">
                <Sidebar />
                <main className="admin-all-orders-main">
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Loading orders...</p>
                    </div>
                </main>
            </div>
        );
    }

    if (error) {
        return (
            <div className="admin-all-orders-page">
                <Sidebar />
                <main className="admin-all-orders-main">
                    <div className="error-state">
                        <span className="material-symbols-outlined">error</span>
                        <h3>Error Loading Orders</h3>
                        <p>{error}</p>
                        <button onClick={fetchOrders}>Retry</button>
                    </div>
                </main>
            </div>
        );
    }

    const handleViewOrder = (orderId) => {
        navigate(`/admin/orders/${orderId}`);
    };

    const handleNewOrder = () => {
        navigate('/admin/orders/new');
    };

    return (
        <div className="admin-all-orders-page">
            <Sidebar />
            <main className="admin-all-orders-main">
                <div className="admin-all-orders-container">
                    {/* Page Header */}
                    <header className="admin-all-orders-header">
                        <h1 className="admin-all-orders-title">All Orders</h1>
                        <div className="admin-all-orders-header-actions">
                            <button className="admin-all-orders-export-btn">
                                <span className="material-symbols-outlined">download</span>
                                <span>Export</span>
                            </button>
                            <button 
                                onClick={handleNewOrder}
                                className="admin-all-orders-new-btn"
                            >
                                <span className="material-symbols-outlined">add</span>
                                <span>New Order</span>
                            </button>
                        </div>
                    </header>

                    <div className="admin-all-orders-content">
                        {/* Search and Filters */}
                        <div className="admin-all-orders-filters">
                            <div className="admin-all-orders-search-wrapper">
                                <span className="material-symbols-outlined">search</span>
                                <input
                                    type="text"
                                    placeholder="Search by Order ID, Customer Name..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="admin-all-orders-search-input"
                                />
                            </div>
                        </div>

                        <div className="admin-all-orders-filter-chips">
                            <button className="admin-all-orders-filter-chip">
                                <span className="material-symbols-outlined">sell</span>
                                <span>Status: {statusFilter}</span>
                                <span className="material-symbols-outlined">expand_more</span>
                            </button>
                            <button className="admin-all-orders-filter-chip">
                                <span className="material-symbols-outlined">calendar_today</span>
                                <span>Date Range: Last 30 Days</span>
                                <span className="material-symbols-outlined">expand_more</span>
                            </button>
                            <button className="admin-all-orders-filter-chip">
                                <span className="material-symbols-outlined">filter_list</span>
                                <span>More Filters</span>
                            </button>
                        </div>

                        {/* Table */}
                        <div className="admin-all-orders-table-wrapper">
                            {loading ? (
                                <div className="admin-all-orders-loading">Loading orders...</div>
                            ) : (
                                <table className="admin-all-orders-table">
                                    <thead>
                                        <tr>
                                            <th>
                                                <input type="checkbox" />
                                            </th>
                                            <th>Order ID</th>
                                            <th>Customer</th>
                                            <th>Items</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                            <th>Order Date</th>
                                            <th>Due Date</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredOrders.map((order) => (
                                            <tr key={order.id}>
                                                <td>
                                                    <input type="checkbox" />
                                                </td>
                                                <td>
                                                    <span className="admin-all-orders-order-id">
                                                        {order.id}
                                                    </span>
                                                </td>
                                                <td className="admin-all-orders-customer">
                                                    {order.customer_name || 'N/A'}
                                                </td>
                                                <td>{getItemsSummary(order.items)}</td>
                                                <td className="admin-all-orders-amount">
                                                    {formatCurrency(order.total)}
                                                </td>
                                                <td>
                                                    <span className={`admin-all-orders-status-badge ${getStatusBadgeClass(order.status)}`}>
                                                        {formatStatus(order.status)}
                                                    </span>
                                                </td>
                                                <td>{formatDate(order.created_at)}</td>
                                                <td>{formatDate(order.delivery_date)}</td>
                                                <td>
                                                    <button
                                                        onClick={() => handleViewOrder(order.id)}
                                                        className="admin-all-orders-view-btn"
                                                    >
                                                        <span className="material-symbols-outlined">visibility</span>
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

export default AdminAllOrdersPage;
