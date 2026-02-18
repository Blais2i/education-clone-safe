// app/dashboard/components/RefundModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

interface RefundModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function RefundModal({ onClose, onSuccess }: RefundModalProps) {
  const [step, setStep] = useState(1);
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [usdtAddress, setUsdtAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recentDeposits, setRecentDeposits] = useState<any[]>([]);
  const [selectedDeposit, setSelectedDeposit] = useState<string>('');

  const supabase = createClient();

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Get balance
        const { data: profile } = await supabase
          .from('profiles')
          .select('account_balance')
          .eq('id', user.id)
          .single();
        
        if (profile) {
          setBalance(profile.account_balance || 0);
        }

        // Get recent completed deposits for reference
        const { data: deposits } = await supabase
          .from('deposits')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'completed')
          .order('created_at', { ascending: false })
          .limit(5);

        if (deposits) {
          setRecentDeposits(deposits);
        }
      }
    } catch (err) {
      console.error('Error loading user data:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const refundAmount = parseFloat(amount);
      
      if (refundAmount <= 0) {
        throw new Error('Please enter a valid amount');
      }

      if (refundAmount > balance) {
        throw new Error('Refund amount cannot exceed your balance');
      }

      if (!usdtAddress || !usdtAddress.startsWith('T')) {
        throw new Error('Please enter a valid USDT (TRC20) address starting with T');
      }

      if (!reason.trim()) {
        throw new Error('Please provide a reason for refund');
      }

      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('Please login first');

      // Create refund request
      const { data: refund, error: refundError } = await supabase
        .from('refunds')
        .insert({
          user_id: user.id,
          deposit_id: selectedDeposit || null,
          amount: refundAmount,
          reason: reason,
          usdt_address: usdtAddress,
          status: 'pending'
        })
        .select()
        .single();

      if (refundError) throw refundError;

      // Temporarily hold the amount (optional)
      // You might want to mark this amount as pending in a separate column

      setStep(2);
      
      // Auto close after 3 seconds on success
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 3000);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="refund-modal">
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="modal-header">
          <h2>↩️ Request Refund</h2>
          <p className="subtitle">We'll send USDT back to your wallet</p>
        </div>

        <div className="modal-body">
          {/* Current Balance Display */}
          <div className="balance-display">
            <span className="balance-label">Your Balance:</span>
            <span className="balance-amount">${balance.toFixed(2)}</span>
          </div>

          {error && (
            <div className="error-message">
              ❌ {error}
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleSubmit}>
              {/* Recent Deposits (Optional) */}
              {recentDeposits.length > 0 && (
                <div className="form-group">
                  <label>Select Previous Deposit (Optional)</label>
                  <select 
                    value={selectedDeposit} 
                    onChange={(e) => setSelectedDeposit(e.target.value)}
                    className="select-input"
                  >
                    <option value="">Manual refund amount</option>
                    {recentDeposits.map(deposit => (
                      <option key={deposit.id} value={deposit.id}>
                        ${deposit.amount_usd} - {new Date(deposit.created_at).toLocaleDateString()}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Refund Amount */}
              <div className="form-group">
                <label>Refund Amount (USD)</label>
                <div className="amount-input-group">
                  <span className="currency">$</span>
                  <input
                    type="number"
                    min="30"
                    max={balance}
                    step="1"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder={`Max $${balance}`}
                    required
                  />
                </div>
                <p className="input-note">Maximum refund: ${balance.toFixed(2)}</p>
              </div>

              {/* USDT Address for Refund */}
              <div className="form-group">
                <label>Your USDT (TRC20) Address</label>
                <input
                  type="text"
                  value={usdtAddress}
                  onChange={(e) => setUsdtAddress(e.target.value)}
                  placeholder="TYourUSDTAddressHere..."
                  required
                  className="text-input"
                />
                <p className="input-note">We'll send refund to this USDT address on TRC20 network</p>
              </div>

              {/* Refund Reason */}
              <div className="form-group">
                <label>Reason for Refund</label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Please explain why you're requesting a refund..."
                  required
                  rows={4}
                  className="text-input"
                />
              </div>

              {/* Warning Message */}
              <div className="warning-box">
                <strong>⚠️ Important:</strong>
                <ul>
                  <li>Refunds are processed within 24-48 hours</li>
                  <li>Amount will be deducted from your balance immediately</li>
                  <li>USDT will be sent to the address you provide</li>
                  <li>Make sure your USDT address is correct</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="action-buttons">
                <button type="button" className="btn-cancel" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? 'Processing...' : 'Request Refund'}
                </button>
              </div>
            </form>
          ) : (
            <div className="success-section">
              <div className="success-icon">✅</div>
              <h3>Refund Request Submitted!</h3>
              <p>Your refund request has been received.</p>
              <p className="success-details">
                Amount: <strong>${amount}</strong><br />
                Status: <span className="status-pending">Pending Review</span>
              </p>
              <p className="info-text">
                We'll process your refund within 24-48 hours and send USDT to:<br />
                <code className="address-display">{usdtAddress}</code>
              </p>
              <p className="closing-note">This window will close automatically...</p>
            </div>
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
          z-index: 10000;
          padding: 15px;
        }

        .refund-modal {
          background: white;
          border-radius: 20px;
          width: 100%;
          max-width: 550px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
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
          z-index: 1;
        }

        .modal-header {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: white;
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

        .balance-display {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 25px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: white;
        }

        .balance-label {
          font-size: 16px;
          font-weight: 500;
        }

        .balance-amount {
          font-size: 24px;
          font-weight: 700;
        }

        .error-message {
          background: #fee2e2;
          color: #dc2626;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 20px;
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

        .amount-input-group {
          position: relative;
          display: flex;
          align-items: center;
        }

        .currency {
          position: absolute;
          left: 15px;
          font-size: 18px;
          font-weight: 600;
          color: #666;
        }

        .amount-input-group input,
        .text-input,
        .select-input {
          width: 100%;
          padding: 12px 15px 12px 35px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 16px;
        }

        .text-input, .select-input {
          padding: 12px 15px;
        }

        .amount-input-group input:focus,
        .text-input:focus,
        .select-input:focus {
          border-color: #ef4444;
          outline: none;
        }

        .input-note {
          margin-top: 5px;
          color: #666;
          font-size: 13px;
        }

        textarea.text-input {
          resize: vertical;
          min-height: 100px;
        }

        .warning-box {
          background: #fff3cd;
          border: 1px solid #ffeeba;
          color: #856404;
          padding: 15px;
          border-radius: 8px;
          margin: 20px 0;
        }

        .warning-box ul {
          margin-top: 10px;
          margin-left: 20px;
        }

        .warning-box li {
          margin: 5px 0;
        }

        .action-buttons {
          display: flex;
          gap: 10px;
          margin-top: 25px;
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
        }

        .btn-submit {
          flex: 2;
          padding: 15px;
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
        }

        .btn-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(239, 68, 68, 0.3);
        }

        .btn-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .success-section {
          text-align: center;
          padding: 20px;
        }

        .success-icon {
          font-size: 64px;
          margin-bottom: 20px;
        }

        .success-section h3 {
          font-size: 24px;
          color: #10b981;
          margin-bottom: 10px;
        }

        .success-details {
          background: #f3f4f6;
          padding: 15px;
          border-radius: 8px;
          margin: 20px 0;
        }

        .status-pending {
          color: #f59e0b;
          font-weight: 600;
        }

        .address-display {
          display: inline-block;
          background: #1f2937;
          color: #10b981;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 12px;
          margin-top: 10px;
          word-break: break-all;
        }

        .info-text {
          color: #4b5563;
          margin: 15px 0;
        }

        .closing-note {
          color: #9ca3af;
          font-size: 14px;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
}