import { useState, useEffect } from 'react';
import { getAllOrders } from '../../../api';
import './BillingPaymentsPage.css';
import BillingNavBar from './components/BillingNavBar';
import BillingHeader from './components/BillingHeader';
import AmountDueCard from './components/AmountDueCard';
import InvoicesTable from './components/InvoicesTable';
import PaymentHistory from './components/PaymentHistory';

function BillingPaymentsPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchOrdersAndInvoices();
    }, []);

    const fetchOrdersAndInvoices = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Fetch all orders to calculate invoices and payments
            const response = await getAllOrders();
            setOrders(response.data.data.orders || []);
        } catch (err) {
            console.error('Error fetching billing data:', err);
            setError(err.response?.data?.message || 'Failed to load billing data');
        } finally {
            setLoading(false);
        }
    };

    // Calculate total amount due from unpaid orders
    const calculateTotalDue = () => {
        return orders.reduce((total, order) => {
            const orderTotal = parseFloat(order.total) || 0;
            const amountPaid = parseFloat(order.amount_paid) || 0;
            const balance = orderTotal - amountPaid;
            return total + (balance > 0 ? balance : 0);
        }, 0);
    };

    if (loading) {
        return (
            <div className="billing-payments-page">
                <BillingNavBar />
                <main className="billing-payments-main">
                    <div className="billing-payments-container">
                        <div className="loading-state">
                            <div className="spinner"></div>
                            <p>Loading billing information...</p>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="billing-payments-page">
            <BillingNavBar />
            <main className="billing-payments-main">
                <div className="billing-payments-container">
                    <BillingHeader />
                    
                    {error && (
                        <div className="billing-error">
                            <span className="material-symbols-outlined">error</span>
                            <p>{error}</p>
                        </div>
                    )}

                    <div className="billing-payments-grid">
                        <div className="billing-payments-left">
                            <AmountDueCard totalDue={calculateTotalDue()} />
                            <InvoicesTable orders={orders} />
                        </div>
                        <div className="billing-payments-right">
                            <PaymentHistory orders={orders} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default BillingPaymentsPage;
