import './NotificationsSidebar.css';

function NotificationsSidebar() {
    return (
        <aside className="notifications-sidebar">
            <div className="notifications-sidebar-content">
                <div className="notifications-sidebar-user">
                    <div 
                        className="notifications-sidebar-avatar"
                        style={{
                            backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDPtluPUIX5S4Tk5KCIUPrnRlOUZPlm_Xtpjhj95qjF2aIhycAlfxqaeqzWMF4YhFyzJoF1vSNuFTTNYIjb-NCS8BakxPqCjJwMVAxcstP4f_qDLyktKWEjmJPxeIco52LcgCBEBDdEo1rcqiDBszTgmoYy8Q48fuo4fW2Hw2izbKt8X66jB27gLMiLL3Hc6UDTvrnhiSalY9TtpMpYl_Z6DBY0jW_KZKHMQo5KcTIm2NjVySmlI5KBcguH_3GMoW4KTEJuryLNSB0u")'
                        }}
                        role="img"
                        aria-label="User avatar of Kai Anderson"
                    />
                    <div className="notifications-sidebar-user-info">
                        <h1 className="notifications-sidebar-user-name">Kai Anderson</h1>
                        <p className="notifications-sidebar-user-email">kai.anderson@email.com</p>
                    </div>
                </div>

                <nav className="notifications-sidebar-nav">
                    <a className="notifications-sidebar-link" href="#">
                        <span className="material-symbols-outlined">package_2</span>
                        <p>My Orders</p>
                    </a>
                    <a className="notifications-sidebar-link active" href="#">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                            notifications
                        </span>
                        <p>Notifications</p>
                    </a>
                    <a className="notifications-sidebar-link" href="#">
                        <span className="material-symbols-outlined">person</span>
                        <p>Profile</p>
                    </a>
                </nav>
            </div>

            <div className="notifications-sidebar-footer">
                <a className="notifications-sidebar-link" href="#">
                    <span className="material-symbols-outlined">settings</span>
                    <p>Settings</p>
                </a>
                <a className="notifications-sidebar-link" href="#">
                    <span className="material-symbols-outlined">logout</span>
                    <p>Log out</p>
                </a>
            </div>
        </aside>
    );
}

export default NotificationsSidebar;
