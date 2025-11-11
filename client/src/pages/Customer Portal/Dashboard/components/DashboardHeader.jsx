import './DashboardHeader.css';

function DashboardHeader({ user }) {
    return (
        <div className="dashboard-header">
            <div className="dashboard-header-content">
                <p className="dashboard-header-title">Welcome back, {user.name}!</p>
                <p className="dashboard-header-subtitle">
                    Here's a summary of your account and recent activity.
                </p>
            </div>
        </div>
    );
}

export default DashboardHeader;
