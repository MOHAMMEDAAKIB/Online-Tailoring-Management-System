import './CustomerDashboardPage.css';
import CustomerNavBar from './components/CustomerNavBar';
import DashboardHeader from './components/DashboardHeader';
import StatsCards from './components/StatsCards';
import RecentOrders from './components/RecentOrders';
import QuickActions from './components/QuickActions';
import { useAuth } from '../../../context/AuthContext';

function CustomerDashboardPage() {
    const { user } = useAuth(); 
    //console.log("Admin Dashboard User Data:", user);
    return (
        <div className="customer-dashboard-page">
            <div className="customer-dashboard-container">
                <div className="customer-dashboard-layout">
                    <CustomerNavBar user={user} />
                    <main className="customer-dashboard-main">
                        <DashboardHeader user={user} />
                        <StatsCards />
                        <RecentOrders />
                        <QuickActions />
                    </main>
                </div>
            </div>
        </div>
    );
}

export default CustomerDashboardPage;
