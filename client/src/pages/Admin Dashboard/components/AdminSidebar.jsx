import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import './AdminSidebar.css';

function AdminSidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => {
        return location.pathname.startsWith(path);
    };

    const menuItems = [
        { path: '/admin/dashboard', icon: 'dashboard', label: 'Dashboard' },
        { path: '/admin/orders', icon: 'shopping_cart', label: 'Orders' },
        { path: '/admin/customers', icon: 'group', label: 'Customers' },
        { path: '/admin/measurements', icon: 'straighten', label: 'Measurements' },
        { path: '/admin/inventory', icon: 'inventory_2', label: 'Inventory' },
        { path: '/admin/finance', icon: 'payments', label: 'Finance' },
        { path: '/admin/notifications', icon: 'notifications', label: 'Notifications' },
    ];

    return (
        <aside className="admin-sidebar">
            {/* Admin Profile */}
            <div className="admin-sidebar-profile">
                <div className="admin-sidebar-avatar">
                    <span className="material-symbols-outlined">person</span>
                </div>
                <div className="admin-sidebar-profile-info">
                    <h1 className="admin-sidebar-profile-name">
                        {user?.name || 'Admin Name'}
                    </h1>
                    <p className="admin-sidebar-profile-role">Administrator</p>
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="admin-sidebar-nav">
                {menuItems.map((item) => (
                    <button
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        className={`admin-sidebar-nav-item ${isActive(item.path) ? 'active' : ''}`}
                    >
                        <span 
                            className="material-symbols-outlined"
                            style={isActive(item.path) ? { fontVariationSettings: "'FILL' 1" } : {}}
                        >
                            {item.icon}
                        </span>
                        <p>{item.label}</p>
                    </button>
                ))}
            </nav>

            {/* Bottom Actions */}
            <div className="admin-sidebar-bottom">
                <button
                    onClick={() => navigate('/admin/settings')}
                    className="admin-sidebar-nav-item"
                >
                    <span className="material-symbols-outlined">settings</span>
                    <p>Settings</p>
                </button>
                <button
                    onClick={handleLogout}
                    className="admin-sidebar-nav-item"
                >
                    <span className="material-symbols-outlined">logout</span>
                    <p>Logout</p>
                </button>
            </div>
        </aside>
    );
}

export default AdminSidebar;
