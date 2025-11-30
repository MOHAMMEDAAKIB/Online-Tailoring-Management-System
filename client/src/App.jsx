//import './App.css'
import LandingPage from './pages/Public Section/Landing Page/landing_page'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Public Section/Login/LoginPage.jsx';
import RegisterPage from './pages/Public Section/Register/RegisterPage.jsx';
import GalleryPage from './pages/Public Section/Gallery/GalleryPage.jsx';
import ContactPage from './pages/Public Section/About/Contact/ContactPage.jsx';
import ServicesPage from './pages/Public Section/Services/ServicesPage.jsx';
import TrackOrderPage from './pages/Public Section/Track Order/TrackOrderPage.jsx';
import AdminDashboardPage from './pages/Admin Dashboard/AdminDashboardPage.jsx';
import CustomerDashboardPage from './pages/Customer Portal/Dashboard/CustomerDashboardPage.jsx';
import ProtectedRoute from './util/ProtectedRoute.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import ProfilePage from './pages/Customer Portal/Profile/CustomerProfilePage.jsx';
import MeasurementFormPage from './pages/Customer Portal/Measurement Form/MeasurementFormPage.jsx';
import EditMeasurementPage from './pages/Customer Portal/Measurement Form/EditMeasurementPage.jsx';
import MyMeasurementsPage from './pages/Customer Portal/My Measurements/MyMeasurementsPage.jsx';
import MyOrdersPage from './pages/Customer Portal/My Orders/MyOrdersPage.jsx';
import OrderDetailsPage from './pages/Customer Portal/Order Details/OrderDetailsPage.jsx';
import PlaceNewOrderPage from './pages/Customer Portal/Place New Order/PlaceNewOrderPage.jsx';
import BillingPaymentsPage from './pages/Customer Portal/Billing & Payments/BillingPaymentsPage.jsx';
import NotificationsPage from './pages/Customer Portal/Notifications/NotificationsPage.jsx';
import HelpSupportPage from './pages/Customer Portal/Help & Support/HelpSupportPage.jsx';
// Admin Pages
import AdminMeasurementManagementPage from './pages/Admin Dashboard/Customer Management/Measurement Management/AdminMeasurementManagementPage.jsx';
import AdminAllCustomersPage from './pages/Admin Dashboard/Customer Management/All Customers/AdminAllCustomersPage.jsx';
import AdminAllOrdersPage from './pages/Admin Dashboard/Order Management/All Orders/AdminAllOrdersPage.jsx';
import AdminInvoicesPage from './pages/Admin Dashboard/Finance/Invoices/AdminInvoicesPage.jsx';
import AdminPaymentsPage from './pages/Admin Dashboard/Finance/Payments/AdminPaymentsPage.jsx';
import AdminReportsPage from './pages/Admin Dashboard/Finance/Reports/AdminReportsPage.jsx';
import AdminInventoryPage from './pages/Admin Dashboard/Inventory/AdminInventoryPage.jsx';
import AdminNotificationsPage from './pages/Admin Dashboard/Notifications/AdminNotificationsPage.jsx';
import AdminSettingsPage from './pages/Admin Dashboard/Settings/AdminSettingsPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<ContactPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/track-order" element={<TrackOrderPage />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboardPage /></ProtectedRoute>} />
          
          {/* Admin Order Management */}
          <Route path="/admin/orders" element={<ProtectedRoute><AdminAllOrdersPage /></ProtectedRoute>} />
          <Route path="/admin/orders/new" element={<ProtectedRoute><AdminAllOrdersPage /></ProtectedRoute>} />
          <Route path="/admin/orders/:id" element={<ProtectedRoute><AdminAllOrdersPage /></ProtectedRoute>} />
          <Route path="/admin/orders/calendar" element={<ProtectedRoute><AdminAllOrdersPage /></ProtectedRoute>} />
          <Route path="/admin/orders/timeline" element={<ProtectedRoute><AdminAllOrdersPage /></ProtectedRoute>} />
          
          {/* Admin Customer Management */}
          <Route path="/admin/customers" element={<ProtectedRoute><AdminAllCustomersPage /></ProtectedRoute>} />
          <Route path="/admin/customers/:id" element={<ProtectedRoute><AdminAllCustomersPage /></ProtectedRoute>} />
          <Route path="/admin/measurements" element={<ProtectedRoute><AdminMeasurementManagementPage /></ProtectedRoute>} />
          
          {/* Admin Finance */}
          <Route path="/admin/invoices" element={<ProtectedRoute><AdminInvoicesPage /></ProtectedRoute>} />
          <Route path="/admin/payments" element={<ProtectedRoute><AdminPaymentsPage /></ProtectedRoute>} />
          <Route path="/admin/reports" element={<ProtectedRoute><AdminReportsPage /></ProtectedRoute>} />
          
          {/* Admin Other */}
          <Route path="/admin/inventory" element={<ProtectedRoute><AdminInventoryPage /></ProtectedRoute>} />
          <Route path="/admin/notifications" element={<ProtectedRoute><AdminNotificationsPage /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute><AdminSettingsPage /></ProtectedRoute>} />
          
          {/* Customer Routes */}
          <Route path="/customer/dashboard" element={<ProtectedRoute><CustomerDashboardPage /></ProtectedRoute>} />
          <Route path="/customer/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/customer/measurements" element={<ProtectedRoute><MyMeasurementsPage /></ProtectedRoute>} />
          <Route path="/customer/measurements/new" element={<ProtectedRoute><MeasurementFormPage /></ProtectedRoute>} />
          <Route path="/customer/measurements/edit/:id" element={<ProtectedRoute><EditMeasurementPage /></ProtectedRoute>} />
          <Route path="/customer/orders" element={<ProtectedRoute><MyOrdersPage /></ProtectedRoute>} />
          <Route path="/customer/orders/:id" element={<ProtectedRoute><OrderDetailsPage /></ProtectedRoute>} />
          <Route path="/customer/orders/new" element={<ProtectedRoute><PlaceNewOrderPage /></ProtectedRoute>} />
          <Route path="/customer/billing" element={<ProtectedRoute><BillingPaymentsPage /></ProtectedRoute>} />
          <Route path="/customer/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
          <Route path="/customer/help" element={<ProtectedRoute><HelpSupportPage /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
