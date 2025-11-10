import './Charts.css';

function Charts() {
    return (
        <div className="charts-section">
            {/* Revenue Chart */}
            <div className="chart-card revenue-chart">
                <div className="chart-header">
                    <p className="chart-title">Revenue Trend</p>
                    <p className="chart-subtitle">Last 30 Days</p>
                </div>
                <div className="chart-content">
                    <svg fill="none" height="100%" preserveAspectRatio="none" viewBox="0 0 472 150" width="100%" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H0V109Z" fill="url(#paint0_linear_chart)"/>
                        <path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25" stroke="#1E40AF" strokeLinecap="round" strokeWidth="3"/>
                        <defs>
                            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_chart" x1="236" x2="236" y1="1" y2="149">
                                <stop stopColor="#1E40AF" stopOpacity="0.2"/>
                                <stop offset="1" stopColor="#1E40AF" stopOpacity="0"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </div>

            {/* Order Status Chart */}
            <div className="chart-card status-chart">
                <div className="chart-header">
                    <p className="chart-title">Order Status</p>
                    <p className="chart-subtitle">Current Distribution</p>
                </div>
                <div className="chart-content donut-chart">
                    <div className="donut-chart-wrapper">
                        <svg className="donut-chart-svg" viewBox="0 0 36 36">
                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#F59E0B" strokeDasharray="25, 100" strokeWidth="4"/>
                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#1E40AF" strokeDasharray="40, 100" strokeDashoffset="-25" strokeWidth="4"/>
                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#6B7280" strokeDasharray="35, 100" strokeDashoffset="-65" strokeWidth="4"/>
                        </svg>
                        <div className="donut-chart-center">
                            <span className="donut-chart-value">75</span>
                            <span className="donut-chart-label">Active</span>
                        </div>
                    </div>
                </div>
                <div className="chart-legend">
                    <div className="legend-item">
                        <span className="legend-dot primary"></span>
                        <span className="legend-text">In Progress (40%)</span>
                    </div>
                    <div className="legend-item">
                        <span className="legend-dot secondary"></span>
                        <span className="legend-text">Pending (25%)</span>
                    </div>
                    <div className="legend-item">
                        <span className="legend-dot neutral"></span>
                        <span className="legend-text">Completed (35%)</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Charts;
