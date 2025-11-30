import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import './AdminNotificationsPage.css';

function AdminNotificationsPage() {
    const [notifications] = useState([
        {
            id: 1,
            type: 'order',
            icon: 'shopping_bag',
            iconBg: '#dbeafe',
            iconColor: '#1e40af',
            title: 'New Order Received',
            message: 'Order #1234 has been placed by John Doe',
            time: '2 minutes ago',
            read: false
        },
        {
            id: 2,
            type: 'payment',
            icon: 'payments',
            iconBg: '#d1fae5',
            iconColor: '#065f46',
            title: 'Payment Confirmed',
            message: 'Payment of $450.00 received for Invoice INV-001',
            time: '1 hour ago',
            read: false
        },
        {
            id: 3,
            type: 'customer',
            icon: 'person_add',
            iconBg: '#fef3c7',
            iconColor: '#92400e',
            title: 'New Customer Registration',
            message: 'Jane Smith has registered as a new customer',
            time: '3 hours ago',
            read: true
        },
        {
            id: 4,
            type: 'inventory',
            icon: 'warning',
            iconBg: '#fee2e2',
            iconColor: '#991b1b',
            title: 'Low Stock Alert',
            message: 'Grey Silk Fabric is running low (12 meters remaining)',
            time: '5 hours ago',
            read: true
        }
    ]);

    const [filter, setFilter] = useState('all');

    const filteredNotifications = notifications.filter(notif => {
        if (filter === 'all') return true;
        if (filter === 'unread') return !notif.read;
        return notif.type === filter;
    });

    return (
        <div className="admin-notifications-page">
            <Sidebar />
            <main className="admin-notifications-main">
                <div className="admin-notifications-header">
                    <h1>Notifications</h1>
                    <button className="btn-secondary">
                        <span className="material-symbols-outlined">done_all</span>
                        Mark All Read
                    </button>
                </div>

                <div className="admin-notifications-filters">
                    <button 
                        className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        All
                    </button>
                    <button 
                        className={`filter-btn ${filter === 'unread' ? 'active' : ''}`}
                        onClick={() => setFilter('unread')}
                    >
                        Unread
                    </button>
                    <button 
                        className={`filter-btn ${filter === 'order' ? 'active' : ''}`}
                        onClick={() => setFilter('order')}
                    >
                        Orders
                    </button>
                    <button 
                        className={`filter-btn ${filter === 'payment' ? 'active' : ''}`}
                        onClick={() => setFilter('payment')}
                    >
                        Payments
                    </button>
                    <button 
                        className={`filter-btn ${filter === 'customer' ? 'active' : ''}`}
                        onClick={() => setFilter('customer')}
                    >
                        Customers
                    </button>
                    <button 
                        className={`filter-btn ${filter === 'inventory' ? 'active' : ''}`}
                        onClick={() => setFilter('inventory')}
                    >
                        Inventory
                    </button>
                </div>

                <div className="admin-notifications-content">
                    <div className="notifications-list">
                        {filteredNotifications.map((notif) => (
                            <div 
                                key={notif.id} 
                                className={`notification-item ${!notif.read ? 'unread' : ''}`}
                            >
                                <div 
                                    className="notification-icon"
                                    style={{
                                        background: notif.iconBg,
                                        color: notif.iconColor
                                    }}
                                >
                                    <span className="material-symbols-outlined">{notif.icon}</span>
                                </div>
                                <div className="notification-content">
                                    <div className="notification-header">
                                        <h3>{notif.title}</h3>
                                        {!notif.read && <span className="unread-badge"></span>}
                                    </div>
                                    <p>{notif.message}</p>
                                    <span className="notification-time">{notif.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AdminNotificationsPage;
