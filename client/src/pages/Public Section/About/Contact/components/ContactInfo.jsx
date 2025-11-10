import './ContactInfo.css';

function ContactInfo() {
    return (
        <div className="contact-info">
            <h2 className="contact-info-title">Our Information</h2>
            <div className="contact-info-list">
                {/* Location */}
                <div className="contact-info-item">
                    <div className="contact-info-icon">
                        <span className="material-symbols-outlined">location_on</span>
                    </div>
                    <div className="contact-info-content">
                        <p className="contact-info-label">Our Location</p>
                        <p className="contact-info-text">123 Savile Row, Mayfair, London, W1S 3PF</p>
                    </div>
                </div>

                {/* Phone */}
                <div className="contact-info-item">
                    <div className="contact-info-icon">
                        <span className="material-symbols-outlined">call</span>
                    </div>
                    <div className="contact-info-content">
                        <p className="contact-info-label">Phone Number</p>
                        <p className="contact-info-text">+44 20 7123 4567</p>
                    </div>
                </div>

                {/* Email */}
                <div className="contact-info-item">
                    <div className="contact-info-icon">
                        <span className="material-symbols-outlined">mail</span>
                    </div>
                    <div className="contact-info-content">
                        <p className="contact-info-label">Email Address</p>
                        <p className="contact-info-text">contact@bespoketailoring.com</p>
                    </div>
                </div>
            </div>

            {/* Map */}
            <div className="contact-info-map">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.167823528245!2d-0.1432187842301824!3d51.51039647963567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604d56353d73b%3A0x4291f31720817588!2sSavile%20Row%2C%20London!5e0!3m2!1sen!2suk!4v1678886543210!5m2!1sen!2suk"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    data-location="London"
                ></iframe>
            </div>
        </div>
    );
}

export default ContactInfo;
