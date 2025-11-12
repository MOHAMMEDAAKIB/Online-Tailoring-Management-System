import { useState } from 'react';
import './NotificationsList.css';

function NotificationsList() {
    const [notifications] = useState([
        {
            id: 1,
            unread: true,
            icon: 'package_2',
            title: 'Your order #TAILOR123 has been shipped!',
            message: 'Your bespoke suit is on its way. You can track the package using the link provided.',
            time: '2 hours ago',
            action: 'Track Package'
        },
        {
            id: 2,
            unread: true,
            icon: 'design_services',
            title: 'A tailor has a question about your measurements',
            message: 'Please review the comments on your profile to ensure a perfect fit.',
            time: '8 hours ago',
            action: 'View Message'
        },
        {
            id: 3,
            unread: false,
            icon: 'credit_card',
            title: 'Payment received for order #TAILOR123',
            message: "We've successfully processed your payment. Thank you for your purchase.",
            time: 'Yesterday',
            action: 'View Invoice'
        },
        {
            id: 4,
            unread: false,
            icon: 'sell',
            title: 'Exclusive Offer: Get 20% off your next suit',
            message: 'A special discount for our valued customers. Use code BESPOKE20 at checkout.',
            time: '3 days ago',
            action: 'Shop Now'
        }
    ]);

    const handleAction = (id, action) => {
        console.log(`Action ${action} clicked for notification ${id}`);
    };

    return (
        <div className="notifications-list">
            <div className="notifications-list-items">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className={`notification-item ${notification.unread ? 'unread' : ''}`}
                    >
                        <div className="notification-item-indicator">
                            {notification.unread && <div className="notification-item-dot"></div>}
                        </div>
                        <div className="notification-item-content">
                            <div className="notification-item-icon">
                                <span className="material-symbols-outlined">{notification.icon}</span>
                            </div>
                            <div className="notification-item-body">
                                <p className="notification-item-title">{notification.title}</p>
                                <p className="notification-item-message">{notification.message}</p>
                                <p className="notification-item-time">{notification.time}</p>
                            </div>
                        </div>
                        <div className="notification-item-action">
                            <button
                                className="notification-item-button"
                                onClick={() => handleAction(notification.id, notification.action)}
                            >
                                {notification.action}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NotificationsList;
