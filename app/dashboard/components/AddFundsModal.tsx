// app/dashboard/components/AddFundsModal.tsx
'use client';

import React, { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

// Declare Tawk.to API
declare global {
  interface Window {
    Tawk_API: any;
  }
}

interface AddFundsModalProps {
  onClose: () => void;
  onSuccess: (amount: number) => void;
}

export default function AddFundsModal({ onClose, onSuccess }: AddFundsModalProps) {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [usdtAmount, setUsdtAmount] = useState('');
  const [deposit, setDeposit] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // YOUR USDT address - hardcoded or from env
  const COMPANY_USDT_ADDRESS = 'TDavcRJkujU6RXDreuy3942KZHEUvI4iBK';

  const handleAmountSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const usdValue = parseFloat(amount);
      if (usdValue < 10) {
        throw new Error('Minimum deposit is $10 USD');
      }

      // Simple 1:1 conversion (adjust if needed)
      const usdtValue = usdValue.toFixed(2);
      setUsdtAmount(usdtValue);

      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) throw new Error('Please login first');

      // Create deposit record with status 'pending'
      const { data: newDeposit, error: depositError } = await supabase
        .from('deposits')
        .insert({
          user_id: user.id,
          amount_usd: usdValue,
          amount_usdt: usdtValue,
          usdt_address: COMPANY_USDT_ADDRESS,
          status: 'pending'  // Will be manually updated by you
        })
        .select()
        .single();

      if (depositError) throw depositError;

      setDeposit(newDeposit);
      setStep(2);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaymentSent = async () => {
    setLoading(true);
    
    try {
      // Get user email for notification
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      const { data: profile } = await supabase
        .from('profiles')
        .select('email')
        .eq('id', user?.id)
        .single();

      // Format the message for Tawk.to
      const tawkMessage = `
🔔 *NEW PAYMENT NOTIFICATION*
━━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 *Amount:* $${deposit.amount_usd} USDT
👤 *User:* ${profile?.email || 'Unknown'}
🆔 *Deposit ID:* ${deposit.id}
⏰ *Time:* ${new Date().toLocaleString()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️ *ACTION REQUIRED:*
1️⃣ Check your USDT wallet (TRC20)
2️⃣ Verify the amount sent
3️⃣ Go to Supabase admin
4️⃣ Confirm the deposit
━━━━━━━━━━━━━━━━━━━━━━━━━━━
      `.trim();

      // Try to send via Tawk.to with retry mechanism
      let tawkSent = false;
      let retryCount = 0;
      const maxRetries = 5;

      const trySendTawk = () => {
        if (window.Tawk_API && typeof window.Tawk_API.sendMessage === 'function') {
          try {
            // Send as a message to admin
            window.Tawk_API.sendMessage(tawkMessage);
            
            // Also create an event for tracking
            if (window.Tawk_API.addEvent) {
              window.Tawk_API.addEvent('new_payment', {
                amount: deposit.amount_usd,
                userId: user?.id,
                depositId: deposit.id,
                email: profile?.email,
                timestamp: new Date().toISOString()
              }, function(error: any) {
                if (error) console.error('Tawk.to event error:', error);
              });
            }
            
            console.log('✅ Tawk.to message sent successfully');
            tawkSent = true;
            
            // Optional: Maximize chat for immediate attention
            // window.Tawk_API.maximize();
            
            return true;
          } catch (e) {
            console.error('❌ Error sending Tawk.to message:', e);
            return false;
          }
        }
        return false;
      };

      // Try immediately
      if (!trySendTawk()) {
        console.log('⏳ Tawk.to not ready, starting retry mechanism...');
        
        // If not ready, retry a few times
        const interval = setInterval(() => {
          retryCount++;
          console.log(`⏳ Tawk.to retry attempt ${retryCount}/${maxRetries}`);
          
          if (trySendTawk() || retryCount >= maxRetries) {
            clearInterval(interval);
            
            if (!tawkSent) {
              console.log('⚠️ Tawk.to not available after retries, using API fallback');
              
              // Fallback to API endpoint
              fetch('/api/notify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  depositId: deposit.id,
                  userId: deposit.user_id,
                  amount: deposit.amount_usd,
                  userEmail: profile?.email || 'unknown'
                })
              }).catch(err => console.error('Fallback API error:', err));
            }
          }
        }, 1000); // Try every second
      }

      setStep(3);
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="funds-modal">
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="modal-header">
          <h2>💰 Add Funds</h2>
          <p className="subtitle">Deposit USDT to your account</p>
        </div>

        <div className="modal-body">
          {error && (
            <div className="error-message">
              ❌ {error}
            </div>
          )}

          {step === 1 && (
            <form onSubmit={handleAmountSubmit}>
              <div className="form-group">
                <label>Amount (USD)</label>
                <div className="amount-input-group">
                  <span className="currency">$</span>
                  <input
                    type="number"
                    min="10"
                    step="10"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Minimum $10"
                    required
                  />
                </div>
                <p className="input-note">You will send approximately {usdtAmount || '0'} USDT</p>
              </div>

              <button type="submit" className="btn-proceed" disabled={loading}>
                {loading ? 'Creating deposit...' : 'Continue to Payment'}
              </button>
            </form>
          )}

          {step === 2 && deposit && (
            <div className="payment-section">
              <div className="status-section">
                <h3>📤 Send USDT to this address</h3>
                <p>Amount to send: <strong>{deposit.amount_usdt} USDT</strong> (TRC20)</p>
              </div>

              <div className="address-section">
                <label>Deposit Address (TRC20):</label>
                <div className="address-box">
                  <code>{COMPANY_USDT_ADDRESS}</code>
                  <button 
                    className="copy-btn"
                    onClick={() => handleCopy(COMPANY_USDT_ADDRESS)}
                  >
                    {copied ? '✓' : '📋'} Copy
                  </button>
                </div>
              </div>

              <div className="qr-placeholder">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${COMPANY_USDT_ADDRESS}`}
                  alt="Payment QR Code"
                  className="qr-code"
                />
              </div>

              <div className="order-summary">
                <h4>Deposit Summary:</h4>
                <div className="summary-row">
                  <span>Amount USD:</span>
                  <span>${deposit.amount_usd}</span>
                </div>
                <div className="summary-row">
                  <span>Amount USDT:</span>
                  <span>{deposit.amount_usdt} USDT</span>
                </div>
                <div className="summary-row">
                  <span>Network:</span>
                  <span>TRC20</span>
                </div>
                <div className="summary-row">
                  <span>Status:</span>
                  <span className="status-pending">Awaiting payment</span>
                </div>
              </div>

              <div className="instructions">
                <p>⚠️ Send ONLY USDT on TRC20 network to this address</p>
                <p>⏱️ After sending, click the button below</p>
                <p>👨‍💼 Admin will verify and credit your account manually</p>
                <p>💬 You'll receive a chat confirmation from our team</p>
              </div>

              <button 
                className="btn-confirm"
                onClick={handlePaymentSent}
                disabled={loading}
              >
                {loading ? 'Processing...' : "✅ I've Sent the Payment"}
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="confirmation-section">
              <div className="success-icon">⏳</div>
              <h3>Payment Notification Sent!</h3>
              <p>Thank you! Our team has been notified via live chat.</p>
              <div className="info-box">
                <p><strong>Deposit Details:</strong></p>
                <p>💰 Amount: ${deposit?.amount_usd}</p>
                <p>🪙 USDT Sent: {deposit?.amount_usdt} USDT</p>
                <p>📅 Date: {new Date().toLocaleString()}</p>
                <p>🆔 Deposit ID: {deposit?.id}</p>
              </div>
              <div className="tawk-notification">
                <p>💬 <strong>✅ Live chat notification sent!</strong></p>
                <p>Our admin will receive this instantly in their Tawk.to dashboard.</p>
                <p className="small">(Check your Tawk.to dashboard for the message)</p>
              </div>
              <p className="processing-note">
                🔔 An admin will verify your payment and credit your account within 24 hours.<br/>
                You'll see the balance update automatically when processed.<br/>
                Watch for a chat response from our team!
              </p>
              <button className="btn-close" onClick={onClose}>
                Close
              </button>
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
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .funds-modal {
          background: white;
          border-radius: 20px;
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
          z-index: 1;
          transition: color 0.2s;
        }

        .close-btn:hover {
          color: #333;
        }

        .modal-header {
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          color: #0f172a;
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

        .error-message {
          background: #fee2e2;
          color: #dc2626;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 25px;
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

        .amount-input-group input {
          width: 100%;
          padding: 15px 15px 15px 35px;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          font-size: 18px;
          transition: border-color 0.2s;
        }

        .amount-input-group input:focus {
          border-color: #fbbf24;
          outline: none;
        }

        .input-note {
          margin-top: 8px;
          color: #666;
          font-size: 14px;
        }

        .btn-proceed {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-proceed:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(16, 185, 129, 0.3);
        }

        .address-section {
          background: #f8f9fa;
          border-radius: 10px;
          padding: 20px;
          margin: 20px 0;
        }

        .address-section label {
          display: block;
          margin-bottom: 10px;
          font-weight: 600;
          color: #333;
        }

        .address-box {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .address-box code {
          flex: 1;
          background: #2d2d2d;
          color: #10b981;
          padding: 15px;
          border-radius: 8px;
          font-size: 14px;
          word-break: break-all;
          font-family: monospace;
        }

        .copy-btn {
          padding: 15px;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s;
        }

        .copy-btn:hover {
          background: #2563eb;
        }

        .qr-placeholder {
          text-align: center;
          margin: 20px 0;
        }

        .qr-code {
          width: 200px;
          height: 200px;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
        }

        .order-summary {
          background: #f8f9fa;
          border-radius: 10px;
          padding: 20px;
          margin: 20px 0;
        }

        .order-summary h4 {
          color: #333;
          margin-bottom: 10px;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #e0e0e0;
        }

        .summary-row:last-child {
          border-bottom: none;
        }

        .status-pending {
          color: #f59e0b;
          font-weight: 600;
        }

        .instructions {
          background: #fff3cd;
          border: 1px solid #ffeeba;
          color: #856404;
          padding: 15px;
          border-radius: 8px;
          margin: 20px 0;
        }

        .instructions p {
          margin: 5px 0;
        }

        .btn-confirm {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-confirm:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);
        }

        .confirmation-section {
          text-align: center;
          padding: 20px;
        }

        .success-icon {
          font-size: 64px;
          margin-bottom: 20px;
        }

        .info-box {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
          text-align: left;
        }

        .info-box p {
          margin: 8px 0;
          color: #333;
        }

        .tawk-notification {
          background: #e8f4fd;
          border-left: 4px solid #3b82f6;
          padding: 15px;
          border-radius: 8px;
          margin: 15px 0;
          text-align: left;
        }

        .tawk-notification p {
          margin: 5px 0;
          color: #1e40af;
        }

        .tawk-notification .small {
          font-size: 12px;
          color: #64748b;
          margin-top: 8px;
        }

        .processing-note {
          background: #e8f4fd;
          color: #0056b3;
          padding: 15px;
          border-radius: 8px;
          margin: 20px 0;
          font-size: 14px;
          line-height: 1.6;
        }

        .btn-close {
          width: 100%;
          padding: 16px;
          background: #6c757d;
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .btn-close:hover {
          background: #5a6268;
        }

        .status-section {
          text-align: center;
          margin-bottom: 20px;
        }

        .status-section h3 {
          color: #f59e0b;
          margin-bottom: 10px;
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