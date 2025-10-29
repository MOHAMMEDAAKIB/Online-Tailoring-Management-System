import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { notificationService } from '../services';
import { toast } from 'react-toastify';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await notificationService.getAll();
      setNotifications(response.data.notifications);
    } catch (error) {
      toast.error('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
      fetchNotifications();
    } catch (error) {
      toast.error('Failed to mark as read');
    }
  };

  const handleDelete = async (id) => {
    try {
      await notificationService.delete(id);
      toast.success('Notification deleted');
      fetchNotifications();
    } catch (error) {
      toast.error('Failed to delete notification');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Notifications</h1>

        <div className="card" style={{ marginTop: '1rem' }}>
          {loading ? (
            <p>Loading notifications...</p>
          ) : notifications.length === 0 ? (
            <p>No notifications.</p>
          ) : (
            <div>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-item ${!notification.is_read ? 'unread' : ''}`}
                  style={{ marginBottom: '0.5rem' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                        {notification.title}
                        {!notification.is_read && (
                          <span style={{ 
                            marginLeft: '0.5rem', 
                            color: '#3498db', 
                            fontSize: '0.9rem',
                            fontWeight: 'normal'
                          }}>
                            • New
                          </span>
                        )}
                      </h3>
                      <p style={{ color: '#555', marginBottom: '0.5rem' }}>
                        {notification.message}
                      </p>
                      <small style={{ color: '#7f8c8d' }}>
                        {new Date(notification.created_at).toLocaleString()}
                      </small>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem' }}>
                      {!notification.is_read && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="btn btn-primary"
                          style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                        >
                          Mark as Read
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(notification.id)}
                        className="btn btn-danger"
                        style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
