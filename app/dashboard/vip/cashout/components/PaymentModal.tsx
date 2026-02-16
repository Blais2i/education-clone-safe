// app/dashboard/vip/cashout/components/PaymentModal.tsx
'use client';

import React, { useState } from 'react';

interface PaymentModalProps {
  amount: number;
  fee: number;
  youReceive: number;
  address: string;
  cryptoType: string;
  onClose: () => void;
  onComplete: () => void;
}

export default function PaymentModal({ 
  amount, 
  fee, 
  youReceive, 
  address, 
  cryptoType,
  onClose, 
  onComplete 
}: PaymentModalProps) {
  const [step, setStep] = useState(1);
  
  // Generate a random order ID
  const orderId = React.useMemo(() => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return `VIP-${result}-${Math.floor(Math.random() * 1000)}`;
  }, []);

  const handleConfirm = () => {
    setStep(2);
  };

  return (
    <div className="modal-overlay">
      <div className="payment-modal">
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="modal-header">
          <h2>💸 VIP Cash-Out Service</h2>
          <p className="subtitle">Confirm your cash-out request</p>
        </div>

        <div className="modal-body">
          {step === 1 ? (
            <>
              {/* Order Summary */}
              <div className="order-summary">
                <h3>Order Summary</h3>
                
                <div className="summary-row">
                  <span>Order ID:</span>
                  <span className="order-id">{orderId}</span>
                </div>
                
                <div className="summary-row">
                  <span>Cash-Out Amount:</span>
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
                
                <div className="summary-row">
                  <span>Crypto Type:</span>
                  <span>{cryptoType}</span>
                </div>
                
                <div className="summary-row address-row">
                  <span>Your Wallet:</span>
                  <span className="wallet-address">{address}</span>
                </div>
              </div>

              {/* Security Information */}
              <div className="security-info">
                <h4>🛡️ How We Process Your Cash-Out</h4>
                <ul>
                  <li>✅ Funds will be sent from multiple addresses across different regions</li>
                  <li>✅ Each transaction uses a unique routing path for maximum security</li>
                  <li>✅ Processing time: 24-48 hours</li>
                  <li>✅ You will receive confirmation when funds are sent</li>
                </ul>
              </div>

              {/* Balance Deduction Notice */}
              <div className="balance-notice">
                <p>⚠️ The full amount (${amount.toLocaleString()}) will be deducted from your account balance immediately.</p>
              </div>

              {/* Action Buttons */}
              <div className="action-buttons">
                <button className="btn-cancel" onClick={onClose}>
                  Cancel
                </button>
                <button className="btn-confirm" onClick={handleConfirm}>
                  Confirm Cash-Out
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Success Message */}
              <div className="success-section">
                <div className="success-icon">✅</div>
                <h2>Request Confirmed!</h2>
                
                <div className="confirmation-details">
                  <p>Your cash-out request has been received.</p>
                  <p className="order-id-display">Order ID: {orderId}</p>
                </div>

                <div className="processing-timeline">
                  <h4>What happens next?</h4>
                  <div className="timeline-steps">
                    <div className="timeline-step">
                      <span className="step-number">1</span>
                      <span className="step-text">We split your funds across multiple addresses</span>
                    </div>
                    <div className="timeline-step">
                      <span className="step-number">2</span>
                      <span className="step-text">Funds are routed through different regions</span>
                    </div>
                    <div className="timeline-step">
                      <span className="step-number">3</span>
                      <span className="step-text">Crypto sent to your wallet (24-48 hours)</span>
                    </div>
                  </div>
                </div>

                <div className="address-confirmation">
                  <p>💸 Sending to:</p>
                  <code className="address-code">{address}</code>
                </div>

                <button className="btn-complete" onClick={onComplete}>
                  Return to Dashboard
                </button>
              </div>
            </>
          )}
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

        .payment-modal {
          background: white;
          border-radius: 20px;
          width: 100%;
          max-width: 600px;
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
          margin-bottom: 5px;
        }

        .subtitle {
          opacity: 0.9;
          font-size: 16px;
        }

        .modal-body {
          padding: 30px;
        }

        .order-summary {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 25px;
          margin-bottom: 25px;
        }

        .order-summary h3 {
          color: #333;
          margin-bottom: 20px;
          font-size: 18px;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid #e0e0e0;
        }

        .summary-row:last-child {
          border-bottom: none;
        }

        .order-id {
          font-family: monospace;
          color: #ffd700;
          font-weight: bold;
        }

        .amount {
          font-weight: 600;
          color: #333;
        }

        .fee-amount {
          color: #dc3545;
          font-weight: 600;
        }

        .receive-amount {
          color: #28a745;
          font-weight: bold;
          font-size: 18px;
        }

        .wallet-address {
          font-family: monospace;
          font-size: 12px;
          color: #666;
          word-break: break-all;
          max-width: 250px;
          text-align: right;
        }

        .security-info {
          background: #e8f4fd;
          border-radius: 10px;
          padding: 20px;
          margin-bottom: 20px;
        }

        .security-info h4 {
          color: #0056b3;
          margin-bottom: 15px;
        }

        .security-info ul {
          list-style: none;
          padding: 0;
        }

        .security-info li {
          padding: 8px 0;
          color: #0056b3;
          font-size: 14px;
        }

        .balance-notice {
          background: #fff3cd;
          border: 1px solid #ffeeba;
          color: #856404;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 25px;
        }

        .action-buttons {
          display: flex;
          gap: 15px;
        }

        .btn-cancel {
          flex: 1;
          padding: 15px;
          background: #f3f4f6;
          color: #4b5563;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-cancel:hover {
          background: #e5e7eb;
        }

        .btn-confirm {
          flex: 2;
          padding: 15px;
          background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-confirm:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(40, 167, 69, 0.3);
        }

        .success-section {
          text-align: center;
          padding: 20px;
        }

        .success-icon {
          font-size: 64px;
          margin-bottom: 20px;
        }

        .success-section h2 {
          font-size: 28px;
          color: #28a745;
          margin-bottom: 15px;
        }

        .confirmation-details {
          margin-bottom: 30px;
        }

        .order-id-display {
          font-family: monospace;
          color: #ffd700;
          font-weight: bold;
          background: #f8f9fa;
          padding: 10px;
          border-radius: 8px;
          margin-top: 10px;
        }

        .processing-timeline {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 25px;
          margin: 25px 0;
          text-align: left;
        }

        .processing-timeline h4 {
          color: #333;
          margin-bottom: 20px;
          text-align: center;
        }

        .timeline-steps {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .timeline-step {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .step-number {
          width: 30px;
          height: 30px;
          background: #ffd700;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: #000;
        }

        .step-text {
          color: #333;
          font-size: 14px;
        }

        .address-confirmation {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
        }

        .address-confirmation p {
          color: #666;
          margin-bottom: 10px;
        }

        .address-code {
          display: block;
          background: #2d2d2d;
          color: #28a745;
          padding: 15px;
          border-radius: 8px;
          font-size: 14px;
          word-break: break-all;
          font-family: monospace;
        }

        .btn-complete {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #333, #000);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 20px;
        }

        .btn-complete:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 600px) {
          .modal-header {
            padding: 20px;
          }

          .modal-body {
            padding: 20px;
          }

          .action-buttons {
            flex-direction: column;
          }

          .wallet-address {
            max-width: 150px;
          }
        }
      `}</style>
    </div>
  );
}