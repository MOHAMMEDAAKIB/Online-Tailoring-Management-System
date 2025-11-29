import './PlaceOrderNavBar.css';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../../../assets/logo.png';

function PlaceOrderNavBar() {
    const location = useLocation();
    
    return (
        <header className="place-order-navbar">
            <div className="place-order-navbar-brand">
                <div className="place-order-navbar-logo">
                    <img src={logo} alt="TailorSwift Logo" style={{width: "40px", height: "40px"}} />
                </div>
                <h2 className="place-order-navbar-title">TailorSwift</h2>
            </div>
            <div className="place-order-navbar-menu">
                <div className="place-order-navbar-links">
                    <Link className={`place-order-navbar-link ${location.pathname === '/customer/dashboard' ? 'active' : ''}`} to="/customer/dashboard">Dashboard</Link>
                    <Link className={`place-order-navbar-link ${location.pathname.includes('/customer/orders') ? 'active' : ''}`} to="/customer/orders">My Orders</Link>
                    <Link className={`place-order-navbar-link ${location.pathname.includes('/customer/measurements') ? 'active' : ''}`} to="/customer/measurements">Measurements</Link>
                    <Link className={`place-order-navbar-link ${location.pathname === '/customer/profile' ? 'active' : ''}`} to="/customer/profile">Profile</Link>
                </div>
                <div className="place-order-navbar-actions">
                    <Link to="/customer/notifications" className="place-order-navbar-icon-button">
                        <span className="material-symbols-outlined">notifications</span>
                    </Link>
                    <Link to="/customer/help" className="place-order-navbar-icon-button">
                        <span className="material-symbols-outlined">help</span>
                    </Link>
                </div>
                <Link to="/customer/profile" className="place-order-navbar-avatar"></Link>
            </div>
        </header>
    );
}

export default PlaceOrderNavBar;
