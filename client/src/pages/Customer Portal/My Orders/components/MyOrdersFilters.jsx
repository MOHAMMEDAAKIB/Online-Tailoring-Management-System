import './MyOrdersFilters.css';

function MyOrdersFilters({ activeFilter, onFilterChange }) {
    const filters = [
        { id: '', label: 'All' },
        { id: 'pending', label: 'Pending' },
        { id: 'in_progress', label: 'In Progress' },
        { id: 'ready', label: 'Ready' },
        { id: 'delivered', label: 'Delivered' }
    ];

    return (
        <div className="my-orders-filters">
            <div className="my-orders-filters-container">
                {filters.map((filter) => (
                    <button
                        key={filter.id}
                        className={`my-orders-filter-button ${activeFilter === filter.id ? 'active' : ''}`}
                        onClick={() => onFilterChange(filter.id)}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default MyOrdersFilters;
