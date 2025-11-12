import './ProfileHeader.css';

function ProfileHeader() {
    return (
        <div className="profile-header">
            <div className="profile-header-top">
                <h1 className="profile-header-title">Personal Information</h1>
            </div>
            <div className="profile-header-user">
                <div className="profile-header-avatar-wrapper">
                    <div 
                        className="profile-header-avatar"
                        style={{
                            backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBlzHo7Itmo6U3RmD1g8K__7Iyscxo26qeQQE7Zqgta7BTyRa6WsegLCpZOLTtSC0FHhMrsr31aq8Rsw9xY0NQ9rmJ5dZn-Zjt9XXATOPcWOKGhxelmB0qv54dGOpgGqDLTKkT21h-TEyFC9Y95wfVdQQBFI9wjvYrSJjt7g7wImLPgYUmFZxixelWdcSLESYus_QApC1iCY1A66urUBZAov78HrtospVkYJhRhqJEtUlFXny9gvBu-tTh34QQidp0oUwiHeNSZZnUj")'
                        }}
                        role="img"
                        aria-label="User avatar"
                    />
                    <button className="profile-header-edit-button" aria-label="Edit photo">
                        <span className="material-symbols-outlined">edit</span>
                    </button>
                </div>
                <div className="profile-header-info">
                    <p className="profile-header-name">Amelia Chen</p>
                    <p className="profile-header-subtitle">Update your photo and personal details.</p>
                </div>
            </div>
        </div>
    );
}

export default ProfileHeader;
