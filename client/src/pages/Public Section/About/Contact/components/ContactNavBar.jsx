import './ContactNavBar.css';
import logo from '../../../../../assets/logo.png';

function ContactNavBar() {
    return (
        <header className="contact-navbar">
            <div className="contact-navbar-brand">
                <div className="contact-navbar-logo">
                    <img src={logo} alt="TailorSwift Logo" style={{width: "40px", height: "40px"}} />
                </div>
                <h2 className="contact-navbar-title">Bespoke Tailoring</h2>
            </div>
            <nav className="contact-navbar-menu">
                <a className="contact-navbar-link" href="/">Home</a>
                <a className="contact-navbar-link" href="/services">Services</a>
                <a className="contact-navbar-link" href="/gallery">Gallery</a>
                <a className="contact-navbar-link active" href="/contact">About &amp; Contact</a>
            </nav>
            <div className="contact-navbar-buttons">
                <button className="contact-navbar-button contact-navbar-button-primary" onClick={() => window.location.href = "/login"}>
                    <span>Sign In</span>
                </button>
                <button className="contact-navbar-button contact-navbar-button-secondary" onClick={() => window.location.href = "/register"}>
                    <span>Register</span>
                </button>
            </div>
        </header>
    );
}

export default ContactNavBar;
