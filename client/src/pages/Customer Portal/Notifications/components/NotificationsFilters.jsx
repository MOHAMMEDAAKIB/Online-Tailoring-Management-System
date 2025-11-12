import { useState } from 'react';
import './NotificationsFilters.css';

function NotificationsFilters() {
    const [activeFilter, setActiveFilter] = useState('all');

    const filters = [
        { id: 'all', label: 'All', icon: 'list' },
        { id: 'orders', label: 'Order Updates', icon: 'package_2' },
        { id: 'payments', label: 'Payments', icon: 'credit_card' },
        { id: 'promotions', label: 'Promotions', icon: 'sell' }
    ];

    return (
        <div className="notifications-filters">
            <div className="notifications-filters-container">
                {filters.map((filter) => (
                    <button
                        key={filter.id}
                        className={`notifications-filter-button ${activeFilter === filter.id ? 'active' : ''}`}
                        onClick={() => setActiveFilter(filter.id)}
                    >
                        <span className="material-symbols-outlined">{filter.icon}</span>
                        <p>{filter.label}</p>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default NotificationsFilters;
