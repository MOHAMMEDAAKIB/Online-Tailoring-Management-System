import './BillingNavBar.css';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../../../assets/logo.png';

function BillingNavBar() {
    const location = useLocation();
    
    return (
        <header className="billing-navbar">
            <div className="billing-navbar-brand">
                <div className="billing-navbar-logo">
                    <img src={logo} alt="TailorSwift Logo" style={{width: "40px", height: "40px"}} />
                </div>
                <h2 className="billing-navbar-title">TailorSwift</h2>
            </div>
            <div className="billing-navbar-menu">
                <nav className="billing-navbar-links">
                    <Link className={`billing-navbar-link ${location.pathname === '/customer/dashboard' ? 'active' : ''}`} to="/customer/dashboard">Dashboard</Link>
                    <Link className={`billing-navbar-link ${location.pathname.includes('/customer/orders') ? 'active' : ''}`} to="/customer/orders">My Orders</Link>
                    <Link className={`billing-navbar-link ${location.pathname === '/customer/billing' ? 'active' : ''}`} to="/customer/billing">Billing & Payments</Link>
                    <Link className={`billing-navbar-link ${location.pathname === '/customer/profile' ? 'active' : ''}`} to="/customer/profile">Profile</Link>
                </nav>
                <Link to="/customer/notifications" className="billing-navbar-icon-button">
                    <span className="material-symbols-outlined">notifications</span>
                </Link>
                <Link to="/customer/profile" className="billing-navbar-avatar"></Link>
            </div>
        </header>
    );
}

export default BillingNavBar;
