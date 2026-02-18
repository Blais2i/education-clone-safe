// app/dashboard/components/ChatWidget.tsx
'use client';

import React, { useState, useEffect } from 'react';
import './ChatWidget.css';

declare global {
  interface Window {
    Tawk_API: any;
  }
}

export default function ChatWidget() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if Tawk.to is loaded
    const checkTawk = setInterval(() => {
      if (window.Tawk_API) {
        setIsReady(true);
        
        try {
          // Get unread count
          const count = window.Tawk_API.getUnreadCount?.() || 0;
          setUnreadCount(count);
        } catch (e) {
          console.log('Tawk.to not fully ready');
        }
        clearInterval(checkTawk);
      }
    }, 1000);

    return () => clearInterval(checkTawk);
  }, []);

  const openChat = () => {
    if (window.Tawk_API && window.Tawk_API.maximize) {
      window.Tawk_API.maximize();
    } else {
      // Fallback - open in new tab
      window.open('https://tawk.to/chat/6994366d73d8cb1c357e385a/1jhlf97p4', '_blank');
    }
  };

  return (
    <div className="chat-widget" onClick={openChat}>
      <div className="chat-bubble">
        {unreadCount > 0 && (
          <span className="chat-notification">{unreadCount}</span>
        )}
        <svg viewBox="0 0 24 24" fill="white" width="30" height="30">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
        </svg>
      </div>
      <p className="chat-text">
        {isReady ? '💬 Chat with us' : '⚫ Loading chat...'}
      </p>
    </div>
  );
}