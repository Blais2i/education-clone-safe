// app/dashboard/vip/cashout/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import AddressModal from './components/AddressModal';
import PaymentModal from './components/PaymentModal';

export default function CashOutPage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerCryptoType, setCustomerCryptoType] = useState('USDT (TRC20)');
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  
  const supabase = createClient();

  // Available cash-out amounts
  const amountOptions = [500, 1000, 2000, 3000, 5000, 7500, 10000];

  useEffect(() => {
    loadUserBalance();
  }, []);

  const loadUserBalance = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('account_balance')
        .eq('id', user.id)
        .single();
      
      if (profile) {
        setBalance(profile.account_balance);
      }
    }
    setLoading(false);
  };

  const calculateFee = (amount: number) => {
    return amount * 0.5; // 50% fee
  };

  const calculateYouReceive = (amount: number) => {
    return amount * 0.5; // You receive 50%
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setShowAddressModal(true);
  };

  const handleAddressSubmit = (address: string, cryptoType: string) => {
    setCustomerAddress(address);
    setCustomerCryptoType(cryptoType);
    setShowAddressModal(false);
    setShowPaymentModal(true);
  };

  const handlePaymentComplete = async () => {
    if (!selectedAmount || !customerAddress) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;

      const fee = calculateFee(selectedAmount);
      const youReceive = calculateYouReceive(selectedAmount);

      // Create order in database
      await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          amount: selectedAmount,
          fee: fee,
          you_receive: youReceive,
          status: 'pending',
          payment_method: 'account_balance',
          crypto_address: customerAddress,
          crypto_type: customerCryptoType,
          order_type: 'vip_cashout'
        });

      // Deduct from balance
      if (balance) {
        await supabase
          .from('profiles')
          .update({ account_balance: balance - selectedAmount })
          .eq('id', user.id);
        
        setBalance(balance - selectedAmount);
      }

    } catch (error) {
      console.error('Error creating order:', error);
    }

    setShowPaymentModal(false);
    setSelectedAmount(null);
    setCustomerAddress('');
  };

  return (
    <div className="cashout-container">
      <div className="cashout-header">
        <h1>💸 VIP Cash-Out Service</h1>
        <p className="cashout-subtitle">Professional money transfer - We send crypto to your wallet</p>
      </div>

      {/* CLEAR EXPLANATION SECTION - Why VIP is Different */}
      <div className="explanation-section">
        <h2>🎯 Why Our VIP Service is Different</h2>
        
        <div className="explanation-grid">
          <div className="explanation-card highlight">
            <div className="explanation-icon">🔐</div>
            <h3>The Problem</h3>
            <p>Most people buy bank logs and cards but struggle to cash out due to advanced bank security and lack of knowledge. Banks now have sophisticated tracking systems that can flag suspicious transactions.</p>
          </div>

          <div className="explanation-card highlight">
            <div className="explanation-icon">🛡️</div>
            <h3>Our Solution</h3>
            <p>We transfer money from bank logs/cards to your crypto wallet using multiple addresses across different regions. This makes it extremely difficult for law enforcement to track the funds.</p>
          </div>

          <div className="explanation-card highlight">
            <div className="explanation-icon">⚠️</div>
            <h3>Why Not Just Use Your Own Address?</h3>
            <p>If all funds go to a single address, it becomes easy to detect and trace. Law enforcement can quickly connect transactions when people report fraud. We distribute funds across different regions to break the chain of tracking.</p>
          </div>

          <div className="explanation-card highlight">
            <div className="explanation-icon">💰</div>
            <h3>Why 50% Fee?</h3>
            <p>This covers our risk and time. We're putting ourselves at legal risk to help you cash out safely. The high fee also prevents people from wasting our time - this ensures only serious clients use the service.</p>
          </div>
        </div>

        <div className="important-note">
          <h4>⚠️ Important Information:</h4>
          <ul>
            <li>✅ Funds are sent from multiple addresses across different countries</li>
            <li>✅ You receive crypto (USDT/BTC/ETH) in your personal wallet</li>
            <li>✅ The 50% fee includes all risk coverage and processing</li>
            <li>✅ We never send to the same address twice - each transaction uses a new route</li>
            <li>✅ Process takes 24-48 hours for maximum security</li>
          </ul>
        </div>
      </div>

      {/* Balance Display */}
      <div className="balance-section">
        <div className="balance-card">
          <span className="balance-label">Your Account Balance</span>
          <span className="balance-amount">
            ${loading ? '...' : balance?.toFixed(2) || '0.00'}
          </span>
        </div>
      </div>

      {/* Amount Selection */}
      <div className="amount-section">
        <h2>Select Amount to Cash Out</h2>
        <p className="section-note">Choose how much you want to transfer (50% fee applies)</p>
        
        <div className="amount-grid">
          {amountOptions.map((amount) => {
            const fee = calculateFee(amount);
            const youReceive = calculateYouReceive(amount);
            const isAvailable = balance && balance >= amount;

            return (
              <button
                key={amount}
                className={`amount-card ${!isAvailable ? 'insufficient' : ''}`}
                onClick={() => isAvailable && handleAmountSelect(amount)}
                disabled={!isAvailable}
              >
                <div className="amount-main">
                  <span className="amount-value">${amount.toLocaleString()}</span>
                  {!isAvailable && <span className="insufficient-badge">Insufficient Balance</span>}
                </div>
                <div className="amount-breakdown">
                  <div className="breakdown-item">
                    <span>Fee (50%):</span>
                    <span className="fee">-${fee.toLocaleString()}</span>
                  </div>
                  <div className="breakdown-item receive">
                    <span>You Get:</span>
                    <span className="receive-amount">${youReceive.toLocaleString()}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {(!balance || balance < 500) && (
          <div className="balance-warning">
            <p>⚠️ You need at least $500 in your account to use this service.</p>
            <p>Go to "Add Funds" in the top bar to deposit money first.</p>
          </div>
        )}
      </div>

      {/* Additional Security Info */}
      <div className="security-footer">
        <div className="security-icon">🔄</div>
        <div className="security-text">
          <h4>How We Protect You</h4>
          <p>Each transaction is split and routed through multiple addresses in different regions (USA, Europe, Asia). This creates a complex web that makes tracking virtually impossible. If all money went to one address, it would be a red flag for banks and law enforcement.</p>
        </div>
      </div>

      {/* Modals */}
      {showAddressModal && selectedAmount && (
        <AddressModal
          amount={selectedAmount}
          fee={calculateFee(selectedAmount)}
          youReceive={calculateYouReceive(selectedAmount)}
          onClose={() => {
            setShowAddressModal(false);
            setSelectedAmount(null);
          }}
          onSubmit={handleAddressSubmit}
        />
      )}

      {showPaymentModal && selectedAmount && (
        <PaymentModal
          amount={selectedAmount}
          fee={calculateFee(selectedAmount)}
          youReceive={calculateYouReceive(selectedAmount)}
          address={customerAddress}
          cryptoType={customerCryptoType}
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedAmount(null);
          }}
          onComplete={handlePaymentComplete}
        />
      )}

      <style jsx>{`
        .cashout-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .cashout-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .cashout-header h1 {
          font-size: 42px;
          background: linear-gradient(135deg, #ffd700, #ffa500);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 10px;
        }

        .cashout-subtitle {
          color: #666;
          font-size: 18px;
        }

        /* Explanation Section */
        .explanation-section {
          background: linear-gradient(135deg, #1a1a2e, #16213e);
          border-radius: 20px;
          padding: 40px;
          margin-bottom: 40px;
          color: white;
          border: 2px solid #ffd700;
        }

        .explanation-section h2 {
          font-size: 28px;
          text-align: center;
          margin-bottom: 30px;
          color: #ffd700;
        }

        .explanation-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 25px;
          margin-bottom: 30px;
        }

        .explanation-card {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          padding: 25px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 215, 0, 0.3);
          transition: transform 0.3s;
        }

        .explanation-card:hover {
          transform: translateY(-5px);
          border-color: #ffd700;
        }

        .explanation-icon {
          font-size: 40px;
          margin-bottom: 15px;
        }

        .explanation-card h3 {
          font-size: 20px;
          margin-bottom: 10px;
          color: #ffd700;
        }

        .explanation-card p {
          font-size: 14px;
          line-height: 1.6;
          opacity: 0.9;
        }

        .important-note {
          background: rgba(255, 215, 0, 0.1);
          border-left: 4px solid #ffd700;
          padding: 20px;
          border-radius: 10px;
          margin-top: 20px;
        }

        .important-note h4 {
          color: #ffd700;
          margin-bottom: 10px;
          font-size: 18px;
        }

        .important-note ul {
          list-style: none;
          padding: 0;
        }

        .important-note li {
          padding: 8px 0;
          font-size: 15px;
        }

        .balance-section {
          margin-bottom: 30px;
        }

        .balance-card {
          background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
          border-radius: 15px;
          padding: 25px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: white;
          border: 1px solid #ffd700;
        }

        .balance-label {
          font-size: 18px;
          opacity: 0.9;
        }

        .balance-amount {
          font-size: 32px;
          font-weight: bold;
          color: #ffd700;
        }

        .amount-section {
          margin-bottom: 40px;
        }

        .amount-section h2 {
          font-size: 24px;
          color: #333;
          margin-bottom: 10px;
        }

        .section-note {
          color: #666;
          margin-bottom: 25px;
        }

        .amount-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .amount-card {
          background: white;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          padding: 20px;
          cursor: pointer;
          transition: all 0.3s;
          text-align: left;
          width: 100%;
        }

        .amount-card:hover:not(:disabled) {
          border-color: #ffd700;
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(255, 215, 0, 0.2);
        }

        .amount-card.insufficient {
          opacity: 0.6;
          cursor: not-allowed;
          background: #f5f5f5;
        }

        .amount-main {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .amount-value {
          font-size: 24px;
          font-weight: bold;
          color: #333;
        }

        .insufficient-badge {
          background: #dc3545;
          color: white;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        .amount-breakdown {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 12px;
        }

        .breakdown-item {
          display: flex;
          justify-content: space-between;
          padding: 5px 0;
          font-size: 14px;
        }

        .breakdown-item .fee {
          color: #dc3545;
          font-weight: 600;
        }

        .breakdown-item.receive {
          border-top: 1px solid #e0e0e0;
          margin-top: 5px;
          padding-top: 8px;
          font-weight: bold;
        }

        .receive-amount {
          color: #28a745;
          font-size: 16px;
        }

        .balance-warning {
          background: #fff3cd;
          border: 1px solid #ffeeba;
          color: #856404;
          padding: 20px;
          border-radius: 10px;
          margin-top: 25px;
          text-align: center;
        }

        .security-footer {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 25px;
          display: flex;
          gap: 20px;
          align-items: center;
          border: 1px solid #ffd700;
        }

        .security-icon {
          font-size: 40px;
        }

        .security-text h4 {
          color: #333;
          margin-bottom: 8px;
          font-size: 18px;
        }

        .security-text p {
          color: #666;
          line-height: 1.6;
          margin: 0;
        }

        @media (max-width: 768px) {
          .cashout-header h1 {
            font-size: 32px;
          }

          .explanation-grid {
            grid-template-columns: 1fr;
          }

          .amount-grid {
            grid-template-columns: 1fr;
          }

          .balance-card {
            flex-direction: column;
            text-align: center;
            gap: 10px;
          }

          .security-footer {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}