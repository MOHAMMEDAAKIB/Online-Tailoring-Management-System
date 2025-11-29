import './naveBar.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../../assets/logo.png'

function NaveBar(){
    const navigate = useNavigate();
    
    function signin(){
        navigate("/login");
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
                <Link className="navbar-link" to="/services">Services</Link>
                <Link className="navbar-link" to="/gallery">Gallery</Link>
                <Link className="navbar-link" to="/about">About</Link>
                <Link className="navbar-link" to="/contact">Contact</Link>
                <Link className="navbar-link" to="/track-order">Track Order</Link>
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