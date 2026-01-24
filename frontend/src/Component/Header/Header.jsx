import React from 'react';
import './Header.css';

const Header = ({ onClearChat, onLogout, isLoggedIn, user, onNavigateToLogin }) => {
  return (
    <header className="header">
      <div className="header-content">
        
        {/* LEFT SIDE — LOGO + TITLE */}
        <div className="logo-section">
          <div className="logo">
            <svg className="logo-svg" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L13.09 8.26H20L14.55 12.77L16.18 19.04L12 15.5L7.82 19.04L9.45 12.77L4 8.26H10.91L12 2Z" fill="currentColor"/>
            </svg>
          </div>

          <div className="title-section">
            <h1 className="app-title">ElimuAI</h1>
            <p className="app-subtitle">Intelligent Learning Assistant</p>
          </div>
        </div>

        {/* RIGHT SIDE — BUTTONS */}
        <div className="header-actions">
          <button className="docs-button">Documentation</button>
          {isLoggedIn ? (
            <>
              <span className="welcome-text">Welcome, {user?.name || user?.username || 'User'}!</span>
              <button className="logout-button" onClick={onLogout}>Logout</button>
            </>
          ) : (
            <>
              <button className="login-button" onClick={onNavigateToLogin}>Login</button>
              <button className="signup-button" onClick={onNavigateToLogin}>Sign Up</button>
            </>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;