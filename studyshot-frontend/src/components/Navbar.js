import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutConfirm(false);
    navigate('/login');
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <img src="/images/studyshot-logo.png" alt="StudyShot Logo" className="logo-img" />
          <h2><span className="study-text">STUDY</span><span className="shot-text">SHOT</span></h2>
        </div>
        <ul className="nav-links">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/module-selection">Module Selection</Link></li>
          <li><Link to="/progress-report">Progress Report</Link></li>
        </ul>
        <div className="auth-buttons">
          <button className="login-button" onClick={() => navigate('/login')}>
            Log in
          </button>
          <button
            className="register-button"
            onClick={isAuthenticated ? handleLogoutClick : () => navigate('/register')}
          >
            {isAuthenticated ? 'Logout' : 'Register'}
          </button>
        </div>
      </nav>

      {/* Logout confirmation modal */}
      {showLogoutConfirm && (
        <>
          <div className="modal-overlay" />
          <div className="modal-content">
            <h2>Confirm Logout</h2>
            <p>Are you sure you want to log out?</p>
            <div className="modal-buttons">
              <button onClick={confirmLogout} className="confirm-btn">Yes</button>
              <button onClick={cancelLogout} className="cancel-btn">No</button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
