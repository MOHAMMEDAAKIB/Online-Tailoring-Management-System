import './BillingPaymentsPage.css';
import BillingNavBar from './components/BillingNavBar';
import BillingHeader from './components/BillingHeader';
import AmountDueCard from './components/AmountDueCard';
import InvoicesTable from './components/InvoicesTable';
import PaymentHistory from './components/PaymentHistory';

function BillingPaymentsPage() {
    return (
        <div className="billing-payments-page">
            <BillingNavBar />
            <main className="billing-payments-main">
                <div className="billing-payments-container">
                    <BillingHeader />
                    <div className="billing-payments-grid">
                        <div className="billing-payments-left">
                            <AmountDueCard />
                            <InvoicesTable />
                        </div>
                        <div className="billing-payments-right">
                            <PaymentHistory />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default BillingPaymentsPage;
