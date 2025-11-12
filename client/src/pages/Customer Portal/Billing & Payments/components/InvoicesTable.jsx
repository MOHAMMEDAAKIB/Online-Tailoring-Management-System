import { useState } from 'react';
import './InvoicesTable.css';

function InvoicesTable() {
    const [filterTab, setFilterTab] = useState('unpaid');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const invoices = [
        { id: 'INV-2023-001', date: 'Oct 15, 2023', amount: '$150.00', status: 'unpaid' },
        { id: 'INV-2023-002', date: 'Sep 20, 2023', amount: '$220.50', status: 'paid' },
        { id: 'INV-2023-003', date: 'Aug 05, 2023', amount: '$95.00', status: 'paid' }
    ];

    const handleClearFilters = () => {
        setStartDate('');
        setEndDate('');
    };

    const handleDownload = (invoiceId) => {
        console.log('Download invoice:', invoiceId);
    };

    return (
        <div className="invoices-table-card">
            <div className="invoices-table-header">
                <h2 className="invoices-table-title">Invoices</h2>
                <div className="invoices-table-controls">
                    <div className="invoices-table-tabs">
                        <button 
                            className={`invoices-tab ${filterTab === 'all' ? 'active' : ''}`}
                            onClick={() => setFilterTab('all')}
                        >
                            All
                        </button>
                        <button 
                            className={`invoices-tab ${filterTab === 'unpaid' ? 'active' : ''}`}
                            onClick={() => setFilterTab('unpaid')}
                        >
                            Unpaid
                        </button>
                        <button 
                            className={`invoices-tab ${filterTab === 'paid' ? 'active' : ''}`}
                            onClick={() => setFilterTab('paid')}
                        >
                            Paid
                        </button>
                    </div>
                    <div className="invoices-table-filters">
                        <div className="invoices-date-input-wrapper">
                            <span className="material-symbols-outlined invoices-date-icon">calendar_today</span>
                            <input 
                                className="invoices-date-input"
                                type="text"
                                placeholder="Start Date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <div className="invoices-date-input-wrapper">
                            <span className="material-symbols-outlined invoices-date-icon">calendar_today</span>
                            <input 
                                className="invoices-date-input"
                                type="text"
                                placeholder="End Date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                    </div>
                    <button className="invoices-clear-button" onClick={handleClearFilters}>
                        Clear Filters
                    </button>
                </div>
            </div>
            <div className="invoices-table-wrapper">
                <table className="invoices-table">
                    <thead className="invoices-table-head">
                        <tr>
                            <th className="invoices-table-th">Invoice #</th>
                            <th className="invoices-table-th">Date Issued</th>
                            <th className="invoices-table-th">Amount</th>
                            <th className="invoices-table-th">Status</th>
                            <th className="invoices-table-th text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((invoice) => (
                            <tr key={invoice.id} className="invoices-table-row">
                                <td className="invoices-table-td font-medium">{invoice.id}</td>
                                <td className="invoices-table-td">{invoice.date}</td>
                                <td className="invoices-table-td">{invoice.amount}</td>
                                <td className="invoices-table-td">
                                    <span className={`invoices-status-badge ${invoice.status}`}>
                                        {invoice.status === 'paid' ? 'Paid' : 'Unpaid'}
                                    </span>
                                </td>
                                <td className="invoices-table-td text-right">
                                    <button 
                                        className="invoices-download-button"
                                        onClick={() => handleDownload(invoice.id)}
                                    >
                                        <span className="material-symbols-outlined">download</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="invoices-table-footer">
                <span className="invoices-table-results">Showing 1 to 3 of 12 Results</span>
                <div className="invoices-pagination">
                    <button className="invoices-pagination-button">Previous</button>
                    <button className="invoices-pagination-button">Next</button>
                </div>
            </div>
        </div>
    );
}

export default InvoicesTable;
