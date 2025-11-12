import './OrderDetailsPage.css';
import OrderDetailsBreadcrumb from './components/OrderDetailsBreadcrumb';
import OrderDetailsHeader from './components/OrderDetailsHeader';
import OrderTimeline from './components/OrderTimeline';
import OrderItems from './components/OrderItems';
import OrderSummary from './components/OrderSummary';
import PaymentBilling from './components/PaymentBilling';
import OrderCommunication from './components/OrderCommunication';

function OrderDetailsPage() {
    return (
        <div className="order-details-page">
            <div className="order-details-container">
                <div className="order-details-content">
                    <OrderDetailsBreadcrumb />
                    <OrderDetailsHeader />
                    <div className="order-details-grid">
                        <div className="order-details-left">
                            <OrderTimeline />
                            <OrderItems />
                        </div>
                        <div className="order-details-right">
                            <OrderSummary />
                            <PaymentBilling />
                            <OrderCommunication />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetailsPage;
