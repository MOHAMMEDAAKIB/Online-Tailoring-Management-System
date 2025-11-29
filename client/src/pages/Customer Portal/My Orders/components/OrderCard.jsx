import './OrderCard.css';

function OrderCard({ orders, onViewOrder }) {
    const getStatusSteps = (status) => {
        const allSteps = [
            { label: 'Order Placed', key: 'pending' },
            { label: 'In Progress', key: 'in_progress' },
            { label: 'Ready', key: 'ready' },
            { label: 'Delivered', key: 'delivered' }
        ];

        const statusOrder = ['pending', 'in_progress', 'ready', 'delivered'];
        const currentIndex = statusOrder.indexOf(status);

        return allSteps.map((step, index) => ({
            label: step.label,
            completed: index < currentIndex,
            active: index === currentIndex,
            pending: index > currentIndex
        }));
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        });
    };

    const formatCurrency = (amount) => {
        return `$${parseFloat(amount).toFixed(2)}`;
    };

    return (
        <>
            {orders.map((order) => {
                const steps = getStatusSteps(order.status);
                const items = order.items || [];
                const itemsText = items.length > 0 
                    ? items.map(item => `${item.quantity}x ${item.garment_type}`).join(', ')
                    : 'No items';

                return (
                    <div key={order.id} className="order-card-wrapper">
                        <div className="order-card">
                            <div className="order-card-header">
                                <div className="order-card-header-info">
                                    <p className="order-card-id">Order #{order.id}</p>
                                    <p className="order-card-date">
                                        Placed: {formatDate(order.created_at)} 
                                        {order.delivery_date && ` - Est. Delivery: ${formatDate(order.delivery_date)}`}
                                    </p>
                                </div>
                                <p className="order-card-amount">{formatCurrency(order.total)}</p>
                            </div>

                            <div className="order-card-divider"></div>

                            <div className="order-card-body">
                                <p className="order-card-items">{itemsText}</p>

                                {/* Status Timeline */}
                                <div className="order-card-timeline">
                                    {steps.map((step, index) => (
                                        <div key={index} className="order-card-timeline-item">
                                            <div className="order-card-timeline-step">
                                                <div className={`order-card-timeline-circle ${step.completed ? 'completed' : step.active ? 'active' : 'pending'}`}>
                                                    {step.completed && (
                                                        <span className="material-symbols-outlined">check</span>
                                                    )}
                                                    {step.active && (
                                                        <span className="material-symbols-outlined">progress_activity</span>
                                                    )}
                                                </div>
                                                <p className="order-card-timeline-label">{step.label}</p>
                                            </div>
                                            {index < steps.length - 1 && (
                                                <div className={`order-card-timeline-connector ${step.completed ? 'completed' : step.active ? 'active' : 'pending'}`}></div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="order-card-divider"></div>

                            <div className="order-card-actions">
                                <button 
                                    className="order-card-button primary"
                                    onClick={() => onViewOrder(order.id)}
                                >
                                    View Details
                                </button>
                                <button className={`order-card-button ${order.status === 'in_progress' ? 'warning' : 'secondary'}`}>
                                    Track Order
                                </button>
                                <button className="order-card-button secondary">Contact Tailor</button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}

export default OrderCard;
