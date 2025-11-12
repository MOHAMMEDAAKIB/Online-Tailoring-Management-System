//import './App.css'
import LandingPage from './pages/Public Section/Landing Page/landing_page'
import { BrowserRouter, Routes, Route, data } from 'react-router-dom';
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

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/track-order" element={<TrackOrderPage />} />
          <Route path="/profile" element={<ProfilePage  />} />

          {/* Protected route */}
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboardPage data={data} /></ProtectedRoute>} />
          <Route path="/customer/dashboard" element={<ProtectedRoute><CustomerDashboardPage data={data} /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
