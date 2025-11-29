import './Sidebar.css';
import { useAuth } from '../../../context/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../../assets/logo.png';

function Sidebar() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { icon: 'dashboard', label: 'Dashboard', path: '/admin/dashboard' },
        { icon: 'shopping_bag', label: 'Orders', path: '/admin/orders' },
        { icon: 'group', label: 'Customers', path: '/admin/customers' },
        { icon: 'straighten', label: 'Measurements', path: '/admin/measurements' },
        { icon: 'receipt_long', label: 'Invoices', path: '/admin/invoices' },
        { icon: 'payments', label: 'Payments', path: '/admin/payments' },
        { icon: 'assessment', label: 'Reports', path: '/admin/reports' },
        { icon: 'inventory_2', label: 'Inventory', path: '/admin/inventory' },
        { icon: 'notifications', label: 'Notifications', path: '/admin/notifications' },
        { icon: 'settings', label: 'Settings', path: '/admin/settings' }
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-content">
                <div className="sidebar-top">
                    {/* Logo & Brand */}
                    <Link to="/admin/dashboard" className="sidebar-brand">
                        <div className="sidebar-logo">
                            <img src={logo} alt="TailorSwift Logo" style={{width: "40px", height: "40px"}} />
                        </div>
                        <div className="sidebar-brand-text">
                            <h1 className="sidebar-title">TailorSwift</h1>
                            <p className="sidebar-subtitle">Admin Panel</p>
                        </div>
                    </Link>

                    {/* Navigation */}
                    <nav className="sidebar-nav">
                        {navItems.map((item, index) => (
                            <Link
                                key={index}
                                to={item.path}
                                className={`sidebar-nav-item ${location.pathname === item.path ? 'active' : ''}`}
                            >
                                <span className="material-symbols-outlined">{item.icon}</span>
                                <p className="sidebar-nav-label">{item.label}</p>
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Logout */}
                <div className="sidebar-bottom">
                    <button className="sidebar-nav-item" onClick={handleLogout} style={{border: 'none', background: 'none', cursor: 'pointer', width: '100%', textAlign: 'left'}}>
                        <span className="material-symbols-outlined">logout</span>
                        <p className="sidebar-nav-label">Logout</p>
                    </button>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
