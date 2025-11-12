import './OrderDetailsBreadcrumb.css';

function OrderDetailsBreadcrumb() {
    return (
        <div className="order-details-breadcrumb">
            <a className="order-details-breadcrumb-link" href="#">Home</a>
            <span className="order-details-breadcrumb-separator">/</span>
            <a className="order-details-breadcrumb-link" href="#">My Orders</a>
            <span className="order-details-breadcrumb-separator">/</span>
            <span className="order-details-breadcrumb-current">Order #TS12345</span>
        </div>
    );
}

export default OrderDetailsBreadcrumb;
