import './ServicesNavBar.css';
import logo from '../../../../assets/logo.png';

function ServicesNavBar() {
    return (
        <header className="services-navbar">
            <div className="services-navbar-brand">
                <div className="services-navbar-logo">
                    <img src={logo} alt="TailorSwift Logo" style={{width: "40px", height: "40px"}} />
                </div>
                <h2 className="services-navbar-title">TailorSwift</h2>
            </div>
            <div className="services-navbar-menu-wrapper">
                <div className="services-navbar-menu">
                    <a className="services-navbar-link" href="/">Home</a>
                    <a className="services-navbar-link active" href="/services">Services</a>
                    <a className="services-navbar-link" href="/contact">About</a>
                    <a className="services-navbar-link" href="/contact">Contact</a>
                </div>
                <button className="services-navbar-button" onClick={() => window.location.href = "/login"}>
                    <span>Log In / Sign Up</span>
                </button>
            </div>
        </header>
    );
}

export default ServicesNavBar;
