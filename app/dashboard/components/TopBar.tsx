'use client';

import React from 'react';
import './TopBar.css';

export default function TopBar() {
  return (
    <div className="top-bar">
      <div className="top-bar-content">
        <div className="account-balance">
          <span>Account Balance: $0.00</span>
        </div>
        <div className="top-actions">
          <button className="btn-primary">Add Funds</button>
          <button className="btn-secondary">Refund</button>
          <div className="user-menu">
            <div className="user-avatar">
              <span>U</span>
            </div>
            <span>Hi, User</span>
          </div>
        </div>
      </div>
    </div>
  );
}