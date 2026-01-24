import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import IconButton from '../../UI/Buttons/IconButton';
import { AppIcons } from '../../UI/Icons/AppIcons';
import './UserProfile.css';

const UserProfile = () => {
  const { user, logout, updateProfile } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    await logout();
    setShowDropdown(false);
  };

  const getInitials = (user) => {
    if (!user) return 'EU';
    return `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`.toUpperCase() || 'EU';
  };

  const getUserDisplayName = (user) => {
    if (!user) return 'Elimu User';
    return `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.email || 'Elimu User';
  };

  return (
    <div className="user-profile">
      <button 
        className="profile-trigger"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <div className="user-avatar">
          {user?.avatar ? (
            <img src={user.avatar} alt={getUserDisplayName(user)} />
          ) : (
            <span className="avatar-initials">
              {getInitials(user)}
            </span>
          )}
        </div>
        <div className="user-info">
          <div className="user-name">{getUserDisplayName(user)}</div>
          <div className="user-status">
            {user?.provider ? `${user.provider} Account` : 'Premium Plan'}
          </div>
        </div>
        <AppIcons.ChevronDown className={`dropdown-icon ${showDropdown ? 'open' : ''}`} />
      </button>

      {showDropdown && (
        <div className="profile-dropdown">
          <div className="dropdown-section">
            <div className="dropdown-item">
              <AppIcons.User className="dropdown-icon" />
              <span>Profile Settings</span>
            </div>
            <div className="dropdown-item">
              <AppIcons.Settings className="dropdown-icon" />
              <span>Account Preferences</span>
            </div>
            <div className="dropdown-item">
              <AppIcons.Subscription className="dropdown-icon" />
              <span>Subscription</span>
            </div>
          </div>
          
          <div className="dropdown-divider"></div>
          
          <div className="dropdown-section">
            <button className="dropdown-item logout-item" onClick={handleLogout}>
              <AppIcons.Logout className="dropdown-icon" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;