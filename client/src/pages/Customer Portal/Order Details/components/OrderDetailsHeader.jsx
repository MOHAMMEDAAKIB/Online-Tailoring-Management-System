import './OrderDetailsHeader.css';

function OrderDetailsHeader({ order }) {
    const handleDownloadInvoice = () => {
        // TODO: Implement invoice download using getInvoiceByOrderId API
        console.log('Download invoice for order:', order.id);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="order-details-header">
            <div className="order-details-header-content">
                <h1 className="order-details-header-title">Order Details</h1>
                <p className="order-details-header-subtitle">
                    Order #{order.id} • Placed on {formatDate(order.created_at)}
                </p>
            </div>
            <button className="order-details-header-button" onClick={handleDownloadInvoice}>
                <span className="material-symbols-outlined">download</span>
                <span>Download Invoice</span>
            </button>
        </div>
    );
}

export default OrderDetailsHeader;
