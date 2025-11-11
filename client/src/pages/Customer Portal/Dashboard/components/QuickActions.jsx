import './QuickActions.css';

function QuickActions() {
    return (
        <div className="quick-actions-section">
            <div className="quick-actions-header">
                <h2 className="quick-actions-title">Quick Actions</h2>
            </div>
            <div className="quick-actions-buttons">
                <button className="quick-action-button primary">
                    <span className="material-symbols-outlined">add_shopping_cart</span>
                    <span>Place a New Order</span>
                </button>
                <button className="quick-action-button secondary">
                    <span className="material-symbols-outlined">edit</span>
                    <span>Update My Measurements</span>
                </button>
            </div>
        </div>
    );
}

export default QuickActions;
