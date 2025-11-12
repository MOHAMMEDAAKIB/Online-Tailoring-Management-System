import './naveBar.css';
import logo from '../../../../assets/logo.png'

function NaveBar(){
    
    function signin(){
        console.log("Sign In / Sign Up clicked");
        window.location.href = "/login";
    }
    return(
        <header className="navbar">
            <div className="navbar-brand">
                <div className="navbar-logo">
                    
                    <img src={logo} alt="TailorSwift Logo" className="logo-image"/>
                    
                </div>
                <h2 className="navbar-title">TailorSwift</h2>
            </div>
            <nav className="navbar-menu">
                <a className="navbar-link" href="/services">Services</a>
                <a className="navbar-link" href="#">How It Works</a>
                <a className="navbar-link" href="/gallery">Gallery</a>
                <a className="navbar-link" href="#">Pricing</a>
                <a className="navbar-link" href="/contact">Contact</a>
            </nav>
            <div className="navbar-actions">
                <button className="navbar-button" onClick={signin}>
                    <span>Sign In / Sign Up</span>
                </button>
            </div>
        </header>
    )
}

export default NaveBar