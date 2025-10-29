import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="navbar">
      <h1>Tailoring Management System</h1>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/measurements">Measurements</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/bills">Bills</Link>
        <Link to="/notifications">Notifications</Link>
        {user?.role === 'admin' && <Link to="/admin">Admin Panel</Link>}
        <button onClick={logout} className="btn btn-secondary">Logout</button>
      </nav>
    </div>
  );
};

export default Navbar;
