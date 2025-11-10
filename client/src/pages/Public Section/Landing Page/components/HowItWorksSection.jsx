import './HowItWorksSection.css';

function HowItWorksSection() {
    const steps = [
        {
            number: 1,
            title: "Consultation",
            description: "Schedule a virtual or in-person consultation to discuss your needs and get measured."
        },
        {
            number: 2,
            title: "Fabric Selection",
            description: "Choose from our curated collection of high-quality fabrics from around the world."
        },
        {
            number: 3,
            title: "Crafting & Fitting",
            description: "Our master tailors craft your garment. We'll schedule a fitting to ensure a perfect fit."
        },
        {
            number: 4,
            title: "Final Delivery",
            description: "Your bespoke garment is delivered to your doorstep, ready to wear and impress."
        }
    ];

    return (
        <section className="how-it-works-section">
            <div className="how-it-works-container">
                <h2 className="how-it-works-title">
                    How It Works
                </h2>
                <div className="steps-grid">
                    <div className="steps-line-horizontal"></div>
                    <div className="steps-line-vertical"></div>
                    
                    {steps.map((step, index) => (
                        <div key={index} className="step-item">
                            <div className="step-number">
                                {step.number}
                            </div>
                            <h3 className="step-title">
                                {step.title}
                            </h3>
                            <p className="step-description">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default HowItWorksSection;
