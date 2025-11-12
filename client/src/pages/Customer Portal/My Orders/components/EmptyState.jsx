import './EmptyState.css';

function EmptyState() {
    return (
        <div className="empty-state-wrapper">
            <div className="empty-state">
                <span className="material-symbols-outlined empty-state-icon">shopping_bag</span>
                <div className="empty-state-content">
                    <p className="empty-state-title">You haven't placed any orders yet.</p>
                    <p className="empty-state-subtitle">Let's create something unique!</p>
                </div>
                <button className="empty-state-button">
                    <span>Place a New Order</span>
                </button>
            </div>
        </div>
    );
}

export default EmptyState;
