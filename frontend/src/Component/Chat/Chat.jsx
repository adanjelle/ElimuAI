import React, { useState, useRef, useEffect } from 'react';
import './Chat.css';

const Chat = ({ messages, loading, onSendMessage, isLoggedIn, onNavigateToLogin, user }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'nearest'
      });
    }, 100);
  };

  const handleSendMessage = () => {
    if (input.trim() && !loading && isLoggedIn) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // If not logged in, show login prompt
  if (!isLoggedIn) {
    return (
      <div className="chat-main">
        <div className="chat-container">
          <div className="login-prompt-full">
            <div className="login-prompt-content">
              <div className="prompt-icon">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L13.09 8.26H20L14.55 12.77L16.18 19.04L12 15.5L7.82 19.04L9.45 12.77L4 8.26H10.91L12 2Z" fill="currentColor"/>
                </svg>
              </div>
              <h2>Welcome to ElimuAI</h2>
              <p>Please log in to start chatting with your intelligent learning assistant</p>
              <button 
                className="login-prompt-btn"
                onClick={onNavigateToLogin}
              >
                Login to Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-main">
      <div className="chat-container">
        {/* Header */}
        <div className="chat-header">
          <div className="brand-section">
            <div className="brand-logo">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L13.09 8.26H20L14.55 12.77L16.18 19.04L12 15.5L7.82 19.04L9.45 12.77L4 8.26H10.91L12 2Z" fill="currentColor"/>
              </svg>
            </div>
            <div className="brand-text">
              <h1>ElimuAI</h1>
              <p>Welcome back, {user?.name || user?.username || 'User'}!</p>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        {messages.length === 0 ? (
          <div className="welcome-container">
            <div className="welcome-content">
              <div className="welcome-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 14L12 12M12 12L12 10M12 12L14 12M12 12L10 12M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="welcome-text">
                <h1>Welcome to ElimuAI</h1>
                <p>Your intelligent learning assistant. Ask me anything about education, science, technology, or any subject you'd like to explore.</p>
              </div>
              
              <div className="quick-actions">
                <h3>Quick Start Suggestions</h3>
                <div className="suggestion-grid">
                  <div className="suggestion-card" onClick={() => onSendMessage("Explain quantum computing in simple terms")}>
                    <div className="suggestion-icon">⚛️</div>
                    <div className="suggestion-content">
                      <h4>Explain Quantum Computing</h4>
                      <p>Understand the basics of quantum mechanics in computing</p>
                    </div>
                  </div>
                  <div className="suggestion-card" onClick={() => onSendMessage("Help me understand calculus basics")}>
                    <div className="suggestion-icon">📊</div>
                    <div className="suggestion-content">
                      <h4>Calculus Fundamentals</h4>
                      <p>Learn derivatives, integrals, and their applications</p>
                    </div>
                  </div>
                  <div className="suggestion-card" onClick={() => onSendMessage("Create a study plan for machine learning")}>
                    <div className="suggestion-icon">🤖</div>
                    <div className="suggestion-content">
                      <h4>Machine Learning Path</h4>
                      <p>Structured learning roadmap for AI and ML</p>
                    </div>
                  </div>
                  <div className="suggestion-card" onClick={() => onSendMessage("Explain photosynthesis step by step")}>
                    <div className="suggestion-icon">🌿</div>
                    <div className="suggestion-content">
                      <h4>Photosynthesis Process</h4>
                      <p>Detailed explanation of plant energy conversion</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="messages-container" ref={messagesContainerRef}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'} ${message.isError ? 'error' : ''}`}
              >
                <div className="message-avatar">
                  {message.sender === 'user' ? (
                    <div className="user-avatar">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  ) : (
                    <div className="bot-avatar">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M9 12L11 14L15 10M12 3C13.1819 3 14.3522 3.23279 15.4442 3.68508C16.5361 4.13738 17.5282 4.80031 18.364 5.63604C19.1997 6.47177 19.8626 7.46392 20.3149 8.55585C20.7672 9.64778 21 10.8181 21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </div>
                <div className="message-content">
                  <div className="message-text">
                    {message.text || (message.sender === 'bot' && message.isStreaming && (
                      <div className="streaming-placeholder">
                        <div className="typing-animation">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                    ))}
                    {message.isStreaming && message.text && (
                      <span className="streaming-cursor">|</span>
                    )}
                  </div>
                  <div className="message-time">{message.timestamp}</div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Input Area */}
        <div className="chat-input-container">
          <div className="input-wrapper">
            <div className="input-box">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your question here... (e.g., 'Explain machine learning concepts' or 'Help me solve this math problem')"
                disabled={loading}
                className="chat-input"
                rows="1"
              />
              <button 
                onClick={handleSendMessage} 
                disabled={loading || !input.trim()}
                className="send-button"
                aria-label="Send message"
              >
                {loading ? (
                  <div className="loading-spinner"></div>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;