import './HelpSupportPage.css';
import CustomerNavBar from '../Dashboard/components/CustomerNavBar';
import { useAuth } from '../../../context/AuthContext';

function HelpSupportPage() {
    const { user } = useAuth();

    return (
        <div className="help-support-page">
            <CustomerNavBar user={user} />
            <main className="help-support-main">
                <div className="help-support-container">
                    <div className="help-support-header">
                        <h1>Help & Support</h1>
                        <p>We're here to help you with any questions or concerns</p>
                    </div>

                    <div className="help-support-content">
                        <div className="help-section">
                            <h2>Frequently Asked Questions</h2>
                            <div className="faq-list">
                                <details className="faq-item">
                                    <summary>How do I place an order?</summary>
                                    <p>Navigate to "My Orders" and click "Place New Order". Follow the step-by-step process to select your garment type, measurements, and delivery preferences.</p>
                                </details>
                                <details className="faq-item">
                                    <summary>How do I submit my measurements?</summary>
                                    <p>Go to "My Measurements" section and click "Add New Measurement". You can enter your body measurements manually or update existing measurement profiles.</p>
                                </details>
                                <details className="faq-item">
                                    <summary>How can I track my order?</summary>
                                    <p>Visit "My Orders" to view all your orders and their current status. You'll also receive email notifications when your order status changes.</p>
                                </details>
                                <details className="faq-item">
                                    <summary>What payment methods do you accept?</summary>
                                    <p>We accept all major credit/debit cards, PayPal, and bank transfers through our secure payment gateway.</p>
                                </details>
                            </div>
                        </div>

                        <div className="contact-section">
                            <h2>Contact Us</h2>
                            <div className="contact-info">
                                <div className="contact-item">
                                    <span className="material-symbols-outlined">phone</span>
                                    <div>
                                        <h3>Phone</h3>
                                        <p>+1 (555) 123-4567</p>
                                    </div>
                                </div>
                                <div className="contact-item">
                                    <span className="material-symbols-outlined">email</span>
                                    <div>
                                        <h3>Email</h3>
                                        <p>support@tailorswift.com</p>
                                    </div>
                                </div>
                                <div className="contact-item">
                                    <span className="material-symbols-outlined">schedule</span>
                                    <div>
                                        <h3>Business Hours</h3>
                                        <p>Mon-Sat: 9:00 AM - 6:00 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="support-form-section">
                            <h2>Send us a Message</h2>
                            <form className="support-form">
                                <div className="form-group">
                                    <label>Subject</label>
                                    <input type="text" placeholder="Enter subject" />
                                </div>
                                <div className="form-group">
                                    <label>Message</label>
                                    <textarea rows="5" placeholder="Describe your issue or question"></textarea>
                                </div>
                                <button type="submit" className="submit-button">Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default HelpSupportPage;
