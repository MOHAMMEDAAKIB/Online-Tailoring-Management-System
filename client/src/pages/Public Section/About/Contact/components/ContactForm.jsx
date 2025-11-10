import { useState } from 'react';
import './ContactForm.css';

function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
        // Reset form after submission
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
    };

    return (
        <div className="contact-form-wrapper">
            <h2 className="contact-form-title">Send Us a Message</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
                {/* Name Field */}
                <div className="contact-form-field">
                    <label className="contact-form-label" htmlFor="name">Your Name</label>
                    <input
                        className="contact-form-input"
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Email Field */}
                <div className="contact-form-field">
                    <label className="contact-form-label" htmlFor="email">Your Email</label>
                    <input
                        className="contact-form-input"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john.doe@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Subject Field */}
                <div className="contact-form-field">
                    <label className="contact-form-label" htmlFor="subject">Subject</label>
                    <input
                        className="contact-form-input"
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="Inquiry about a custom suit"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Message Field */}
                <div className="contact-form-field">
                    <label className="contact-form-label" htmlFor="message">Your Message</label>
                    <textarea
                        className="contact-form-textarea"
                        id="message"
                        name="message"
                        rows="5"
                        placeholder="Please type your message here..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                {/* Submit Button */}
                <button className="contact-form-button" type="submit">
                    <span>Send Message</span>
                </button>
            </form>
        </div>
    );
}

export default ContactForm;
