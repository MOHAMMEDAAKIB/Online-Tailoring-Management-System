import './ServicesFeatures.css';

function ServicesFeatures() {
    const features = [
        {
            icon: 'straighten',
            title: 'Master Craftsmanship',
            description: 'Our tailors possess decades of experience and a passion for precision.'
        },
        {
            icon: 'verified',
            title: 'Quality Materials',
            description: 'We source only the finest fabrics and materials for a luxurious feel and lasting durability.'
        },
        {
            icon: 'group',
            title: 'Personalized Service',
            description: "Your style, your needs, your measurements. We're here to listen and create with you."
        },
        {
            icon: 'check_circle',
            title: 'Perfect Fit Guarantee',
            description: "We're not happy until you are. We guarantee a fit that you will love."
        }
    ];

    return (
        <div className="services-features">
            <div className="services-features-header">
                <h1 className="services-features-title">
                    The Perfect Fit, Every Time
                </h1>
                <p className="services-features-subtitle">
                    Why our clients trust us. Discover the difference that true craftsmanship and personalized attention make.
                </p>
            </div>
            <div className="services-features-grid">
                {features.map((feature, index) => (
                    <div key={index} className="feature-card">
                        <div className="feature-card-icon">
                            <span className="material-symbols-outlined">{feature.icon}</span>
                        </div>
                        <div className="feature-card-content">
                            <h2 className="feature-card-title">{feature.title}</h2>
                            <p className="feature-card-description">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ServicesFeatures;
