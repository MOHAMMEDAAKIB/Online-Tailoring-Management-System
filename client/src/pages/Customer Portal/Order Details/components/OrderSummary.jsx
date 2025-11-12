import './OrderSummary.css';

function OrderSummary() {
    const summaryData = [
        { label: 'Order Date', value: 'June 1, 2024' },
        { label: 'Est. Completion', value: 'June 15, 2024' },
        { label: 'Delivery Method', value: 'Store Pickup' }
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
