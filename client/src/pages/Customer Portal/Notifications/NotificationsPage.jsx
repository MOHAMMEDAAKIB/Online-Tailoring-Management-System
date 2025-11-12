import './NotificationsPage.css';
import NotificationsSidebar from './components/NotificationsSidebar';
import NotificationsHeader from './components/NotificationsHeader';
import NotificationsFilters from './components/NotificationsFilters';
import NotificationsList from './components/NotificationsList';
import NotificationsPagination from './components/NotificationsPagination';

function NotificationsPage() {
    return (
        <div className="notifications-page">
            <NotificationsSidebar />
            <main className="notifications-main">
                <div className="notifications-container">
                    <NotificationsHeader />
                    <NotificationsFilters />
                    <NotificationsList />
                    <NotificationsPagination />
                </div>
            </main>
        </div>
    );
}

export default NotificationsPage;
