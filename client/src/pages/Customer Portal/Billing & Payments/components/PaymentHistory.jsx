import { useState } from 'react';
import './PaymentHistory.css';

function PaymentHistory() {
    const [payments] = useState([
        {
            id: 1,
            amount: '$220.50',
            method: 'Credit Card **** 1234',
            date: 'Sep 20',
            status: 'paid'
        },
        {
            id: 2,
            amount: '$95.00',
            method: 'Credit Card **** 1234',
            date: 'Aug 05',
            status: 'paid'
        },
        {
            id: 3,
            amount: '$110.00',
            method: 'PayPal',
            date: 'Jul 12',
            status: 'paid'
        }
    ]);

    const handleDownloadReceipt = (paymentId) => {
        console.log('Download receipt for payment:', paymentId);
    };

    return (
        <div className="payment-history-card">
            <h3 className="payment-history-title">Payment History</h3>
            <div className="payment-history-list">
                <ul className="payment-history-items">
                    {payments.map((payment, index) => (
                        <li key={payment.id} className={`payment-history-item ${index < payments.length - 1 ? 'with-line' : ''}`}>
                            <div className="payment-history-item-content">
                                <div className="payment-history-icon">
                                    <span className="material-symbols-outlined">check</span>
                                </div>
                                <div className="payment-history-details">
                                    <div className="payment-history-info">
                                        <p className="payment-history-amount">{payment.amount} paid</p>
                                        <p className="payment-history-method">via {payment.method}</p>
                                    </div>
                                    <div className="payment-history-actions">
                                        <time className="payment-history-date">{payment.date}</time>
                                        <button 
                                            className="payment-history-download"
                                            onClick={() => handleDownloadReceipt(payment.id)}
                                        >
                                            Download Receipt
                                            <span className="material-symbols-outlined">download</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default PaymentHistory;
