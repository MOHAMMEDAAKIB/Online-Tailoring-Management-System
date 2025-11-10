//import './App.css'
import LandingPage from './pages/Public Section/Landing Page/landing_page'
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import LoginPage from './pages/Public Section/Login/LoginPage.jsx';
import RegisterPage from './pages/Public Section/Register/RegisterPage.jsx';
import GalleryPage from './pages/Public Section/Gallery/GalleryPage.jsx';
import ContactPage from './pages/Public Section/About/Contact/ContactPage.jsx';
import ServicesPage from './pages/Public Section/Services/ServicesPage.jsx';
import TrackOrderPage from './pages/Public Section/Track Order/TrackOrderPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/track-order" element={<TrackOrderPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
