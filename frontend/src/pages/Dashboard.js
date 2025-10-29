import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { orderService, billService, notificationService } from '../services';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    orders: 0,
    pendingOrders: 0,
    bills: 0,
    unpaidBills: 0,
    notifications: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [ordersRes, billsRes, notificationsRes] = await Promise.all([
        orderService.getAll(),
        billService.getAll(),
        notificationService.getAll()
      ]);

      const orders = ordersRes.data.orders;
      const bills = billsRes.data.bills;
      const notifications = notificationsRes.data.notifications;

      setStats({
        orders: orders.length,
        pendingOrders: orders.filter(o => o.status === 'pending').length,
        bills: bills.length,
        unpaidBills: bills.filter(b => b.payment_status === 'pending').length,
        notifications: notifications.filter(n => !n.is_read).length
      });
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Welcome, {user?.name}!</h1>
        <p style={{ color: '#7f8c8d', marginTop: '0.5rem' }}>
          {user?.role === 'admin' ? 'Admin Dashboard' : 'Customer Dashboard'}
        </p>

        {loading ? (
          <div className="card">
            <p>Loading dashboard...</p>
          </div>
        ) : (
          <div className="grid" style={{ marginTop: '2rem' }}>
            <div className="stat-card">
              <h3>{stats.orders}</h3>
              <p>Total Orders</p>
            </div>
            <div className="stat-card">
              <h3>{stats.pendingOrders}</h3>
              <p>Pending Orders</p>
            </div>
            <div className="stat-card">
              <h3>{stats.bills}</h3>
              <p>Total Bills</p>
            </div>
            <div className="stat-card">
              <h3>{stats.unpaidBills}</h3>
              <p>Unpaid Bills</p>
            </div>
            <div className="stat-card">
              <h3>{stats.notifications}</h3>
              <p>Unread Notifications</p>
            </div>
          </div>
        )}

        <div className="card" style={{ marginTop: '2rem' }}>
          <h2>Quick Actions</h2>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            <a href="/measurements" className="btn btn-primary">Add Measurements</a>
            <a href="/orders" className="btn btn-success">Place Order</a>
            <a href="/bills" className="btn btn-secondary">View Bills</a>
            <a href="/notifications" className="btn btn-secondary">View Notifications</a>
          </div>
        </div>

        <div className="card" style={{ marginTop: '2rem' }}>
          <h2>About the System</h2>
          <p>
            The Online Tailoring Management System is a comprehensive platform for managing
            tailoring services. Customers can submit measurements, place orders, view bills,
            and make online payments. Admins can manage all aspects of the business including
            orders, measurements, bills, and notifications.
          </p>
          <p style={{ marginTop: '1rem' }}>
            <strong>Future Enhancement:</strong> AI-powered measurement estimation from photos
            is coming soon to make the measurement process even more accurate and convenient.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
