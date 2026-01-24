import React from 'react';
import './AuthLayout.css';

const AuthLayout = ({ children, sideContent }) => {
  return (
    <div className="auth-layout">
      <div className="auth-sidebar">
        <div className="sidebar-content">
          <div className="sidebar-brand">
            <div className="brand-logo">
              <svg viewBox="0 0 32 32" fill="none">
                <path d="M16 2L18.39 11.78L28 11.78L20.8 17.44L23.18 27.22L16 21.56L8.82 27.22L11.2 17.44L4 11.78L13.61 11.78L16 2Z" fill="currentColor"/>
              </svg>
            </div>
            <h1 className="brand-title">ElimuAI</h1>
            <p className="brand-tagline">Intelligent Learning Platform</p>
          </div>
          
          {sideContent || (
            <div className="sidebar-features">
              <div className="feature-item">
                <div className="feature-icon">🚀</div>
                <div className="feature-content">
                  <h3>AI-Powered Learning</h3>
                  <p>Get instant explanations and personalized tutoring</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">📚</div>
                <div className="feature-content">
                  <h3>All Subjects Covered</h3>
                  <p>From mathematics to literature and everything between</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">🔒</div>
                <div className="feature-content">
                  <h3>Enterprise Security</h3>
                  <p>Your data is encrypted and secure</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="sidebar-footer">
            <p>Trusted by 50,000+ students and professionals worldwide</p>
          </div>
        </div>
      </div>
      
      <div className="auth-main">
        <div className="auth-container">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;