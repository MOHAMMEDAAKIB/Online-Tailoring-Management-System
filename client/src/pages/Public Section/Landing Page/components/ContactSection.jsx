import './ContactSection.css';

function ContactSection() {
    return (
        <section className="contact-section">
            <div className="contact-container">
                <h2 className="contact-title">
                    Get In Touch
                </h2>
                <div className="contact-grid">
                    {/* Contact Form */}
                    <div className="contact-form-section">
                        <h3>Contact Us</h3>
                        <p className="contact-form-description">
                            Have a question or want to start your custom tailoring journey? Send us a message or visit us.
                        </p>
                        <form action="#" className="contact-form">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input 
                                    className="form-input" 
                                    id="name" 
                                    placeholder="Your Name" 
                                    type="text"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input 
                                    className="form-input" 
                                    id="email" 
                                    placeholder="Your Email" 
                                    type="email"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea 
                                    className="form-textarea" 
                                    id="message" 
                                    placeholder="Your Message" 
                                    rows="4"
                                ></textarea>
                            </div>
                            <button 
                                className="submit-button" 
                                type="submit"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Location Information */}
                    <div className="contact-location-section">
                        <h3>Our Location</h3>
                        <div className="location-info">
                            <p className="location-item">
                                <span className="material-symbols-outlined location-icon">location_on</span>
                                123 Fashion Ave, New York, NY 10001
                            </p>
                            <p className="location-item">
                                <span className="material-symbols-outlined location-icon">phone</span>
                                (212) 555-0123
                            </p>
                            <p className="location-item">
                                <span className="material-symbols-outlined location-icon">email</span>
                                contact@tailorswift.com
                            </p>
                        </div>
                        <div className="map-container">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.618645069778!2d-73.99042858459393!3d40.74844097932822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117429%3A0x9a6949c3a9a7a9a!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1676395358055!5m2!1sen!2sus" 
                                width="100%" 
                                height="100%" 
                                className="map-iframe"
                                style={{ border: 0 }} 
                                allowFullScreen="" 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ContactSection;
