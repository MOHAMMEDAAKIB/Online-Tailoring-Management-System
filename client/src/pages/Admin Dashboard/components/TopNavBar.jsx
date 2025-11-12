import { useState } from 'react';
import './TopNavBar.css';

function TopNavBar() {
    const [searchQuery, setSearchQuery] = useState('');

    const [profileOpen, setProfileOpen] = useState(false);

    const handleProfileClick = () => {
        window.location.href = '/profile';
    };
    
    return (
        <header className="admin-topnav">
            <h2 className="admin-topnav-title">Dashboard</h2>
            <div className="admin-topnav-actions">
                <label className="admin-topnav-search">
                    <div className="admin-topnav-search-icon">
                        <span className="material-symbols-outlined">search</span>
                    </div>
                    <input
                        className="admin-topnav-search-input"
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </label>
                <div className="admin-topnav-buttons">
                    <button className="admin-topnav-button" aria-label="Notifications">
                        <span className="material-symbols-outlined">notifications</span>
                    </button>
                    <button className="admin-topnav-avatar" onClick={handleProfileClick}>
                        <div
                            className="admin-topnav-avatar-image"
                            style={{
                                backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCWtISqA2mvXCdk88L9KdOTW90vSNdd-3Y3R2vdnH5Uol5US8DL5i1mRStARyV8aMjm7PKJSdYjvkTBU4HyNrUe2Wyok2o8j0pgl-3gbRQYog-s742UNwG4C-R03qTrt7GZWFbdbBkRcxZJwsKAKwQMGWBiUwRAgP_2-2ejOG50-gVPkzozuLwWyAA-s4_7P6Wj7HHs1rwKzXMb7Zk7lS4AC6KGctxt3nIgDbmwi75UpijydCFNtz3hnfaymU8XCvWgT0G9ob8wqtbq")'
                            }}
                            role="img"
                            aria-label="User avatar"
                        />
                    </button>
                </div>
            </div>
        </header>
    );
}


export default TopNavBar;
