import './PlaceNewOrderPage.css';
import PlaceOrderNavBar from './components/PlaceOrderNavBar';
import PlaceOrderHeader from './components/PlaceOrderHeader';
import OrderProgressStepper from './components/OrderProgressStepper';
import GarmentSelection from './components/GarmentSelection';
import OrderNavigation from './components/OrderNavigation';

function PlaceNewOrderPage() {
    return (
        <div className="place-new-order-page">
            <PlaceOrderNavBar />
            <main className="place-new-order-main">
                <div className="place-new-order-container">
                    <PlaceOrderHeader />
                    <OrderProgressStepper />
                    <div className="place-new-order-content">
                        <GarmentSelection />
                        <OrderNavigation />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default PlaceNewOrderPage;
