import './Sidebar.css';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.png';

function Sidebar() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { icon: 'dashboard', label: 'Dashboard', active: true },
        { icon: 'shopping_bag', label: 'Orders', active: false },
        { icon: 'group', label: 'Customers', active: false },
        { icon: 'settings', label: 'Settings', active: false }
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-content">
                <div className="sidebar-top">
                    {/* Logo & Brand */}
                    <div className="sidebar-brand">
                        <div className="sidebar-logo">
                            <img src={logo} alt="TailorSwift Logo" style={{width: "40px", height: "40px"}} />
                        </div>
                        <div className="sidebar-brand-text">
                            <h1 className="sidebar-title">TailorGo</h1>
                            <p className="sidebar-subtitle">Admin Panel</p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="sidebar-nav">
                        {navItems.map((item, index) => (
                            <a
                                key={index}
                                href="#"
                                className={`sidebar-nav-item ${item.active ? 'active' : ''}`}
                            >
                                <span className="material-symbols-outlined">{item.icon}</span>
                                <p className="sidebar-nav-label">{item.label}</p>
                            </a>
                        ))}
                    </nav>
                </div>

                {/* Logout */}
                <div className="sidebar-bottom">
                    <a href="#" className="sidebar-nav-item" onClick={(e) => {
                        e.preventDefault();
                        handleLogout();
                    }}>
                        <span className="material-symbols-outlined">logout</span>
                        <p className="sidebar-nav-label">Logout</p>
                    </a>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
