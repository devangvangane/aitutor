// src/components/Chatbot.js
import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User } from 'lucide-react';
import axios from 'axios';

const Chatbot = ({ chatSession, selectedSubject, selectedChapter, studentId }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Load chat messages when session changes
    if (chatSession?.session_id) {
      loadChatMessages(chatSession.session_id);
    } else {
      setMessages([]);
    }
  }, [chatSession]);

  const loadChatMessages = async (sessionId) => {
    try {
      const response = await axios.get(`/api/chatbot/messages/${sessionId}/`);
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Error loading chat messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || !chatSession?.session_id) return;

    const userMessage = {
      id: Date.now(),
      message_type: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    const messageToSend = inputMessage;
    setInputMessage('');

    try {
      const response = await axios.post('/api/chatbot/send-message/', {
        session_id: chatSession.session_id,
        message: messageToSend
      });

      const aiMessage = {
        id: response.data.ai_message_id,
        message_type: 'ai',
        content: response.data.ai_response,
        timestamp: response.data.timestamp
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        message_type: 'ai',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <Bot size={24} />
        <div className="chat-info">
          <h3>AI Tutor</h3>
          <p>
            {selectedSubject && subjects.find(s => s.name === selectedSubject)?.display_name}
            {selectedChapter && ` - ${selectedChapter.title}`}
          </p>
        </div>
      </div>

      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="welcome-message">
            <Bot size={48} />
            <h3>Hello! I'm your AI tutor</h3>
            <p>Ask me anything about {selectedSubject}. I'm here to help you learn!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.message_type === 'user' ? 'user-message' : 'ai-message'}`}
            >
              <div className="message-icon">
                {message.message_type === 'user' ? (
                  <User size={20} />
                ) : (
                  <Bot size={20} />
                )}
              </div>
              <div className="message-content">
                <div className="message-text">{message.content}</div>
                <div className="message-time">
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="message ai-message">
            <div className="message-icon">
              <Bot size={20} />
            </div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <div className="input-box">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about your studies..."
            disabled={!chatSession || isLoading}
            rows="1"
            className="message-input"
          />
          <button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || !chatSession || isLoading}
            className="send-button"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;