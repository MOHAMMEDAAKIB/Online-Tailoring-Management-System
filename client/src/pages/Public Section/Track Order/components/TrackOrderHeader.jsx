import './TrackOrderHeader.css';

function TrackOrderHeader() {
    return (
        <section className="track-order-header">
            <div className="track-order-header-content">
                <h1 className="track-order-header-title">Track Your Bespoke Garment</h1>
                <p className="track-order-header-subtitle">
                    Enter your Order ID below to see the current status and progress of your item.
                </p>
            </div>
        </section>
    );
}

export default TrackOrderHeader;
