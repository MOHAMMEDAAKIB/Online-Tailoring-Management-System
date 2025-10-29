import api from './api';

export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
};

export const measurementService = {
  create: (data) => api.post('/measurements', data),
  getAll: () => api.get('/measurements'),
  getById: (id) => api.get(`/measurements/${id}`),
  update: (id, data) => api.put(`/measurements/${id}`, data),
  delete: (id) => api.delete(`/measurements/${id}`),
  estimate: (data) => api.post('/measurements/estimate', data),
};

export const orderService = {
  create: (data) => api.post('/orders', data),
  getAll: () => api.get('/orders'),
  getById: (id) => api.get(`/orders/${id}`),
  update: (id, data) => api.put(`/orders/${id}`, data),
  updateStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }),
  delete: (id) => api.delete(`/orders/${id}`),
};

export const billService = {
  create: (data) => api.post('/bills', data),
  getAll: () => api.get('/bills'),
  getById: (id) => api.get(`/bills/${id}`),
  update: (id, data) => api.put(`/bills/${id}`, data),
  delete: (id) => api.delete(`/bills/${id}`),
};

export const paymentService = {
  createIntent: (billId) => api.post('/payments/intent', { billId }),
  process: (data) => api.post('/payments/process', data),
  getHistory: () => api.get('/payments/history'),
};

export const notificationService = {
  getAll: () => api.get('/notifications'),
  markAsRead: (id) => api.patch(`/notifications/${id}/read`),
  delete: (id) => api.delete(`/notifications/${id}`),
  sendAlert: (data) => api.post('/notifications/alert', data),
  sendToUser: (data) => api.post('/notifications/send', data),
};
