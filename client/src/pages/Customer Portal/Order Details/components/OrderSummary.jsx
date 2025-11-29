import './OrderSummary.css';

function OrderSummary({ order }) {
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const summaryData = [
        { label: 'Order Date', value: formatDate(order.created_at) },
        { label: 'Est. Completion', value: formatDate(order.delivery_date) },
        { label: 'Delivery Method', value: order.delivery_method || 'Store Pickup' },
        { label: 'Status', value: order.status.replace('_', ' ').toUpperCase() }
    ];

    return (
        <div className="order-summary-card">
            <h2 className="order-summary-title">Order Summary</h2>
            <div className="order-summary-content">
                {summaryData.map((item, index) => (
                    <div key={index} className="order-summary-row">
                        <p className="order-summary-label">{item.label}</p>
                        <p className="order-summary-value">{item.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OrderSummary;
