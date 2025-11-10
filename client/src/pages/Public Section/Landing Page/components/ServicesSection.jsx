import './ServicesSection.css';

function ServicesSection() {
    const services = [
        {
            icon: "styler",
            title: "Bespoke Suits",
            description: "Perfectly tailored suits for any occasion, crafted to your exact measurements."
        },
        {
            icon: "apparel",
            title: "Shirt Making",
            description: "Custom-fit shirts from the finest fabrics for ultimate comfort and style."
        },
        {
            icon: "cut",
            title: "Alterations & Repairs",
            description: "Expert alterations to ensure your garments fit you flawlessly."
        },
        {
            icon: "diamond",
            title: "Wedding & Formal Wear",
            description: "Stunning attire for your special day, designed to make you shine."
        }
    ];

    return (
        <section className="services-section">
            <div className="services-container">
                <h2 className="services-title">
                    Our Services
                </h2>
                <div className="services-grid">
                    {services.map((service, index) => (
                        <div key={index} className="service-card">
                            <span className="material-symbols-outlined service-icon">
                                {service.icon}
                            </span>
                            <div className="service-text">
                                <h3 className="service-card-title">
                                    {service.title}
                                </h3>
                                <p className="service-card-description">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ServicesSection;
