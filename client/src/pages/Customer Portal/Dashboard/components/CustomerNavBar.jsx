import './CustomerNavBar.css';

function CustomerNavBar({ user }) {
    return (
        <header className="customer-navbar">
            <div className="customer-navbar-brand">
                <div className="customer-navbar-logo">
                    <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"/>
                    </svg>
                </div>
                <h2 className="customer-navbar-title">TailorSwift</h2>
            </div>
            <div className="customer-navbar-menu">
                <a className="customer-navbar-link active" href="#">Dashboard</a>
                <a className="customer-navbar-link" href="#">My Orders</a>
                <a className="customer-navbar-link" href="#">My Measurements</a>
                <a className="customer-navbar-link" href="#">Profile</a>
            </div>
            <div className="customer-navbar-actions">
                <button className="customer-navbar-notification" aria-label="Notifications">
                    <span className="material-symbols-outlined">notifications</span>
                </button>
                <div 
                    className="customer-navbar-avatar"
                    style={{
                        backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB4qnjJX1AiSX1skchcya9ugTa57zqPi71aU9-fabUNSHVkWMRM6upf4KDLenrBmmAiVg_ub226lWgPAB59L7IiaUeAG1EPZpngmu5xDQMGPkzhCuZVy-IPmC89TeBw55MKoqWfrY_eqnFBr2KqvaNvC5yQF2_dykhP2drJkuFBkjxE27XABlWkLSqkTJn1xOXiKR7OrdMJpW8yyhAgztJbBuZRUesEZc_RCcKkwKa6g4XU745-Yi-QZNbhJijKBnmCrC449imrJ2-b")'
                    }}
                    role="img"
                    aria-label="User avatar"
                />
            </div>
        </header>
    );
}

export default CustomerNavBar;
