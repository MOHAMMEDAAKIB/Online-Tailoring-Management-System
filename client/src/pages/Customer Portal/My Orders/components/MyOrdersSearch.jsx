import { useState } from 'react';
import './MyOrdersSearch.css';

function MyOrdersSearch({ onSearchChange, onSortChange }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('date');

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        onSearchChange(value);
    };

    const handleSortChange = (e) => {
        const value = e.target.value;
        setSortBy(value);
        onSortChange(value);
    };

    return (
        <div className="my-orders-search">
            <div className="my-orders-search-row">
                <div className="my-orders-search-field-wrapper">
                    <label className="my-orders-search-field">
                        <div className="my-orders-search-input-wrapper">
                            <div className="my-orders-search-icon">
                                <span className="material-symbols-outlined">search</span>
                            </div>
                            <input
                                className="my-orders-search-input"
                                type="text"
                                placeholder="Search by Order ID or item name..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </label>
                </div>
                <div className="my-orders-search-select-wrapper">
                    <select
                        className="my-orders-search-select"
                        value={sortBy}
                        onChange={handleSortChange}
                    >
                        <option value="date">Sort by: Date</option>
                        <option value="amount">Sort by: Amount</option>
                        <option value="status">Sort by: Status</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default MyOrdersSearch;
