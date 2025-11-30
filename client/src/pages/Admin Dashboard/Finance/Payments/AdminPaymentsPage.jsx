import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import './AdminPaymentsPage.css';

function AdminPaymentsPage() {
    const [payments] = useState([
        {
            id: 'PAY-001',
            customer: 'John Doe',
            invoice: 'INV-001',
            amount: 450.00,
            method: 'Credit Card',
            status: 'completed',
            date: '2025-11-15'
        },
        {
            id: 'PAY-002',
            customer: 'Jane Smith',
            invoice: 'INV-002',
            amount: 680.00,
            method: 'Bank Transfer',
            status: 'pending',
            date: '2025-11-20'
        },
        {
            id: 'PAY-003',
            customer: 'Mike Johnson',
            invoice: 'INV-003',
            amount: 320.00,
            method: 'Cash',
            status: 'completed',
            date: '2025-11-22'
        }
    ]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit'
        });
    };

    const formatCurrency = (amount) => {
        return `$${parseFloat(amount).toFixed(2)}`;
    };

    const getStatusClass = (status) => {
        const classes = {
            completed: 'status-completed',
            pending: 'status-pending',
            failed: 'status-failed'
        };
        return classes[status] || '';
    };

    return (
        <div className="admin-payments-page">
            <Sidebar />
            <main className="admin-payments-main">
                <div className="admin-payments-header">
                    <h1>Payments</h1>
                    <button className="btn-primary">
                        <span className="material-symbols-outlined">add</span>
                        Record Payment
                    </button>
                </div>

                <div className="admin-payments-stats">
                    <div className="stat-card">
                        <span className="stat-label">Total Received</span>
                        <span className="stat-value">$1,450.00</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-label">Pending</span>
                        <span className="stat-value">$680.00</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-label">This Month</span>
                        <span className="stat-value">$2,130.00</span>
                    </div>
                </div>

                <div className="admin-payments-content">
                    <div className="payments-table-wrapper">
                        <table className="payments-table">
                            <thead>
                                <tr>
                                    <th>Payment ID</th>
                                    <th>Customer</th>
                                    <th>Invoice</th>
                                    <th>Amount</th>
                                    <th>Method</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((payment) => (
                                    <tr key={payment.id}>
                                        <td>{payment.id}</td>
                                        <td>{payment.customer}</td>
                                        <td>{payment.invoice}</td>
                                        <td>{formatCurrency(payment.amount)}</td>
                                        <td>{payment.method}</td>
                                        <td>{formatDate(payment.date)}</td>
                                        <td>
                                            <span className={`status-badge ${getStatusClass(payment.status)}`}>
                                                {payment.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="btn-icon">
                                                <span className="material-symbols-outlined">visibility</span>
                                            </button>
                                            <button className="btn-icon">
                                                <span className="material-symbols-outlined">print</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AdminPaymentsPage;
