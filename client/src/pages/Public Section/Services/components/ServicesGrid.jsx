import './ServicesGrid.css';

function ServicesGrid() {
    const services = [
        {
            icon: 'man',
            title: "Men's Wear",
            description: "Perfectly fitted suits, shirts, and trousers for every occasion, crafted with precision and style."
        },
        {
            icon: 'woman',
            title: "Women's Wear",
            description: "Elegant dresses, blouses, and skirts tailored to your exact measurements for a flawless silhouette."
        },
        {
            icon: 'content_cut',
            title: 'Alterations & Repairs',
            description: "Professional resizing, mending, and adjustments to give your favorite garments a new lease on life."
        },
        {
            icon: 'design_services',
            title: 'Custom Design',
            description: "From wedding attire to unique creations, we collaborate with you to bring your sartorial vision to life."
        }
    ];

    return (
        <div className="services-grid-section">
            <h2 className="services-grid-title">Our Services</h2>
            <div className="services-grid">
                {services.map((service, index) => (
                    <div key={index} className="service-card">
                        <div className="service-card-icon">
                            <span className="material-symbols-outlined">{service.icon}</span>
                        </div>
                        <div className="service-card-content">
                            <h3 className="service-card-title">{service.title}</h3>
                            <p className="service-card-description">{service.description}</p>
                        </div>
                        <button className="service-card-button">
                            <span>Learn More</span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ServicesGrid;
