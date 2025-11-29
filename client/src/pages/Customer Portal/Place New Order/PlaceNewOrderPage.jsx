import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../../../api';
import './PlaceNewOrderPage.css';
import PlaceOrderNavBar from './components/PlaceOrderNavBar';
import PlaceOrderHeader from './components/PlaceOrderHeader';
import OrderProgressStepper from './components/OrderProgressStepper';
import GarmentSelection from './components/GarmentSelection';
import OrderNavigation from './components/OrderNavigation';

function PlaceNewOrderPage() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [orderData, setOrderData] = useState({
        items: [],
        deliveryMethod: 'pickup',
        deliveryDate: '',
        notes: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleNext = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleGarmentChange = (items) => {
        setOrderData(prev => ({ ...prev, items }));
    };

    const handleSubmitOrder = async () => {
        try {
            setIsSubmitting(true);
            setError(null);

            // Validate order data
            if (orderData.items.length === 0) {
                setError('Please add at least one item to your order');
                return;
            }

            // Submit order to backend
            const response = await createOrder(orderData);
            const newOrderId = response.data.data.id;

            // Navigate to order details page
            navigate(`/customer/orders/${newOrderId}`);
        } catch (err) {
            console.error('Error creating order:', err);
            setError(err.response?.data?.message || 'Failed to create order. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="place-new-order-page">
            <PlaceOrderNavBar />
            <main className="place-new-order-main">
                <div className="place-new-order-container">
                    <PlaceOrderHeader />
                    <OrderProgressStepper currentStep={currentStep} />
                    
                    {error && (
                        <div className="place-order-error">
                            <span className="material-symbols-outlined">error</span>
                            <p>{error}</p>
                        </div>
                    )}

                    <div className="place-new-order-content">
                        <GarmentSelection 
                            items={orderData.items}
                            onItemsChange={handleGarmentChange}
                            currentStep={currentStep}
                        />
                        <OrderNavigation 
                            currentStep={currentStep}
                            totalSteps={4}
                            onNext={handleNext}
                            onBack={handleBack}
                            onSubmit={handleSubmitOrder}
                            isSubmitting={isSubmitting}
                            canProceed={orderData.items.length > 0}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default PlaceNewOrderPage;
