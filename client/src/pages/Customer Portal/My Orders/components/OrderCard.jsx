import { useState } from 'react';
import './OrderCard.css';

function OrderCard() {
    const [orders] = useState([
        {
            id: 'ORD-12345',
            placedDate: 'Oct 15, 2023',
            deliveryDate: 'Nov 8, 2023',
            amount: 450.00,
            items: '1x Custom Suit, 2x Shirts',
            status: 'delivered',
            steps: [
                { label: 'Order Placed', completed: true },
                { label: 'In Progress', completed: true },
                { label: 'Ready', completed: true },
                { label: 'Delivered', completed: true }
            ]
        },
        {
            id: 'ORD-67890',
            placedDate: 'Nov 01, 2023',
            deliveryDate: 'Nov 25, 2023',
            amount: 180.00,
            items: '3x Custom Linen Shirts',
            status: 'in-progress',
            steps: [
                { label: 'Order Placed', completed: true },
                { label: 'In Progress', completed: false, active: true },
                { label: 'Ready', completed: false },
                { label: 'Delivered', completed: false }
            ]
        }
    ]);

    return (
        <>
            {orders.map((order) => (
                <div key={order.id} className="order-card-wrapper">
                    <div className="order-card">
                        <div className="order-card-header">
                            <div className="order-card-header-info">
                                <p className="order-card-id">Order #{order.id}</p>
                                <p className="order-card-date">
                                    Placed: {order.placedDate} - {order.status === 'delivered' ? 'Delivered' : 'Est. Delivery'}: {order.deliveryDate}
                                </p>
                            </div>
                            <p className="order-card-amount">${order.amount.toFixed(2)}</p>
                        </div>

                        <div className="order-card-divider"></div>

                        <div className="order-card-body">
                            <p className="order-card-items">{order.items}</p>

                            {/* Status Timeline */}
                            <div className="order-card-timeline">
                                {order.steps.map((step, index) => (
                                    <div key={index} className="order-card-timeline-item">
                                        <div className="order-card-timeline-step">
                                            <div className={`order-card-timeline-circle ${step.completed ? 'completed' : step.active ? 'active' : 'pending'}`}>
                                                {step.completed && (
                                                    <span className="material-symbols-outlined">check</span>
                                                )}
                                                {step.active && (
                                                    <span className="material-symbols-outlined">progress_activity</span>
                                                )}
                                            </div>
                                            <p className="order-card-timeline-label">{step.label}</p>
                                        </div>
                                        {index < order.steps.length - 1 && (
                                            <div className={`order-card-timeline-connector ${step.completed ? 'completed' : step.active ? 'active' : 'pending'}`}></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="order-card-divider"></div>

                        <div className="order-card-actions">
                            <button className="order-card-button primary">View Details</button>
                            <button className={`order-card-button ${order.status === 'in-progress' ? 'warning' : 'secondary'}`}>
                                Track Order
                            </button>
                            <button className="order-card-button secondary">Contact Tailor</button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default OrderCard;
