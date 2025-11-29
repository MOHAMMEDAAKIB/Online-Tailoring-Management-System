import './MyMeasurementsNavBar.css';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../../../assets/logo.png';

function MyMeasurementsNavBar() {
    const location = useLocation();
    
    return (
        <header className="my-measurements-navbar">
            <div className="my-measurements-navbar-content">
                <Link to="/customer/dashboard" className="my-measurements-navbar-brand">
                    <div className="my-measurements-navbar-logo">
                        <img src={logo} alt="TailorSwift Logo" style={{width: "40px", height: "40px"}} />
                    </div>
                    <h2 className="my-measurements-navbar-title">TailorSwift</h2>
                </Link>
                <div className="my-measurements-navbar-actions">
                    <nav className="my-measurements-navbar-nav">
                        <Link className={`my-measurements-navbar-link ${location.pathname === '/customer/dashboard' ? 'active' : ''}`} to="/customer/dashboard">Dashboard</Link>
                        <Link className={`my-measurements-navbar-link ${location.pathname.includes('/customer/orders') ? 'active' : ''}`} to="/customer/orders">My Orders</Link>
                        <Link className={`my-measurements-navbar-link ${location.pathname.includes('/customer/measurements') ? 'active' : ''}`} to="/customer/measurements">My Measurements</Link>
                        <Link className={`my-measurements-navbar-link ${location.pathname === '/customer/profile' ? 'active' : ''}`} to="/customer/profile">Profile</Link>
                    </nav>
                    <Link to="/customer/notifications" className="my-measurements-navbar-button" style={{textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                        <span className="material-symbols-outlined">notifications</span>
                    </Link>
                    <Link to="/customer/profile"
                        className="my-measurements-navbar-avatar"
                        style={{
                            backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBqbKMM3tEblsLdnTCLyNO3E4p_U91-wji-6838pU-IZuI2H_yEnq9yUxcxVLtcj5ZkXdK4KLMfDU_GlHWTyHs6JkyZQTBOveBXTE6vp3oWnRS7ln3nPRTpCfPWDkduiqx-6OU4EpXTGHL-9g3DqpmhGCYtNavbUKlGDUqxFkDgJA2wKbxli_Lqqo1ryp82WVPuF-0NS3iB9ZjFj0aLTr3p4Xv68c3D948hBeOEBtBqrTOvy1RheUdA-_DnOJJMNB2tbC6e5TrUxpFA")'
                        }}
                        role="img"
                        aria-label="User avatar"
                    />
                </div>
            </div>
        </header>
    );
}

export default MyMeasurementsNavBar;
