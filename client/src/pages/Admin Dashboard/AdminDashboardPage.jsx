import './AdminDashboardPage.css';
import { useAuth } from '../../context/AuthContext';
import Sidebar from './components/Sidebar';
import TopNavBar from './components/TopNavBar';
import StatsCards from './components/StatsCards';
import Charts from './components/Charts';
import ActivitySection from './components/ActivitySection';

function AdminDashboardPage() {
    const { user } = useAuth();
    
    console.log("Admin Dashboard User Data:", user);
    
    return (
        <div className="admin-dashboard-page">
            <div className="admin-dashboard-layout">
                <Sidebar />
                <main className="admin-dashboard-main">
                    <TopNavBar userData={user} />
                    <div className="admin-dashboard-content">
                        <StatsCards />
                        <Charts />
                        <ActivitySection />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AdminDashboardPage;
