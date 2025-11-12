import { useState } from 'react';
import './MyOrdersFilters.css';

function MyOrdersFilters() {
    const [activeFilter, setActiveFilter] = useState('all');

    const filters = [
        { id: 'all', label: 'All' },
        { id: 'pending', label: 'Pending' },
        { id: 'in-progress', label: 'In Progress' },
        { id: 'ready', label: 'Ready' },
        { id: 'completed', label: 'Completed' }
    ];

    return (
        <div className="my-orders-filters">
            <div className="my-orders-filters-container">
                {filters.map((filter) => (
                    <button
                        key={filter.id}
                        className={`my-orders-filter-button ${activeFilter === filter.id ? 'active' : ''}`}
                        onClick={() => setActiveFilter(filter.id)}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default MyOrdersFilters;
