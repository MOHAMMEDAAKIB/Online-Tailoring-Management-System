import './ProfileNavBar.css';

function ProfileNavBar() {
    return (
        <header className="profile-navbar">
            <div className="profile-navbar-brand">
                <div className="profile-navbar-logo">
                    <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"/>
                    </svg>
                </div>
                <h2 className="profile-navbar-title">TailorSwift</h2>
            </div>
            <div className="profile-navbar-menu">
                <a className="profile-navbar-link" href="#">Dashboard</a>
                <a className="profile-navbar-link" href="#">My Orders</a>
                <a className="profile-navbar-link" href="#">Measurements</a>
                <a className="profile-navbar-link" href="#">Appointments</a>
            </div>
            <div className="profile-navbar-actions">
                <button className="profile-navbar-button" aria-label="Notifications">
                    <span className="material-symbols-outlined">notifications</span>
                </button>
                <button className="profile-navbar-button" aria-label="Help">
                    <span className="material-symbols-outlined">help</span>
                </button>
                <div 
                    className="profile-navbar-avatar"
                    style={{
                        backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCh330KVy1HU1NHXrrhw7xrCaSW3e2CJZGaTf70VQtI0SfY5uwqYzUL4xB9qqDPnc7DzMzv2L6Rqec1A6qZfnwaVCzqIEUbj8tH5y2Ln-qqELyQrdjN3vMDY89IwO47WqQECSrGXjbqLAuEY-uxcfTBaMtns8V59wE7XbVs2qvvgxLsTvGGygZikDbG3aGz6OIo436_COcfiM1qivDB1ZRCI1S4J2-PJ_SfHF3vbW0kWzgQm5yHmYDoSatsIUOKWSUWJ1JWH0wBsJHg")'
                    }}
                    role="img"
                    aria-label="User avatar"
                />
            </div>
        </header>
    );
}

export default ProfileNavBar;
