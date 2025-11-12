import './CustomerProfilePage.css';
import ProfileNavBar from './components/ProfileNavBar';
import ProfileSidebar from './components/ProfileSidebar';
import ProfileHeader from './components/ProfileHeader';
import ProfileForm from './components/ProfileForm';

function CustomerProfilePage() {
    return (
        <div className="customer-profile-page">
            <ProfileNavBar />
            <main className="customer-profile-main">
                <div className="customer-profile-container">
                    <ProfileSidebar />
                    <div className="customer-profile-content">
                        <div className="customer-profile-card">
                            <ProfileHeader />
                            <ProfileForm />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default CustomerProfilePage;
