import './TrackOrderPage.css';
import TrackOrderNavBar from './components/TrackOrderNavBar';
import TrackOrderHeader from './components/TrackOrderHeader';
import TrackOrderSearch from './components/TrackOrderSearch';
import TrackOrderStatus from './components/TrackOrderStatus';
import TrackOrderTimeline from './components/TrackOrderTimeline';
import TrackOrderFooter from './components/TrackOrderFooter';
import { useState } from 'react';

function TrackOrderPage() {
    const [orderId, setOrderId] = useState('ABC-12345-XYZ');
    const [showStatus, setShowStatus] = useState(true);

    const handleTrackOrder = (id) => {
        setOrderId(id);
        setShowStatus(true);
    };

    return (
        <div className="track-order-page">
            <TrackOrderNavBar />
            <main className="track-order-main">
                <div className="track-order-content">
                    <TrackOrderHeader />
                    <TrackOrderSearch onTrack={handleTrackOrder} defaultValue={orderId} />
                    {showStatus ? (
                        <div className="track-order-results">
                            <TrackOrderStatus orderId={orderId} />
                            <TrackOrderTimeline />
                        </div>
                    ) : (
                        <div className="track-order-empty">
                            <span className="material-symbols-outlined">search</span>
                            <h3>Track Your Order</h3>
                            <p>Your order status and timeline will appear here once you enter a valid Order ID above.</p>
                        </div>
                    )}
                </div>
            </main>
            <TrackOrderFooter />
        </div>
    );
}

export default TrackOrderPage;
