import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { billService, paymentService } from '../services';
import { toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY || 'pk_test_dummy');

const PaymentForm = ({ bill, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    try {
      // Create payment intent
      const intentResponse = await paymentService.createIntent(bill.id);
      const { clientSecret } = intentResponse.data;

      // Confirm payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        toast.error(error.message);
      } else if (paymentIntent.status === 'succeeded') {
        // Process payment on backend
        await paymentService.process({
          billId: bill.id,
          paymentIntentId: paymentIntent.id,
        });
        toast.success('Payment successful!');
        onSuccess();
      }
    } catch (error) {
      toast.error('Payment failed');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '4px' }}>
        <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
      </div>
      <button
        type="submit"
        disabled={!stripe || processing}
        className="btn btn-success"
        style={{ marginTop: '1rem' }}
      >
        {processing ? 'Processing...' : `Pay $${bill.total_amount}`}
      </button>
    </form>
  );
};

const Bills = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBill, setSelectedBill] = useState(null);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const response = await billService.getAll();
      setBills(response.data.bills);
    } catch (error) {
      toast.error('Failed to load bills');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    setSelectedBill(null);
    fetchBills();
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'badge-pending',
      paid: 'badge-paid',
      failed: 'badge-cancelled'
    };
    return badges[status] || 'badge-pending';
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>My Bills</h1>

        {selectedBill && (
          <div className="card" style={{ marginTop: '1rem' }}>
            <h2>Pay Bill #{selectedBill.id}</h2>
            <div style={{ marginBottom: '1rem' }}>
              <p><strong>Order:</strong> #{selectedBill.order_id} - {selectedBill.order_type}</p>
              <p><strong>Amount:</strong> ${selectedBill.amount}</p>
              <p><strong>Tax:</strong> ${selectedBill.tax}</p>
              <p><strong>Total:</strong> ${selectedBill.total_amount}</p>
            </div>
            <Elements stripe={stripePromise}>
              <PaymentForm bill={selectedBill} onSuccess={handlePaymentSuccess} />
            </Elements>
            <button
              onClick={() => setSelectedBill(null)}
              className="btn btn-secondary"
              style={{ marginTop: '1rem' }}
            >
              Cancel
            </button>
          </div>
        )}

        <div className="card" style={{ marginTop: '1rem' }}>
          {loading ? (
            <p>Loading bills...</p>
          ) : bills.length === 0 ? (
            <p>No bills found.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Bill #</th>
                  <th>Order #</th>
                  <th>Order Type</th>
                  <th>Amount</th>
                  <th>Tax</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bills.map((bill) => (
                  <tr key={bill.id}>
                    <td>#{bill.id}</td>
                    <td>#{bill.order_id}</td>
                    <td>{bill.order_type}</td>
                    <td>${bill.amount}</td>
                    <td>${bill.tax}</td>
                    <td>${bill.total_amount}</td>
                    <td>
                      <span className={`badge ${getStatusBadge(bill.payment_status)}`}>
                        {bill.payment_status}
                      </span>
                    </td>
                    <td>{new Date(bill.created_at).toLocaleDateString()}</td>
                    <td>
                      {bill.payment_status === 'pending' && (
                        <button
                          onClick={() => setSelectedBill(bill)}
                          className="btn btn-success"
                          style={{ padding: '0.5rem 1rem' }}
                        >
                          Pay Now
                        </button>
                      )}
                      {bill.payment_status === 'paid' && (
                        <span style={{ color: '#27ae60' }}>✓ Paid</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bills;
