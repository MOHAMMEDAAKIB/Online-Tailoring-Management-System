import './StatsCards.css';

function StatsCards() {
    const stats = [
        {
            label: 'Total Orders',
            value: '1,204',
            change: '+12.5%',
            trend: 'up',
            icon: 'arrow_upward'
        },
        {
            label: 'Active Orders',
            value: '75',
            change: '-2.1%',
            trend: 'down',
            icon: 'arrow_downward'
        },
        {
            label: 'Total Revenue',
            value: '$8,450',
            change: '+8.2%',
            trend: 'up',
            icon: 'arrow_upward'
        },
        {
            label: 'New Customers',
            value: '32',
            change: '+5.0%',
            trend: 'up',
            icon: 'arrow_upward'
        }
    ];

    return (
        <div className="stats-cards">
            {stats.map((stat, index) => (
                <div key={index} className="stats-card">
                    <p className="stats-card-label">{stat.label}</p>
                    <p className="stats-card-value">{stat.value}</p>
                    <p className={`stats-card-change ${stat.trend}`}>
                        <span className="material-symbols-outlined">{stat.icon}</span>
                        {stat.change}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default StatsCards;
