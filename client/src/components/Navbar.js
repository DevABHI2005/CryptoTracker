import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/Temp';
import './Navbar.css'; // Optional styling

const Navbar = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();                     // Clear context
    localStorage.clear();         // Remove token & user from storage
    navigate('/');                // Redirect to landing
  };

  return (
    <nav className="navbar navbar-expand-lg shadow-sm px-4" style={{ backgroundColor: '#1e1e2f' }}>
      <Link to="/" className="navbar-brand text-light fs-4 fw-bold text-decoration-none animate__animated animate__fadeInLeft">
  💹 Crypto<span className="text-info">Tracker</span>
</Link>

      <div className="ms-auto d-flex align-items-center gap-2 animate__animated animate__fadeInRight">
        {user ? (
          <>
            <Link to="/dashboard" className="btn btn-outline-light btn-sm">Dashboard</Link>
            <Link to="/profile" className="btn btn-outline-info btn-sm">Profile</Link>
            <button className="btn btn-danger btn-sm" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline-light btn-sm">Login</Link>
            <Link to="/register" className="btn btn-outline-success btn-sm">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
