import { useState } from 'react';
import './GalleryFilters.css';

function GalleryFilters() {
    const [activeFilter, setActiveFilter] = useState('All');

    const filters = ['All', "Men's Wear", "Women's Wear", 'Custom Suits', 'Alterations'];

    return (
        <div className="gallery-filters">
            {filters.map((filter, index) => (
                <button
                    key={index}
                    className={`gallery-filter-button ${activeFilter === filter ? 'active' : 'inactive'}`}
                    onClick={() => setActiveFilter(filter)}
                >
                    <p>{filter}</p>
                </button>
            ))}
        </div>
    );
}

export default GalleryFilters;
