import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderById } from '../../../api';
import './OrderDetailsPage.css';
import OrderDetailsBreadcrumb from './components/OrderDetailsBreadcrumb';
import OrderDetailsHeader from './components/OrderDetailsHeader';
import OrderTimeline from './components/OrderTimeline';
import OrderItems from './components/OrderItems';
import OrderSummary from './components/OrderSummary';
import PaymentBilling from './components/PaymentBilling';
import OrderCommunication from './components/OrderCommunication';

function OrderDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchOrderDetails();
    }, [id]);

    const fetchOrderDetails = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getOrderById(id);
            setOrder(response.data.data);
        } catch (err) {
            console.error('Error fetching order details:', err);
            setError(err.response?.data?.message || 'Failed to load order details');
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        navigate('/customer/orders');
    };

    if (loading) {
        return (
            <div className="order-details-page">
                <div className="order-details-container">
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Loading order details...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="order-details-page">
                <div className="order-details-container">
                    <div className="error-state">
                        <span className="material-symbols-outlined">error</span>
                        <h3>Error Loading Order</h3>
                        <p>{error}</p>
                        <button onClick={handleBack} className="back-button">
                            Back to Orders
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="order-details-page">
                <div className="order-details-container">
                    <div className="error-state">
                        <span className="material-symbols-outlined">inbox</span>
                        <h3>Order Not Found</h3>
                        <button onClick={handleBack} className="back-button">
                            Back to Orders
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="order-details-page">
            <div className="order-details-container">
                <div className="order-details-content">
                    <OrderDetailsBreadcrumb orderId={order.id} />
                    <OrderDetailsHeader order={order} />
                    <div className="order-details-grid">
                        <div className="order-details-left">
                            <OrderTimeline status={order.status} timeline={order.timeline} />
                            <OrderItems items={order.items || []} />
                        </div>
                        <div className="order-details-right">
                            <OrderSummary order={order} />
                            <PaymentBilling order={order} />
                            <OrderCommunication orderId={order.id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetailsPage;
