import React from 'react';
import IconButton from '../../UI/Buttons/IconButton';
import { AppIcons } from '../../UI/Icons/AppIcons';
import './SocialAuth.css';

const SocialAuth = ({ onAuth }) => {
  const socialProviders = [
    {
      name: 'Google',
      icon: <AppIcons.Google />,
      color: 'white',
      bgColor: '#4285F4',
      handler: () => handleGoogleAuth()
    },
    {
      name: 'Microsoft',
      icon: <AppIcons.Microsoft />,
      color: '#00A4EF',
      bgColor: 'white',
      handler: () => handleMicrosoftAuth()
    },
    {
      name: 'Apple',
      icon: <AppIcons.Apple />,
      color: 'white',
      bgColor: '#000000',
      handler: () => handleAppleAuth()
    },
    {
      name: 'GitHub',
      icon: <AppIcons.GitHub />,
      color: 'white',
      bgColor: '#333333',
      handler: () => handleGitHubAuth()
    }
  ];

  const handleGoogleAuth = async () => {
    try {
      // Simulate Google OAuth flow
      console.log('Initiating Google OAuth...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful authentication
      const userData = {
        id: 'google_123456',
        email: 'user@gmail.com',
        name: 'Google User',
        avatar: null,
        provider: 'google'
      };
      
      onAuth(userData);
    } catch (error) {
      console.error('Google auth error:', error);
    }
  };

  const handleMicrosoftAuth = async () => {
    try {
      console.log('Initiating Microsoft OAuth...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const userData = {
        id: 'microsoft_123456',
        email: 'user@outlook.com',
        name: 'Microsoft User',
        avatar: null,
        provider: 'microsoft'
      };
      
      onAuth(userData);
    } catch (error) {
      console.error('Microsoft auth error:', error);
    }
  };

  const handleAppleAuth = async () => {
    try {
      console.log('Initiating Apple OAuth...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const userData = {
        id: 'apple_123456',
        email: 'user@icloud.com',
        name: 'Apple User',
        avatar: null,
        provider: 'apple'
      };
      
      onAuth(userData);
    } catch (error) {
      console.error('Apple auth error:', error);
    }
  };

  const handleGitHubAuth = async () => {
    try {
      console.log('Initiating GitHub OAuth...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const userData = {
        id: 'github_123456',
        email: 'user@github.com',
        name: 'GitHub User',
        avatar: null,
        provider: 'github'
      };
      
      onAuth(userData);
    } catch (error) {
      console.error('GitHub auth error:', error);
    }
  };

  return (
    <div className="social-auth">
      <div className="social-buttons">
        {socialProviders.map((provider, index) => (
          <button
            key={provider.name}
            onClick={provider.handler}
            className="social-button"
            style={{
              backgroundColor: provider.bgColor,
              color: provider.color,
              border: provider.bgColor === 'white' ? '1.5px solid #E5E7EB' : 'none'
            }}
            type="button"
          >
            <span className="social-icon">
              {provider.icon}
            </span>
            <span className="social-text">
              Continue with {provider.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SocialAuth;