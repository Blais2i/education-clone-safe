'use client';

import React from 'react';
import './ChatWidget.css';

export default function ChatWidget() {
  return (
    <div className="chat-widget">
      <div className="chat-bubble">
        <span className="chat-notification">1</span>
        <svg viewBox="0 0 24 24" fill="white" width="30" height="30">
          <path d="M12 2C6.5 2 2 6.5 2 12c0 2.3.8 4.5 2.3 6.3L2 22l3.7-2.3C7.5 21.2 9.7 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2z"/>
        </svg>
      </div>
      <p className="chat-text">We Are Here!</p>
    </div>
  );
}