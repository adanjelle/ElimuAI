import React, { useState } from 'react';
import axios from 'axios';
import './login.css';

const Login = ({ onLoginSuccess, onNavigateToSignup, onNavigateToChat }) => {
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // For demo - simulate successful login
      setTimeout(() => {
        onLoginSuccess({
          name: 'Demo User',
          email: form.email || 'demo@elimuai.com',
          username: 'demo_user'
        });
      }, 1000);
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const handleDemoLogin = () => {
    onLoginSuccess({
      name: 'Demo User',
      email: 'demo@elimuai.com',
      username: 'demo_user'
    });
  };

  return (
    <div className="login-container">
      <div className="login-grid">
        {/* Left - Illustration */}
        <div className="login-illustration">
          <div className="illustration-content">
            <div className="ai-mascot">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L13.09 8.26H20L14.55 12.77L16.18 19.04L12 15.5L7.82 19.04L9.45 12.77L4 8.26H10.91L12 2Z" fill="currentColor"/>
              </svg>
            </div>
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
          </div>
        </div>

        {/* Center - Main Form */}
        <div className="login-form-section">
          <div className="form-container">
            <h1 className="app-title">AI Assist</h1>
            <p className="app-subtitle">Chat, Connect, Cherish - Your AI Bestie Awaits.</p>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="input-group">
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Input your email"
                  className="form-input"
                  required
                  disabled={loading}
                />
              </div>

              <div className="input-group password-group">
                <input
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="form-input"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  className="password-toggle"
                  aria-label="Toggle password visibility"
                  disabled={loading}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input 
                    name="remember" 
                    type="checkbox" 
                    checked={form.remember} 
                    onChange={handleChange} 
                    className="checkbox-input" 
                    disabled={loading}
                  />
                  <span> Remember me</span>
                </label>
                <a href="#" className="forgot-password">Forgot Password?</a>
              </div>

              <button 
                type="submit" 
                className="login-button"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>

              <button 
                type="button"
                onClick={handleDemoLogin}
                className="demo-button"
              >
                Try Demo (No Login Required)
              </button>

              <div className="divider">
                <div className="divider-line"></div>
                <div className="divider-text">Or continue with</div>
                <div className="divider-line"></div>
              </div>

              <div className="social-buttons">
                <button type="button" className="social-button">
                  Google
                </button>
                <button type="button" className="social-button">
                  Facebook
                </button>
              </div>

              <p className="auth-link">
                Don't have an account?{' '}
                <button 
                  type="button" 
                  onClick={onNavigateToSignup} 
                  className="link-button"
                >
                  Sign Up
                </button>
              </p>

              <p className="auth-link">
                Just want to explore?{' '}
                <button 
                  type="button" 
                  onClick={onNavigateToChat} 
                  className="link-button secondary"
                >
                  Continue as Guest
                </button>
              </p>
            </form>
          </div>
        </div>

        {/* Right - Mobile preview */}
        <div className="mobile-preview">
          <div className="preview-container">
            <h2>AI Assist</h2>
            <div className="preview-form">
              <input placeholder="Input your email" className="preview-input" />
              <input placeholder="Enter your password" type="password" className="preview-input" />
              <div className="preview-options">
                <input type="checkbox" /> 
                <span>Remember me</span>
              </div>
              <button className="preview-login-button">Login</button>
              <button className="preview-social-button">Continue with Google</button>
              <button className="preview-social-button">Continue with Facebook</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;