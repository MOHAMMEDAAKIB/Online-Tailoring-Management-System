import './OrderDetailsBreadcrumb.css';
import { Link } from 'react-router-dom';

function OrderDetailsBreadcrumb({ orderId }) {
    return (
        <div className="order-details-breadcrumb">
            <Link className="order-details-breadcrumb-link" to="/customer/dashboard">Home</Link>
            <span className="order-details-breadcrumb-separator">/</span>
            <Link className="order-details-breadcrumb-link" to="/customer/orders">My Orders</Link>
            <span className="order-details-breadcrumb-separator">/</span>
            <span className="order-details-breadcrumb-current">Order #{orderId}</span>
        </div>
    );
}

export default OrderDetailsBreadcrumb;
