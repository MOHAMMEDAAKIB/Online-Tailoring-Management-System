import './GalleryNavBar.css';
import logo from '../../../../assets/Tailaring_Shop_Logo.png';

function GalleryNavBar() {
    return (
        <div className="gallery-navbar-wrapper">
            <div className="gallery-navbar-container">
                <header className="gallery-navbar">
                    <div className="gallery-navbar-brand">
                        <div className="gallery-navbar-logo">
                            <img src={logo} alt="TailorCraft Logo" style={{width: "40px", height: "40px"}}/>
                        </div>
                        <h2 className="gallery-navbar-title">TailorCraft</h2>
                    </div>
                    <div className="gallery-navbar-content">
                        <div className="gallery-navbar-menu">
                            <a className="gallery-navbar-link" href="/">Home</a>
                            <a className="gallery-navbar-link" href="/services">Services</a>
                            <a className="gallery-navbar-link" href="/contact">About</a>
                            <a className="gallery-navbar-link active" href="#">Portfolio</a>
                        </div>
                        <div className="gallery-navbar-buttons">
                            <button className="gallery-navbar-button gallery-navbar-button-primary">
                                <span>Log In</span>
                            </button>
                            <button className="gallery-navbar-button gallery-navbar-button-secondary">
                                <span>Sign Up</span>
                            </button>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    );
}

export default GalleryNavBar;
