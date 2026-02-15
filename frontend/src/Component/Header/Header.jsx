import React, { useState } from 'react';
import './Header.css';

const Header = ({ onClearChat, onLogout, isLoggedIn, user, onNavigateToLogin }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleDropdownToggle = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleMouseEnter = (dropdown) => {
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const solutionsItems = [
    { title: "AI for Educators", description: "Streamline teaching workflows", icon: "👩‍🏫", badge: "✅" },
    { title: "AI for Schools", description: "School-wide implementation", icon: "🏫", badge: "✅" },
    { title: "AI for Students", description: "Personalized learning paths", icon: "🎓", badge: "✅" }
  ];

  const resourcesItems = [
    { title: "Documentation", description: "API & integration guides", icon: "📚" },
    { title: "Blog", description: "Latest updates & insights", icon: "📝" },
    { title: "Case Studies", description: "Success stories", icon: "📊" },
    { title: "Help Center", description: "FAQs & support", icon: "❓" }
  ];

  return (
    <header className="header">
      <div className="header-container">
        
        {/* LEFT SIDE — BRAND */}
        <div className="brand-section">
          <div className="brand-logo">
            <div className="rocket-icon">🚀</div>
          </div>
          <div className="brand-content">
            <h1 className="brand-name">ElimuAI</h1>
            <p className="brand-tagline">Intelligent Learning Platform</p>
          </div>
        </div>

        {/* CENTER — NAVIGATION MENU */}
        <nav className="nav-menu">
          <div 
            className={`nav-item ${activeDropdown === 'solutions' ? 'active' : ''}`}
            onMouseEnter={() => handleMouseEnter('solutions')}
            onMouseLeave={handleMouseLeave}
          >
            <button className="nav-button" onClick={() => handleDropdownToggle('solutions')}>
              Solutions
              <svg className="dropdown-arrow" viewBox="0 0 24 24" fill="none">
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            {activeDropdown === 'solutions' && (
              <div className="dropdown-menu solutions-dropdown">
                <div className="dropdown-header">
                  <h3>AI Solutions</h3>
                  <p>Transform education with our AI tools</p>
                </div>
                <div className="dropdown-grid">
                  {solutionsItems.map((item, index) => (
                    <a key={index} href="#" className="dropdown-item">
                      <div className="dropdown-item-icon">{item.icon}</div>
                      <div className="dropdown-item-content">
                        <div className="dropdown-item-title">
                          <span>{item.title}</span>
                          <span className="badge">{item.badge}</span>
                        </div>
                        <p className="dropdown-item-description">{item.description}</p>
                      </div>
                      <svg className="arrow-icon" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  ))}
                </div>
                <div className="dropdown-footer">
                  <a href="#" className="view-all-link">
                    View all solutions
                    <svg className="arrow-icon" viewBox="0 0 24 24" fill="none">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            )}
          </div>

          <a href="#" className="nav-item">Pricing</a>

          <div 
            className={`nav-item ${activeDropdown === 'resources' ? 'active' : ''}`}
            onMouseEnter={() => handleMouseEnter('resources')}
            onMouseLeave={handleMouseLeave}
          >
            <button className="nav-button" onClick={() => handleDropdownToggle('resources')}>
              Resources
              <svg className="dropdown-arrow" viewBox="0 0 24 24" fill="none">
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            {activeDropdown === 'resources' && (
              <div className="dropdown-menu resources-dropdown">
                <div className="dropdown-header">
                  <h3>Resources</h3>
                  <p>Everything you need to get started</p>
                </div>
                <div className="dropdown-list">
                  {resourcesItems.map((item, index) => (
                    <a key={index} href="#" className="dropdown-item">
                      <div className="dropdown-item-icon">{item.icon}</div>
                      <div className="dropdown-item-content">
                        <div className="dropdown-item-title">{item.title}</div>
                        <p className="dropdown-item-description">{item.description}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* RIGHT SIDE — AUTH ACTIONS */}
        <div className="auth-section">
          {isLoggedIn ? (
            <div className="user-section">
              <div className="user-info">
                <span className="user-avatar">
                  {user?.name?.charAt(0) || user?.username?.charAt(0) || 'U'}
                </span>
                <span className="user-greeting">Welcome, {user?.name || user?.username || 'User'}</span>
              </div>
              <button className="btn-logout" onClick={onLogout}>
                <span>Logout</span>
                <svg className="logout-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M16 17l5-5-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12H9" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          ) : (
            <>
              <button className="btn-login" onClick={onNavigateToLogin}>
                Login
              </button>
              <button className="btn-signup" onClick={onNavigateToLogin}>
                Sign Up
              </button>
            </>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;