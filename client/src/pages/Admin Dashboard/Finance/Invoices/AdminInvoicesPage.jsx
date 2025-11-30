import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import './AdminInvoicesPage.css';

function AdminInvoicesPage() {
    const [invoices] = useState([
        {
            id: 'INV-001',
            customer: 'John Doe',
            order: 'ORD-1234',
            amount: 450.00,
            status: 'paid',
            date: '2025-11-15',
            dueDate: '2025-11-30'
        },
        {
            id: 'INV-002',
            customer: 'Jane Smith',
            order: 'ORD-1235',
            amount: 680.00,
            status: 'pending',
            date: '2025-11-20',
            dueDate: '2025-12-05'
        },
        {
            id: 'INV-003',
            customer: 'Mike Johnson',
            order: 'ORD-1236',
            amount: 320.00,
            status: 'overdue',
            date: '2025-10-25',
            dueDate: '2025-11-10'
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
            paid: 'status-paid',
            pending: 'status-pending',
            overdue: 'status-overdue'
        };
        return classes[status] || '';
    };

    return (
        <div className="admin-invoices-page">
            <Sidebar />
            <main className="admin-invoices-main">
                <div className="admin-invoices-header">
                    <h1>Invoices</h1>
                    <button className="btn-primary">
                        <span className="material-symbols-outlined">add</span>
                        New Invoice
                    </button>
                </div>

                <div className="admin-invoices-content">
                    <div className="invoices-table-wrapper">
                        <table className="invoices-table">
                            <thead>
                                <tr>
                                    <th>Invoice ID</th>
                                    <th>Customer</th>
                                    <th>Order</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Due Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoices.map((invoice) => (
                                    <tr key={invoice.id}>
                                        <td>{invoice.id}</td>
                                        <td>{invoice.customer}</td>
                                        <td>{invoice.order}</td>
                                        <td>{formatCurrency(invoice.amount)}</td>
                                        <td>{formatDate(invoice.date)}</td>
                                        <td>{formatDate(invoice.dueDate)}</td>
                                        <td>
                                            <span className={`status-badge ${getStatusClass(invoice.status)}`}>
                                                {invoice.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="btn-icon">
                                                <span className="material-symbols-outlined">visibility</span>
                                            </button>
                                            <button className="btn-icon">
                                                <span className="material-symbols-outlined">download</span>
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

export default AdminInvoicesPage;
