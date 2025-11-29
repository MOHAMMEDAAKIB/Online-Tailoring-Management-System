import './CustomerNavBar.css';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../../../assets/logo.png';

function CustomerNavBar({ user }) {
    const location = useLocation();
    
    return (
        <header className="customer-navbar">
            <div className="customer-navbar-brand">
                <div className="customer-navbar-logo">
                    <img src={logo} alt="TailorSwift Logo" style={{width: "40px", height: "40px"}} />
                </div>
                <h2 className="customer-navbar-title">TailorSwift</h2>
            </div>
            <div className="customer-navbar-menu">
                <Link className={`customer-navbar-link ${location.pathname === '/customer/dashboard' ? 'active' : ''}`} to="/customer/dashboard">Dashboard</Link>
                <Link className={`customer-navbar-link ${location.pathname.includes('/customer/orders') ? 'active' : ''}`} to="/customer/orders">My Orders</Link>
                <Link className={`customer-navbar-link ${location.pathname.includes('/customer/measurements') ? 'active' : ''}`} to="/customer/measurements">Measurements</Link>
                <Link className={`customer-navbar-link ${location.pathname === '/customer/profile' ? 'active' : ''}`} to="/customer/profile">Profile</Link>
            </div>
            <div className="customer-navbar-actions">
                <Link to="/customer/notifications" className="customer-navbar-notification" aria-label="Notifications">
                    <span className="material-symbols-outlined">notifications</span>
                </Link>
                <Link to="/customer/profile"
                    className="customer-navbar-avatar"
                    style={{
                        backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB4qnjJX1AiSX1skchcya9ugTa57zqPi71aU9-fabUNSHVkWMRM6upf4KDLenrBmmAiVg_ub226lWgPAB59L7IiaUeAG1EPZpngmu5xDQMGPkzhCuZVy-IPmC89TeBw55MKoqWfrY_eqnFBr2KqvaNvC5yQF2_dykhP2drJkuFBkjxE27XABlWkLSqkTJn1xOXiKR7OrdMJpW8yyhAgztJbBuZRUesEZc_RCcKkwKa6g4XU745-Yi-QZNbhJijKBnmCrC449imrJ2-b")'
                    }}
                    role="img"
                    aria-label="User avatar"
                />
            </div>
        </header>
    );
}

export default CustomerNavBar;
