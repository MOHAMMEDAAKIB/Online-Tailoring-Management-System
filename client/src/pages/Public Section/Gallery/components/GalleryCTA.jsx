import './GalleryCTA.css';

function GalleryCTA() {
    return (
        <div className="gallery-cta">
            <div className="gallery-cta-wrapper">
                <div className="gallery-cta-content">
                    <h1 className="gallery-cta-title">
                        Ready for a perfect fit?
                    </h1>
                    <p className="gallery-cta-description">
                        Bring your vision to life with our expert tailoring services. Get a free consultation today.
                    </p>
                </div>
                <div className="gallery-cta-button-wrapper">
                    <div className="gallery-cta-button-container">
                        <button className="gallery-cta-button">
                            <span>Request a Custom Design</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GalleryCTA;
