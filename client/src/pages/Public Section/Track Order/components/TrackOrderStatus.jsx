import './TrackOrderStatus.css';

function TrackOrderStatus({ orderId }) {
    return (
        <section className="track-order-status-section">
            <h2 className="track-order-status-heading">Status for Order #{orderId}</h2>
            <div className="track-order-status-card">
                <div className="track-order-status-info">
                    <div className="track-order-status-item">
                        <p className="track-order-status-label">Item</p>
                        <p className="track-order-status-value">Custom Two-Piece Suit</p>
                    </div>
                    <div className="track-order-status-item">
                        <p className="track-order-status-label">Estimated Completion</p>
                        <p className="track-order-status-value">October 26, 2023</p>
                    </div>
                    <div className="track-order-status-item">
                        <p className="track-order-status-label">Current Status</p>
                        <div className="track-order-status-badge">
                            <span className="track-order-status-badge-dot"></span>
                            In Progress
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TrackOrderStatus;
