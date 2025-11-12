import './AmountDueCard.css';

function AmountDueCard() {
    const handleMakePayment = () => {
        console.log('Make payment clicked');
    };

    return (
        <div className="amount-due-card">
            <div className="amount-due-content">
                <div className="amount-due-info">
                    <p className="amount-due-label">Total Amount Due</p>
                    <p className="amount-due-amount">$150.00</p>
                </div>
                <button className="amount-due-button" onClick={handleMakePayment}>
                    Make Payment
                </button>
            </div>
        </div>
    );
}

export default AmountDueCard;
