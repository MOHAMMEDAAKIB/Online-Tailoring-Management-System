import './ServicesCTA.css';

function ServicesCTA() {
    return (
        <div className="services-cta">
            <div className="services-cta-content">
                <div className="services-cta-text">
                    <h2 className="services-cta-title">Ready to Create Your Perfect Garment?</h2>
                    <p className="services-cta-subtitle">Let's begin the journey to your ideal wardrobe today.</p>
                </div>
                <div className="services-cta-actions">
                    <a className="services-cta-link" href="#">How It Works</a>
                    <button className="services-cta-button">
                        <span>Get a Free Quote</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ServicesCTA;
