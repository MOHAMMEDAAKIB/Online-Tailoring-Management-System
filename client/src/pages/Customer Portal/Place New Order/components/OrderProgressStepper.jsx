import { useState } from 'react';
import './OrderProgressStepper.css';

function OrderProgressStepper() {
    const [currentStep] = useState(1);

    const steps = [
        { id: 1, label: 'Garment' },
        { id: 2, label: 'Measurements' },
        { id: 3, label: 'Fabric' },
        { id: 4, label: 'Delivery' },
        { id: 5, label: 'Review' }
    ];

    const progress = (currentStep / steps.length) * 100;

    return (
        <div className="order-progress-stepper">
            <div className="order-progress-steps">
                {steps.map((step, index) => (
                    <div key={step.id} className="order-progress-step">
                        <span className={`order-progress-step-label ${step.id === currentStep ? 'active' : ''} ${step.id < currentStep ? 'completed' : ''}`}>
                            {step.id}. {step.label}
                        </span>
                    </div>
                ))}
            </div>
            <div className="order-progress-bar-container">
                <div className="order-progress-bar-bg">
                    <div className="order-progress-bar-fill" style={{ width: `${progress}%` }}></div>
                </div>
            </div>
        </div>
    );
}

export default OrderProgressStepper;
