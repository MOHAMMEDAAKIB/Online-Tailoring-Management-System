import './StatsCards.css';

function StatsCards() {
    const stats = [
        {
            label: 'Active Orders',
            value: '3',
            icon: 'shopping_bag'
        },
        {
            label: 'Pending Payments',
            value: '$275.00',
            icon: 'account_balance_wallet'
        },
        {
            label: 'Saved Measurements',
            value: '2 Profiles',
            icon: 'straighten'
        }
    ];

    return (
        <div className="stats-cards-section">
            {stats.map((stat, index) => (
                <div key={index} className="stats-card">
                    <div className="stats-card-header">
                        <p className="stats-card-label">{stat.label}</p>
                        <span className="material-symbols-outlined stats-card-icon">
                            {stat.icon}
                        </span>
                    </div>
                    <p className="stats-card-value">{stat.value}</p>
                </div>
            ))}
        </div>
    );
}

export default StatsCards;
