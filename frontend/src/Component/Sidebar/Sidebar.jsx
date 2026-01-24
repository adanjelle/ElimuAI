import React, { useState, useEffect } from 'react';
import './Sidebar.css';

const Sidebar = ({ isLoggedIn, user, messages, onNewChat }) => {
  const [recentChats, setRecentChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  // Extract recent chats from messages
  useEffect(() => {
    if (messages.length > 0) {
      const userMessages = messages.filter(msg => msg.sender === 'user');
      const chatPreviews = userMessages.slice(-10).reverse().map((msg, index) => ({
        id: `chat-${index}`,
        preview: msg.text.length > 50 ? msg.text.substring(0, 50) + '...' : msg.text,
        fullText: msg.text,
        timestamp: msg.timestamp,
        messageCount: Math.ceil((index + 1) / 2)
      }));
      setRecentChats(chatPreviews);
    }
  }, [messages]);

  const handleNewChat = () => {
    setActiveChat(null);
    if (onNewChat) onNewChat();
  };

  const handleChatSelect = (chat) => {
    setActiveChat(chat.id);
  };

  if (!isLoggedIn) {
    return (
      <aside className="sidebar">
        <div className="sidebar-auth-prompt">
          <div className="auth-prompt-content">
            <div className="auth-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L13.09 8.26H20L14.55 12.77L16.18 19.04L12 15.5L7.82 19.04L9.45 12.77L4 8.26H10.91L12 2Z" fill="currentColor"/>
              </svg>
            </div>
            <h3>Welcome to ElimuAI</h3>
            <p>Sign in to access your chat history and personalized features</p>
          </div>
        </div>
      </aside>
    );
  }

  return (
  // In the return section for logged-in users, replace with this structure:


  <aside className="sidebar">
    {/* Header - Fixed */}
    <div className="sidebar-header">
      <button className="new-chat-btn" onClick={handleNewChat}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        New Chat
      </button>
    </div>

    {/* Scrollable Content Area */}
    <div className="sidebar-content">
      <div className="sidebar-sections">
        {/* Quick Actions */}
        <div className="sidebar-section">
          <h3 className="section-title">Quick Actions</h3>
          <div className="action-buttons">
            <button className="action-btn">
              <div className="action-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 6V4M12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12C13.6569 12 15 13.3431 15 15C15 16.6569 13.6569 18 12 18M12 18V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              Explain Concept
            </button>
            
            <button className="action-btn">
              <div className="action-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12H15M9 16H15M5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              Create Summary
            </button>
            
            <button className="action-btn">
              <div className="action-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10M12 3C13.1819 3 14.3522 3.23279 15.4442 3.68508C16.5361 4.13738 17.5282 4.80031 18.364 5.63604C19.1997 6.47177 19.8626 7.46392 20.3149 8.55585C20.7672 9.64778 21 10.8181 21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              Solve Problem
            </button>
          </div>
        </div>

        {/* Recent Chats - Scrollable Section */}
        <div className="sidebar-section recent-chats-section">
          <div className="section-header">
            <h3 className="section-title">Recent Chats</h3>
            <span className="chat-count">{recentChats.length}</span>
          </div>
          
          <div className="recent-chats-container">
            <div className="recent-chats">
              {recentChats.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">💬</div>
                  <p>No chats yet</p>
                  <span>Start a conversation to see your history here</span>
                </div>
              ) : (
                recentChats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`chat-item ${activeChat === chat.id ? 'active' : ''}`}
                    onClick={() => handleChatSelect(chat)}
                  >
                    <div className="chat-preview">
                      <div className="chat-text">{chat.preview}</div>
                      <div className="chat-meta">
                        <span className="message-count">{chat.messageCount} messages</span>
                        <span className="chat-time">{chat.timestamp}</span>
                      </div>
                    </div>
                    <div className="chat-arrow">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Footer - Fixed */}
    <div className="sidebar-footer">
      <div className="user-profile">
        <div className="user-avatar">
          {user?.name?.[0]?.toUpperCase() || user?.username?.[0]?.toUpperCase() || 'U'}
        </div>
        <div className="user-info">
          <div className="user-name">{user?.name || user?.username || 'User'}</div>
          <div className="user-status">
            <div className="status-dot"></div>
            Premium Plan
          </div>
        </div>
        <button className="settings-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M19.4 15C19.2669 15.3044 19.201 15.6343 19.2 16C19.2 16.2652 19.247 16.5284 19.3381 16.7769C19.4292 17.0254 19.5627 17.255 19.7319 17.4548C19.9011 17.6546 20.1031 17.8212 20.328 17.9465C20.5529 18.0718 20.7969 18.1536 21.048 18.188L21.2 18.2C21.4 18.2 21.6 18.4 21.6 18.6V21.4C21.6 21.6 21.4 21.8 21.2 21.8L21.048 21.812C20.7969 21.8464 20.5529 21.9282 20.328 22.0535C20.1031 22.1788 19.9011 22.3454 19.7319 22.5452C19.5627 22.745 19.4292 22.9746 19.3381 23.2231C19.247 23.4716 19.2 23.7348 19.2 24" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </button>
      </div>
    </div>
  </aside>
);
  
};

export default Sidebar;