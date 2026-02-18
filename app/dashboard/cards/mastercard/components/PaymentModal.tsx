// app/dashboard/cards/mastercard/components/PaymentModal.tsx
'use client';

import React, { useState } from 'react';

interface PaymentModalProps {
  item: any;
  email: string;
  onClose: () => void;
  onComplete: () => void;
}

export default function PaymentModal({ item, email, onClose, onComplete }: PaymentModalProps) {
  const [copied, setCopied] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState('TRC20');
  
  // Generate a random order ID
  const orderId = React.useMemo(() => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return `${result}-${Math.floor(Math.random() * 1000)}-${result.slice(0,4)}-${result.slice(0,4)}2n`;
  }, []);

  const usdtAddress = 'TDavcRJkujU6RXDreuy3942KZHEUvf4iBK';
  const minDeposit = 0.01;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-overlay">
      <div className="payment-modal">
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="modal-header">
          <h2>💰 Cards City</h2>
          <p className="subtitle">Complete your payment</p>
        </div>

        <div className="modal-body">
          {/* Awaiting Payment Status */}
          <div className="status-section">
            <h3>⏳ Awaiting payment...</h3>
            <p className="payment-method">
              You are paying with <strong>USDT (TRC20)</strong>
            </p>
          </div>

          {/* Order ID */}
          <div className="order-section">
            <label>ORDER ID:</label>
            <div className="order-id-box">
              <code>{orderId}</code>
              <button 
                className="copy-btn"
                onClick={() => handleCopy(orderId)}
              >
                {copied ? '✓' : '📋'} Copy
              </button>
            </div>
          </div>

          {/* Network Selection */}
          <div className="network-section">
            <label>Select Network:</label>
            <div className="network-buttons">
              <button 
                className={`network-btn ${selectedNetwork === 'TRC20' ? 'active' : ''}`}
                onClick={() => setSelectedNetwork('TRC20')}
              >
                <span className="network-name">TRX</span>
                <span className="network-desc">Tron (TRC20)</span>
              </button>
            </div>
          </div>

          {/* Payment Address */}
          <div className="address-section">
            <label>Deposit Address:</label>
            <div className="address-box">
              <code>{usdtAddress}</code>
              <button 
                className="copy-btn"
                onClick={() => handleCopy(usdtAddress)}
              >
                {copied ? '✓' : '📋'} Copy
              </button>
            </div>
            
            {/* QR Code placeholder */}
            <div className="qr-placeholder">
              <button className="btn-scan">
                <span className="qr-icon">📱</span> Scan QR Code
              </button>
            </div>
          </div>

          {/* Minimum Deposit */}
          <div className="min-deposit">
            <div className="min-label">Minimum deposit</div>
            <div className="min-amount">{minDeposit} USDT</div>
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <h4>Order Summary:</h4>
            <div className="summary-row">
              <span>Item:</span>
              <span>Mastercard {item.cardType}</span>
            </div>
            <div className="summary-row">
              <span>Bank:</span>
              <span>{item.bank}</span>
            </div>
            <div className="summary-row">
              <span>Balance:</span>
              <span>${item.balance.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Price:</span>
              <span className="price">${item.price}</span>
            </div>
            <div className="summary-row">
              <span>Delivery email:</span>
              <span className="email">{email}</span>
            </div>
          </div>

          {/* Instructions */}
          <div className="instructions">
            <p>📌 Copy the address above or scan QR code to ensure you're paying to the correct address.</p>
            <p>⚠️ Send only USDT on TRC20 network to this address. Sending any other asset may result in loss.</p>
            <p>⏱️ Payment will be confirmed after network confirmation. Card details will be sent to your email within 15 minutes.</p>
          </div>

          {/* Support */}
          <div className="support-section">
            <p>Got an issue? <button className="support-link">Email us</button></p>
          </div>

          {/* Complete Button (for demo) */}
          <button 
            className="btn-complete"
            onClick={onComplete}
          >
            I've Sent Payment
          </button>
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          animation: fadeIn 0.3s ease;
          padding: 15px;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .payment-modal {
          background: white;
          border-radius: 20px;
          width: 100%;
          max-width: 550px;
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
          padding: 30px 30px 20px;
          border-radius: 20px 20px 0 0;
        }

        .modal-header h2 {
          font-size: 28px;
          margin-bottom: 5px;
        }

        .subtitle {
          opacity: 0.9;
          font-size: 16px;
        }

        .modal-body {
          padding: 30px;
        }

        .status-section {
          text-align: center;
          margin-bottom: 25px;
        }

        .status-section h3 {
          color: #f39c12;
          font-size: 22px;
          margin-bottom: 10px;
        }

        .payment-method {
          color: #666;
          font-size: 16px;
        }

        .order-section {
          background: #f8f9fa;
          border-radius: 10px;
          padding: 15px;
          margin-bottom: 20px;
        }

        .order-section label {
          display: block;
          color: #666;
          font-size: 14px;
          margin-bottom: 8px;
          font-weight: 600;
        }

        .order-id-box {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .order-id-box code {
          flex: 1;
          background: #2d2d2d;
          color: #ffd700;
          padding: 12px 15px;
          border-radius: 8px;
          font-size: 14px;
          font-family: monospace;
          word-break: break-all;
        }

        .network-section {
          margin-bottom: 20px;
        }

        .network-section label {
          display: block;
          color: #333;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .network-buttons {
          display: flex;
          gap: 10px;
        }

        .network-btn {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 15px;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          background: white;
          cursor: pointer;
          transition: all 0.2s;
        }

        .network-btn.active {
          border-color: #ff6b6b;
          background: #fff0f0;
        }

        .network-name {
          font-weight: 700;
          color: #333;
          font-size: 18px;
        }

        .network-desc {
          font-size: 12px;
          color: #666;
        }

        .address-section {
          background: #f8f9fa;
          border-radius: 10px;
          padding: 15px;
          margin-bottom: 20px;
        }

        .address-section label {
          display: block;
          color: #666;
          font-size: 14px;
          margin-bottom: 8px;
          font-weight: 600;
        }

        .address-box {
          display: flex;
          gap: 10px;
          align-items: center;
          margin-bottom: 15px;
        }

        .address-box code {
          flex: 1;
          background: #2d2d2d;
          color: #28a745;
          padding: 12px 15px;
          border-radius: 8px;
          font-size: 14px;
          font-family: monospace;
          word-break: break-all;
        }

        .copy-btn {
          padding: 8px 15px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s;
        }

        .copy-btn:hover {
          background: #0056b3;
        }

        .qr-placeholder {
          display: flex;
          justify-content: center;
        }

        .btn-scan {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 25px;
          background: white;
          border: 2px dashed #ff6b6b;
          border-radius: 8px;
          color: #ff6b6b;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-scan:hover {
          background: #fff0f0;
        }

        .qr-icon {
          font-size: 20px;
        }

        .min-deposit {
          background: linear-gradient(135deg, #f39c12 0%, #f1c40f 100%);
          border-radius: 10px;
          padding: 20px;
          text-align: center;
          margin-bottom: 25px;
        }

        .min-label {
          color: #333;
          font-size: 14px;
          margin-bottom: 5px;
        }

        .min-amount {
          color: #333;
          font-size: 24px;
          font-weight: 700;
        }

        .order-summary {
          background: #f8f9fa;
          border-radius: 10px;
          padding: 20px;
          margin-bottom: 20px;
        }

        .order-summary h4 {
          color: #333;
          margin-bottom: 15px;
          font-size: 16px;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #e0e0e0;
        }

        .summary-row:last-child {
          border-bottom: none;
        }

        .summary-row span:first-child {
          color: #666;
        }

        .summary-row span:last-child {
          font-weight: 600;
          color: #333;
        }

        .price {
          color: #28a745 !important;
          font-size: 18px;
        }

        .email {
          color: #007bff !important;
        }

        .instructions {
          background: #e8f4fd;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 20px;
        }

        .instructions p {
          color: #0056b3;
          margin: 8px 0;
          font-size: 14px;
          line-height: 1.5;
        }

        .support-section {
          text-align: center;
          margin-bottom: 20px;
          padding: 15px;
          border-top: 1px solid #e0e0e0;
        }

        .support-link {
          background: none;
          border: none;
          color: #007bff;
          font-weight: 600;
          cursor: pointer;
          text-decoration: underline;
        }

        .btn-complete {
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

        .btn-complete:hover {
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

          .address-box {
            flex-direction: column;
          }

          .address-box code {
            width: 100%;
            text-align: center;
          }

          .copy-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}