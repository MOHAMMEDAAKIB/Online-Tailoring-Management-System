import './ProfileSidebar.css';

function ProfileSidebar() {
    const menuItems = [
        { icon: 'person', label: 'Personal Information', active: true, filled: true },
        { icon: 'lock', label: 'Change Password', active: false, filled: false },
        { icon: 'notifications', label: 'Notification Preferences', active: false, filled: false }
    ];

    return (
        <aside className="profile-sidebar">
            <div className="profile-sidebar-menu">
                {menuItems.map((item, index) => (
                    <a
                        key={index}
                        href="#"
                        className={`profile-sidebar-item ${item.active ? 'active' : ''}`}
                    >
                        <span 
                            className="material-symbols-outlined profile-sidebar-icon"
                            style={{ fontVariationSettings: item.filled ? "'FILL' 1" : "'FILL' 0" }}
                        >
                            {item.icon}
                        </span>
                        <p className="profile-sidebar-label">{item.label}</p>
                    </a>
                ))}
            </div>
        </aside>
    );
}

export default ProfileSidebar;
