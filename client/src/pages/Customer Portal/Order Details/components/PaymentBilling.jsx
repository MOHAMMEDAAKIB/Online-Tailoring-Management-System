import './PaymentBilling.css';

function PaymentBilling() {
    return (
        <div className="payment-billing-card">
            <h2 className="payment-billing-title">Payment & Billing</h2>
            <div className="payment-billing-content">
                <div className="payment-billing-status-row">
                    <p className="payment-billing-label">Payment Status</p>
                    <span className="payment-billing-badge paid">Paid</span>
                </div>
                <div className="payment-billing-amounts">
                    <div className="payment-billing-row">
                        <p className="payment-billing-label">Total Amount</p>
                        <p className="payment-billing-value">$250.00</p>
                    </div>
                    <div className="payment-billing-row">
                        <p className="payment-billing-label">Amount Paid</p>
                        <p className="payment-billing-value">$250.00</p>
                    </div>
                    <div className="payment-billing-row total">
                        <p className="payment-billing-total-label">Balance Due</p>
                        <p className="payment-billing-total-value">$0.00</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentBilling;
