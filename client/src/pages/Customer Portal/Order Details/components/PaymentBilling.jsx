import './PaymentBilling.css';

function PaymentBilling({ order }) {
    const totalAmount = parseFloat(order.total) || 0;
    const amountPaid = parseFloat(order.amount_paid) || 0;
    const balanceDue = totalAmount - amountPaid;
    
    const getPaymentStatus = () => {
        if (balanceDue <= 0) return { label: 'Paid', className: 'paid' };
        if (amountPaid > 0) return { label: 'Partial', className: 'partial' };
        return { label: 'Pending', className: 'pending' };
    };

    const paymentStatus = getPaymentStatus();

    return (
        <div className="payment-billing-card">
            <h2 className="payment-billing-title">Payment & Billing</h2>
            <div className="payment-billing-content">
                <div className="payment-billing-status-row">
                    <p className="payment-billing-label">Payment Status</p>
                    <span className={`payment-billing-badge ${paymentStatus.className}`}>
                        {paymentStatus.label}
                    </span>
                </div>
                <div className="payment-billing-amounts">
                    <div className="payment-billing-row">
                        <p className="payment-billing-label">Total Amount</p>
                        <p className="payment-billing-value">${totalAmount.toFixed(2)}</p>
                    </div>
                    <div className="payment-billing-row">
                        <p className="payment-billing-label">Amount Paid</p>
                        <p className="payment-billing-value">${amountPaid.toFixed(2)}</p>
                    </div>
                    <div className="payment-billing-row total">
                        <p className="payment-billing-total-label">Balance Due</p>
                        <p className="payment-billing-total-value">${balanceDue.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentBilling;
