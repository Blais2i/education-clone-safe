// app/dashboard/vip/cashout/components/AddressModal.tsx
'use client';

import React, { useState } from 'react';

interface AddressModalProps {
  amount: number;
  fee: number;
  youReceive: number;
  onClose: () => void;
  onSubmit: (address: string, cryptoType: string) => void;
}

export default function AddressModal({ amount, fee, youReceive, onClose, onSubmit }: AddressModalProps) {
  const [address, setAddress] = useState('');
  const [cryptoType, setCryptoType] = useState('USDT (TRC20)');
  const [error, setError] = useState('');

  const cryptoOptions = [
    'USDT (TRC20)',
    'USDT (ERC20)',
    'BTC',
    'ETH'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation based on crypto type
    if (!address.trim()) {
      setError('Please enter your wallet address');
      return;
    }

    if (cryptoType === 'USDT (TRC20)' && !address.startsWith('T')) {
      setError('USDT TRC20 addresses should start with "T"');
      return;
    }

    if (cryptoType === 'USDT (ERC20)' && !address.startsWith('0x')) {
      setError('USDT ERC20 addresses should start with "0x"');
      return;
    }

    if (cryptoType === 'BTC' && !address.startsWith('1') && !address.startsWith('3') && !address.startsWith('bc1')) {
      setError('Please enter a valid Bitcoin address');
      return;
    }

    if (cryptoType === 'ETH' && !address.startsWith('0x')) {
      setError('Ethereum addresses should start with "0x"');
      return;
    }

    onSubmit(address, cryptoType);
  };

  return (
    <div className="modal-overlay">
      <div className="address-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <h2>💸 VIP Cash-Out Service</h2>
          <p className="welcome-text">Hello 👋 user,</p>
        </div>

        <div className="modal-body">
          <p className="instruction">
            Please provide your crypto wallet address where we will send your funds.
            We use multiple addresses across different regions for maximum security.
          </p>

          <div className="transaction-summary">
            <h3>Transaction Summary:</h3>
            <div className="summary-details">
              <div className="summary-row">
                <span>Amount to Cash Out:</span>
                <span className="amount">${amount.toLocaleString()}</span>
              </div>
              <div className="summary-row fee">
                <span>50% Service Fee:</span>
                <span className="fee-amount">-${fee.toLocaleString()}</span>
              </div>
              <div className="summary-row total">
                <span>You Will Receive:</span>
                <span className="receive-amount">${youReceive.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="cryptoType">Select Cryptocurrency</label>
              <select
                id="cryptoType"
                value={cryptoType}
                onChange={(e) => {
                  setCryptoType(e.target.value);
                  setError('');
                }}
                className="crypto-select"
                required
              >
                {cryptoOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="address">Your Wallet Address</label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  setError('');
                }}
                placeholder={
                  cryptoType === 'USDT (TRC20)' ? 'TYourAddressHere...' :
                  cryptoType === 'BTC' ? '1YourBitcoinAddress...' :
                  '0xYourEthereumAddress...'
                }
                required
              />
              {error && <span className="error">{error}</span>}
              <p className="input-note">
                {cryptoType === 'USDT (TRC20)' && 'TRC20 addresses start with "T"'}
                {cryptoType === 'USDT (ERC20)' && 'ERC20 addresses start with "0x"'}
                {cryptoType === 'BTC' && 'Bitcoin addresses start with 1, 3, or bc1'}
                {cryptoType === 'ETH' && 'Ethereum addresses start with "0x"'}
              </p>
            </div>

            <div className="security-note">
              <p>🔒 Your funds will be sent from multiple addresses across different regions for maximum security and anonymity.</p>
            </div>

            <button type="submit" className="btn-proceed">
              Proceed to Confirmation →
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
          background: rgba(0, 0, 0, 0.8);
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

        .address-modal {
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
          background: linear-gradient(135deg, #ffd700 0%, #ffa500 100%);
          color: #000;
          padding: 30px;
          border-radius: 20px 20px 0 0;
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

        .transaction-summary {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 25px;
          border-left: 4px solid #ffd700;
        }

        .transaction-summary h3 {
          color: #333;
          font-size: 16px;
          margin-bottom: 15px;
        }

        .summary-details {
          display: flex;
          flex-direction: column;
          gap: 10px;
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

        .summary-row.fee .fee-amount {
          color: #dc3545;
          font-weight: 600;
        }

        .summary-row.total {
          font-weight: bold;
          font-size: 18px;
          padding-top: 10px;
        }

        .receive-amount {
          color: #28a745;
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

        .crypto-select,
        .form-group input {
          width: 100%;
          padding: 14px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          font-size: 15px;
          transition: all 0.3s;
        }

        .crypto-select:focus,
        .form-group input:focus {
          outline: none;
          border-color: #ffd700;
          box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.1);
        }

        .error {
          color: #dc3545;
          font-size: 14px;
          margin-top: 5px;
          display: block;
        }

        .input-note {
          margin-top: 5px;
          color: #666;
          font-size: 13px;
        }

        .security-note {
          background: #e8f4fd;
          border-radius: 8px;
          padding: 15px;
          margin: 20px 0;
        }

        .security-note p {
          color: #0056b3;
          margin: 0;
          font-size: 14px;
          line-height: 1.5;
        }

        .btn-proceed {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #ffd700 0%, #ffa500 100%);
          color: #000;
          border: none;
          border-radius: 10px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-proceed:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 20px rgba(255, 215, 0, 0.3);
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