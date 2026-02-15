import React, { useState } from 'react';
import Header from './Component/Header/Header';
import Sidebar from './Component/Sidebar/Sidebar';
import Chat from './Component/Chat/Chat';
// import Login from './Component/Auth/Login/login';
import './App.css';

const App = () => {
  // const [currentPage, setCurrentPage] = useState('login');
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    setCurrentPage('chat');
    setMessages([]); // Clear messages on login
  };

  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  //   setUser(null);
  //   setCurrentPage('login');
  //   setMessages([]);
  //   localStorage.removeItem('elimuai-chat-messages');
  // };

  // const handleNavigateToLogin = () => setCurrentPage('login');
  // const handleNavigateToSignup = () => setCurrentPage('login');

  // Handle sending messages from Chat component
  const handleSendMessage = async (inputText) => {
    if (!inputText.trim() || loading) return;

    const userMessage = {
      id: Date.now(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const botMessageId = Date.now() + 1;
      const botMessage = {
        id: botMessageId,
        text: '',
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isStreaming: true
      };
      
      setMessages(prev => [...prev, botMessage]);

      // Prepare chat history for the API
      const history = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));

      const response = await fetch('http://localhost:5000/ask', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: inputText.trim(),
          history: history
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            
            if (data === '[DONE]') {
              break;
            }
            
            try {
              const parsed = JSON.parse(data);
              if (parsed.text) {
                accumulatedText += parsed.text;
                // Update the bot message with accumulated text
                setMessages(prev => prev.map(msg => 
                  msg.id === botMessageId 
                    ? { ...msg, text: accumulatedText }
                    : msg
                ));
              }
            } catch (e) {
              console.error('Error parsing JSON:', e, 'Data:', data);
            }
          }
        }
      }

      // Mark streaming as complete
      setMessages(prev => prev.map(msg => 
        msg.id === botMessageId 
          ? { ...msg, isStreaming: false }
          : msg
      ));

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now(),
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    const confirmed = window.confirm('Are you sure you want to clear the chat? This action cannot be undone.');
    if (confirmed) {
      setMessages([]);
      localStorage.removeItem('elimuai-chat-messages');
    }
  };

  // if (currentPage === 'login') {
  //   return (
  //     <Login 
  //       onLoginSuccess={handleLoginSuccess}
  //       onNavigateToSignup={handleNavigateToSignup}
  //     />
  //   );
  // }

  return (
//     <div className="app">
//       <Header 
//         onClearChat={clearChat}
//         onLogout={handleLogout} 
//         isLoggedIn={isLoggedIn}
//         user={user}
//       />
//       <div className="main-layout">
//         <Sidebar 
//   isLoggedIn={isLoggedIn}
//   user={user}
//   messages={messages}
//   onNewChat={clearChat}
// />
        <main className="main-content">
          <Chat 
            messages={messages}
            loading={loading}
            onSendMessage={handleSendMessage}
            isLoggedIn={isLoggedIn}
            onNavigateToLogin={handleNavigateToLogin}
            user={user}
          />
        </main>
    
  );
};

export default App;