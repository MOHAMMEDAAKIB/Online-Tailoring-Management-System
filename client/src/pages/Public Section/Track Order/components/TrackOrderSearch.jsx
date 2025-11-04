import { useState } from 'react';
import './TrackOrderSearch.css';

function TrackOrderSearch({ onTrack, defaultValue = '' }) {
    const [orderId, setOrderId] = useState(defaultValue);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (orderId.trim()) {
            onTrack(orderId);
        }
    };

    return (
        <div className="track-order-search">
            <form className="track-order-search-form" onSubmit={handleSubmit}>
                <div className="track-order-search-input-wrapper">
                    <label className="sr-only" htmlFor="order-id">Order ID</label>
                    <input
                        className="track-order-search-input"
                        id="order-id"
                        type="text"
                        placeholder="Enter your Order ID or Tracking Number"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                    />
                </div>
                <button className="track-order-search-button" type="submit">
                    <span>Track Order</span>
                </button>
            </form>
        </div>
    );
}

export default TrackOrderSearch;
