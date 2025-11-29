import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyOrdersPage.css';
import MyOrdersHeader from './components/MyOrdersHeader';
import MyOrdersSearch from './components/MyOrdersSearch';
import MyOrdersFilters from './components/MyOrdersFilters';
import OrderCard from './components/OrderCard';
import EmptyState from './components/EmptyState';
import Pagination from './components/Pagination';
import { getAllOrders } from '../../../api/orderAPI';

function MyOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        status: '',
        search: '',
        sortBy: 'date',
        page: 1,
        limit: 10
    });
    const [totalOrders, setTotalOrders] = useState(0);
    const navigate = useNavigate();

    // Fetch orders from API
    useEffect(() => {
        fetchOrders();
    }, [filters]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const params = {
                status: filters.status || undefined,
                limit: filters.limit,
                offset: (filters.page - 1) * filters.limit
            };

            const response = await getAllOrders(params);
            if (response.data.success) {
                setOrders(response.data.data.orders);
                setTotalOrders(response.data.data.count);
            }
        } catch (err) {
            console.error('Error fetching orders:', err);
            setError(err.response?.data?.message || 'Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (status) => {
        setFilters(prev => ({ ...prev, status, page: 1 }));
    };

    const handleSearchChange = (search) => {
        setFilters(prev => ({ ...prev, search, page: 1 }));
    };

    const handleSortChange = (sortBy) => {
        setFilters(prev => ({ ...prev, sortBy }));
    };

    const handlePageChange = (page) => {
        setFilters(prev => ({ ...prev, page }));
    };

    const handleViewOrder = (orderId) => {
        navigate(`/customer/orders/${orderId}`);
    };

    if (loading) {
        return (
            <div className="my-orders-page">
                <div className="my-orders-container">
                    <MyOrdersHeader />
                    <div className="loading-state">Loading orders...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="my-orders-page">
                <div className="my-orders-container">
                    <MyOrdersHeader />
                    <div className="error-state">Error: {error}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="my-orders-page">
            <div className="my-orders-container">
                <MyOrdersHeader />
                <MyOrdersSearch 
                    onSearchChange={handleSearchChange}
                    onSortChange={handleSortChange}
                />
                <MyOrdersFilters 
                    activeFilter={filters.status}
                    onFilterChange={handleFilterChange}
                />
                <div className="my-orders-list">
                    {orders.length > 0 ? (
                        <OrderCard 
                            orders={orders}
                            onViewOrder={handleViewOrder}
                        />
                    ) : (
                        <EmptyState />
                    )}
                </div>
                {orders.length > 0 && (
                    <Pagination 
                        currentPage={filters.page}
                        totalItems={totalOrders}
                        itemsPerPage={filters.limit}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
        </div>
    );
}

export default MyOrdersPage;
