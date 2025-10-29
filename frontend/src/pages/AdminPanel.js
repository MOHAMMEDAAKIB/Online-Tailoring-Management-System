import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { orderService, billService, notificationService } from '../services';
import { toast } from 'react-toastify';

const AdminPanel = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [billForm, setBillForm] = useState({ order_id: '', amount: '', tax: '' });
  const [alertForm, setAlertForm] = useState({ title: '', message: '', type: 'info' });
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchOrders = async () => {
    try {
      const response = await orderService.getAll();
      setOrders(response.data.orders);
    } catch (error) {
      toast.error('Failed to load orders');
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await orderService.updateStatus(orderId, newStatus);
      toast.success('Order status updated');
      fetchOrders();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleCreateBill = async (e) => {
    e.preventDefault();
    try {
      await billService.create(billForm);
      toast.success('Bill created successfully');
      setBillForm({ order_id: '', amount: '', tax: '' });
      setSelectedOrder(null);
    } catch (error) {
      toast.error('Failed to create bill');
    }
  };

  const handleSendAlert = async (e) => {
    e.preventDefault();
    try {
      await notificationService.sendAlert(alertForm);
      toast.success('Alert sent to all customers');
      setAlertForm({ title: '', message: '', type: 'info' });
    } catch (error) {
      toast.error('Failed to send alert');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Admin Panel</h1>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button
            onClick={() => setActiveTab('orders')}
            className={`btn ${activeTab === 'orders' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Manage Orders
          </button>
          <button
            onClick={() => setActiveTab('bills')}
            className={`btn ${activeTab === 'bills' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Create Bills
          </button>
          <button
            onClick={() => setActiveTab('alerts')}
            className={`btn ${activeTab === 'alerts' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Send Alerts
          </button>
        </div>

        {activeTab === 'orders' && (
          <div className="card" style={{ marginTop: '1rem' }}>
            <h2>All Orders</h2>
            {orders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>Customer</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Delivery Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>{order.customer_name}</td>
                      <td>{order.order_type}</td>
                      <td>
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          style={{ padding: '0.25rem', borderRadius: '4px', border: '1px solid #ddd' }}
                        >
                          <option value="pending">Pending</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td>
                        {order.delivery_date
                          ? new Date(order.delivery_date).toLocaleDateString()
                          : '-'}
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setBillForm({ ...billForm, order_id: order.id });
                            setActiveTab('bills');
                          }}
                          className="btn btn-primary"
                          style={{ padding: '0.5rem 1rem' }}
                        >
                          Create Bill
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === 'bills' && (
          <div className="card" style={{ marginTop: '1rem' }}>
            <h2>Create Bill</h2>
            <form onSubmit={handleCreateBill}>
              <div className="form-group">
                <label>Order ID</label>
                <input
                  type="number"
                  value={billForm.order_id}
                  onChange={(e) => setBillForm({ ...billForm, order_id: e.target.value })}
                  required
                  placeholder="Enter order ID"
                />
              </div>
              <div className="form-group">
                <label>Amount ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={billForm.amount}
                  onChange={(e) => setBillForm({ ...billForm, amount: e.target.value })}
                  required
                  placeholder="Enter amount"
                />
              </div>
              <div className="form-group">
                <label>Tax ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={billForm.tax}
                  onChange={(e) => setBillForm({ ...billForm, tax: e.target.value })}
                  placeholder="Enter tax amount"
                />
              </div>
              <button type="submit" className="btn btn-success">
                Create Bill
              </button>
            </form>
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="card" style={{ marginTop: '1rem' }}>
            <h2>Send Alert to All Customers</h2>
            <form onSubmit={handleSendAlert}>
              <div className="form-group">
                <label>Alert Title</label>
                <input
                  type="text"
                  value={alertForm.title}
                  onChange={(e) => setAlertForm({ ...alertForm, title: e.target.value })}
                  required
                  placeholder="Enter alert title"
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  value={alertForm.message}
                  onChange={(e) => setAlertForm({ ...alertForm, message: e.target.value })}
                  required
                  placeholder="Enter alert message"
                />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select
                  value={alertForm.type}
                  onChange={(e) => setAlertForm({ ...alertForm, type: e.target.value })}
                >
                  <option value="info">Info</option>
                  <option value="success">Success</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                </select>
              </div>
              <button type="submit" className="btn btn-success">
                Send Alert
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
