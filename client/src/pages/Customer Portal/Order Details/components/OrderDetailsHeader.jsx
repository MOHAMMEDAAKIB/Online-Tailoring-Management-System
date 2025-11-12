import './OrderDetailsHeader.css';

function OrderDetailsHeader() {
    const handleDownloadInvoice = () => {
        console.log('Download invoice');
    };

    return (
        <div className="order-details-header">
            <div className="order-details-header-content">
                <h1 className="order-details-header-title">Order Details</h1>
                <p className="order-details-header-subtitle">Order #TS12345</p>
            </div>
            <button className="order-details-header-button" onClick={handleDownloadInvoice}>
                <span className="material-symbols-outlined">download</span>
                <span>Download Invoice</span>
            </button>
        </div>
    );
}

export default OrderDetailsHeader;
