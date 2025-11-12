import './NotificationsHeader.css';

function NotificationsHeader() {
    const handleMarkAllRead = () => {
        console.log('Mark all as read');
    };

    return (
        <div className="notifications-header">
            <div className="notifications-header-content">
                <h1 className="notifications-header-title">Notifications</h1>
                <p className="notifications-header-subtitle">View and manage all your updates.</p>
            </div>
            <button className="notifications-header-button" onClick={handleMarkAllRead}>
                <span>Mark all as read</span>
            </button>
        </div>
    );
}

export default NotificationsHeader;
