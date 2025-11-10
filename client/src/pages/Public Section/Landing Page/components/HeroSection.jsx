import './HeroSection.css';

function HeroSection() {
    function tugletoSignin(){
        window.location.href = "/login";
    }

    function tugletoServices(){
        window.location.href = "/services";
    }
    return (
        <section className="hero-section">
            <div className="hero-wrapper">
                <div 
                    className="hero-content" 
                    style={{
                        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBMxcF2cjwrvuQaS0eeODe_DSX8MesT-G2F5V3G1p-zYo9kzwgeS3A-jvmTqw6nFoPuN0yi-ECucpfXnshyZmcR-ZROlFo7Q3W1gZpmoGJNnzg-fGxK7ieDWMFJyFtH8U32sYoaa5H516U8iriQ7n1KbCVYCerzl5vAf1wGUSpYxjGJ3mUhzz-PqpZCoCBmo9O-uuTTrH-UI6AmQUOMA9RonfV3-SfXM6TC6lgioCIaA2AmiKC1qLuvbak9yBk52G8mH4EHZ2MpKZk5")'
                    }}
                >
                    <div className="hero-text-container">
                        <h1 className="hero-title">
                            Custom Tailoring, Perfectly Fitted
                        </h1>
                        <h2 className="hero-subtitle">
                            Experience bespoke clothing crafted with precision, delivered to your door.
                        </h2>
                    </div>
                    <div className="hero-buttons">
                        <button className="hero-button hero-button-primary" onClick={tugletoSignin}>
                            <span>Get Started</span>
                        </button>
                        <button className="hero-button hero-button-secondary" onClick={tugletoServices}>
                            <span>View Services</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
