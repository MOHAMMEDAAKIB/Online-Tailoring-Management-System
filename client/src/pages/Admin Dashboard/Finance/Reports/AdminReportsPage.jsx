import Sidebar from '../../components/Sidebar';
import './AdminReportsPage.css';

function AdminReportsPage() {
    return (
        <div className="admin-reports-page">
            <Sidebar />
            <main className="admin-reports-main">
                <div className="admin-reports-header">
                    <h1>Financial Reports</h1>
                    <button className="btn-primary">
                        <span className="material-symbols-outlined">download</span>
                        Export Report
                    </button>
                </div>

                <div className="admin-reports-content">
                    <div className="report-section">
                        <h2>Revenue Overview</h2>
                        <div className="report-stats">
                            <div className="report-card">
                                <span className="report-label">Total Revenue</span>
                                <span className="report-value">$125,430</span>
                                <span className="report-change positive">+12.5%</span>
                            </div>
                            <div className="report-card">
                                <span className="report-label">This Month</span>
                                <span className="report-value">$24,850</span>
                                <span className="report-change positive">+8.2%</span>
                            </div>
                            <div className="report-card">
                                <span className="report-label">Last Month</span>
                                <span className="report-value">$22,970</span>
                                <span className="report-change neutral">-</span>
                            </div>
                        </div>
                    </div>

                    <div className="report-section">
                        <h2>Sales by Category</h2>
                        <div className="report-list">
                            <div className="report-item">
                                <span className="item-name">Suits</span>
                                <div className="item-bar">
                                    <div className="item-fill" style={{width: '65%'}}></div>
                                </div>
                                <span className="item-value">$45,230</span>
                            </div>
                            <div className="report-item">
                                <span className="item-name">Shirts</span>
                                <div className="item-bar">
                                    <div className="item-fill" style={{width: '45%'}}></div>
                                </div>
                                <span className="item-value">$31,450</span>
                            </div>
                            <div className="report-item">
                                <span className="item-name">Pants</span>
                                <div className="item-bar">
                                    <div className="item-fill" style={{width: '38%'}}></div>
                                </div>
                                <span className="item-value">$26,580</span>
                            </div>
                            <div className="report-item">
                                <span className="item-name">Others</span>
                                <div className="item-bar">
                                    <div className="item-fill" style={{width: '22%'}}></div>
                                </div>
                                <span className="item-value">$15,170</span>
                            </div>
                        </div>
                    </div>

                    <div className="report-section">
                        <h2>Top Customers</h2>
                        <table className="report-table">
                            <thead>
                                <tr>
                                    <th>Customer</th>
                                    <th>Orders</th>
                                    <th>Total Spent</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>John Doe</td>
                                    <td>15</td>
                                    <td>$4,250</td>
                                </tr>
                                <tr>
                                    <td>Jane Smith</td>
                                    <td>12</td>
                                    <td>$3,680</td>
                                </tr>
                                <tr>
                                    <td>Mike Johnson</td>
                                    <td>10</td>
                                    <td>$2,950</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AdminReportsPage;
