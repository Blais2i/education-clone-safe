// app/dashboard/cards/mastercard/components/EmailModal.tsx
'use client';

import React, { useState } from 'react';

interface EmailModalProps {
  item: any;
  onClose: () => void;
  onSubmit: (email: string) => void;
}

export default function EmailModal({ item, onClose, onSubmit }: EmailModalProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address');
      return;
    }

    onSubmit(email);
  };

  return (
    <div className="modal-overlay">
      <div className="email-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <h2>📧 Cards City</h2>
          <p className="welcome-text">Hello 👋 user,</p>
        </div>

        <div className="modal-body">
          <p className="instruction">
            Before you proceed to fund your account, kindly put email address 
            where you will receive details of the items you purchased.
          </p>

          <div className="product-summary">
            <h3>Selected Item:</h3>
            <div className="summary-details">
              <p><strong>Bank:</strong> {item.bank}</p>
              <p><strong>Card Type:</strong> {item.cardType} {item.level}</p>
              <p><strong>Balance:</strong> ${item.balance.toLocaleString()}</p>
              <p><strong>Price:</strong> ${item.price}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Your email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@domain.com"
                required
              />
              {error && <span className="error">{error}</span>}
            </div>

            <p className="note">
              N/B: Items purchased, come with required details for cash out, 
              all items details will be send to email you provided above.
            </p>

            <button type="submit" className="btn-proceed">
              Proceed to checkout →
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          padding: 15px;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .email-modal {
          background: white;
          border-radius: 15px;
          width: 100%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .close-btn {
          position: absolute;
          top: 15px;
          right: 20px;
          background: none;
          border: none;
          font-size: 28px;
          cursor: pointer;
          color: #999;
          transition: color 0.2s;
          z-index: 1;
        }

        .close-btn:hover {
          color: #333;
        }

        .modal-header {
          background: linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%);
          color: white;
          padding: 30px;
          border-radius: 15px 15px 0 0;
        }

        .modal-header h2 {
          font-size: 28px;
          margin-bottom: 10px;
        }

        .welcome-text {
          font-size: 18px;
          opacity: 0.9;
        }

        .modal-body {
          padding: 30px;
        }

        .instruction {
          color: #333;
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 25px;
        }

        .product-summary {
          background: #f8f9fa;
          border-radius: 10px;
          padding: 20px;
          margin-bottom: 25px;
          border-left: 4px solid #28a745;
        }

        .product-summary h3 {
          color: #333;
          font-size: 16px;
          margin-bottom: 15px;
        }

        .summary-details p {
          margin: 8px 0;
          color: #555;
        }

        .summary-details strong {
          color: #333;
          min-width: 90px;
          display: inline-block;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #333;
        }

        .form-group input {
          width: 100%;
          padding: 14px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 16px;
          transition: all 0.3s;
        }

        .form-group input:focus {
          outline: none;
          border-color: #ff6b6b;
          box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1);
        }

        .error {
          color: #dc3545;
          font-size: 14px;
          margin-top: 5px;
          display: block;
        }

        .note {
          background: #fff3cd;
          border: 1px solid #ffeeba;
          color: #856404;
          padding: 15px;
          border-radius: 8px;
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 25px;
        }

        .btn-proceed {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-proceed:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 20px rgba(40, 167, 69, 0.3);
        }

        @media (max-width: 600px) {
          .modal-header {
            padding: 20px;
          }

          .modal-body {
            padding: 20px;
          }

          .modal-header h2 {
            font-size: 24px;
          }
        }
      `}</style>
    </div>
  );
}