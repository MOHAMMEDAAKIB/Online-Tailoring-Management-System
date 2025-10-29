import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { orderService, measurementService } from '../services';
import { toast } from 'react-toastify';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    measurement_id: '',
    order_type: 'shirt',
    fabric_type: '',
    color: '',
    design_preference: '',
    quantity: 1,
    delivery_date: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [ordersRes, measurementsRes] = await Promise.all([
        orderService.getAll(),
        measurementService.getAll()
      ]);
      setOrders(ordersRes.data.orders);
      setMeasurements(measurementsRes.data.measurements);
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await orderService.create(formData);
      toast.success('Order placed successfully!');
      setShowForm(false);
      fetchData();
      setFormData({
        measurement_id: '',
        order_type: 'shirt',
        fabric_type: '',
        color: '',
        design_preference: '',
        quantity: 1,
        delivery_date: ''
      });
    } catch (error) {
      toast.error('Failed to place order');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'badge-pending',
      in_progress: 'badge-in-progress',
      completed: 'badge-completed',
      cancelled: 'badge-cancelled'
    };
    return badges[status] || 'badge-pending';
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>My Orders</h1>
          <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
            {showForm ? 'Cancel' : 'Place Order'}
          </button>
        </div>

        {showForm && (
          <div className="card" style={{ marginTop: '1rem' }}>
            <h2>Place New Order</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Select Measurement</label>
                <select
                  name="measurement_id"
                  value={formData.measurement_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a measurement</option>
                  {measurements.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.measurement_type} - {new Date(m.created_at).toLocaleDateString()}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Order Type</label>
                <select
                  name="order_type"
                  value={formData.order_type}
                  onChange={handleChange}
                  required
                >
                  <option value="shirt">Shirt</option>
                  <option value="pant">Pant</option>
                  <option value="suit">Suit</option>
                  <option value="dress">Dress</option>
                  <option value="blazer">Blazer</option>
                </select>
              </div>
              <div className="form-group">
                <label>Fabric Type</label>
                <input
                  type="text"
                  name="fabric_type"
                  value={formData.fabric_type}
                  onChange={handleChange}
                  placeholder="e.g., Cotton, Silk, Wool"
                />
              </div>
              <div className="form-group">
                <label>Color</label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  placeholder="e.g., Blue, Black, White"
                />
              </div>
              <div className="form-group">
                <label>Design Preference</label>
                <textarea
                  name="design_preference"
                  value={formData.design_preference}
                  onChange={handleChange}
                  placeholder="Describe your design preferences"
                />
              </div>
              <div className="form-group">
                <label>Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>
              <div className="form-group">
                <label>Expected Delivery Date</label>
                <input
                  type="date"
                  name="delivery_date"
                  value={formData.delivery_date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <button type="submit" className="btn btn-success">
                Place Order
              </button>
            </form>
          </div>
        )}

        <div className="card" style={{ marginTop: '1rem' }}>
          {loading ? (
            <p>Loading orders...</p>
          ) : orders.length === 0 ? (
            <p>No orders found. Place your first order!</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Type</th>
                  <th>Fabric</th>
                  <th>Color</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Delivery Date</th>
                  <th>Order Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.order_type}</td>
                    <td>{order.fabric_type || '-'}</td>
                    <td>{order.color || '-'}</td>
                    <td>{order.quantity}</td>
                    <td>
                      <span className={`badge ${getStatusBadge(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      {order.delivery_date 
                        ? new Date(order.delivery_date).toLocaleDateString() 
                        : '-'}
                    </td>
                    <td>{new Date(order.created_at).toLocaleDateString()}</td>
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

export default Orders;
