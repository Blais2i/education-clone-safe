'use client';

import React, { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function CardLoadingPage() {
  const [formData, setFormData] = useState({
    cardType: 'visa',
    amount: '',
    bitcoinAmount: '',
    deliveryAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  });
  
  const [btcAddress] = useState('bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'); // Replace with your BTC address
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Calculate BTC amount based on USD (example rate: $50,000 per BTC)
  const calculateBTC = (usdAmount: number) => {
    return (usdAmount / 50000).toFixed(8);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const usdAmount = parseFloat(e.target.value) || 0;
    setFormData({
      ...formData,
      amount: e.target.value,
      bitcoinAmount: calculateBTC(usdAmount)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const supabase = createClient();
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('Please login first');
      }

      // Check user balance
      const { data: profile } = await supabase
        .from('profiles')
        .select('account_balance')
        .eq('id', user.id)
        .single();

      const usdAmount = parseFloat(formData.amount);
      
      if (!profile || profile.account_balance < usdAmount) {
        setError('Insufficient balance. Please add funds first.');
        return;
      }

      // Create order
      const { error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          product_id: null, // VIP service
          amount: usdAmount,
          status: 'pending',
          payment_method: 'bitcoin',
          delivery_address: `${formData.deliveryAddress}, ${formData.city}, ${formData.state} ${formData.zipCode}, ${formData.country}`
        });

      if (orderError) throw orderError;

      // Deduct from balance
      await supabase
        .from('profiles')
        .update({ account_balance: profile.account_balance - usdAmount })
        .eq('id', user.id);

      // Move to payment step
      setStep(2);
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const cardOptions = [
    { value: 'visa', label: 'Visa Card', fee: '5%' },
    { value: 'mastercard', label: 'Master Card', fee: '5%' },
    { value: 'amex', label: 'American Express', fee: '7%' },
    { value: 'discover', label: 'Discover', fee: '6%' }
  ];

  return (
    <div className="vip-container">
      <div className="vip-header">
        <h1>👑 VIP Card Loading Service</h1>
        <p className="vip-subtitle">Professional carding assistance - We load cards for you!</p>
      </div>

      {error && (
        <div className="error-message">
          ❌ {error}
        </div>
      )}

      {step === 1 ? (
        <form onSubmit={handleSubmit} className="vip-form">
          <div className="form-section">
            <h2>Step 1: Select Card Type & Amount</h2>
            
            <div className="form-group">
              <label>Card Type:</label>
              <select
                value={formData.cardType}
                onChange={(e) => setFormData({...formData, cardType: e.target.value})}
                required
              >
                {cardOptions.map(card => (
                  <option key={card.value} value={card.value}>
                    {card.label} (Service fee: {card.fee})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Amount to Load (USD):</label>
              <input
                type="number"
                min="100"
                step="10"
                value={formData.amount}
                onChange={handleAmountChange}
                placeholder="Enter amount in USD"
                required
              />
              {formData.bitcoinAmount && (
                <div className="btc-estimate">
                  ≈ {formData.bitcoinAmount} BTC
                </div>
              )}
            </div>
          </div>

          <div className="form-section">
            <h2>Step 2: Delivery Address</h2>
            <p className="info-note">Where should we send the loaded card?</p>

            <div className="form-group">
              <label>Street Address:</label>
              <input
                type="text"
                value={formData.deliveryAddress}
                onChange={(e) => setFormData({...formData, deliveryAddress: e.target.value})}
                placeholder="123 Main St, Apt 4B"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City:</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  placeholder="New York"
                  required
                />
              </div>

              <div className="form-group">
                <label>State:</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({...formData, state: e.target.value})}
                  placeholder="NY"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>ZIP Code:</label>
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                  placeholder="10001"
                  required
                />
              </div>

              <div className="form-group">
                <label>Country:</label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({...formData, country: e.target.value})}
                  required
                >
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Step 3: Review & Confirm</h2>
            
            <div className="review-box">
              <p><strong>Service:</strong> Card Loading ({cardOptions.find(c => c.value === formData.cardType)?.label})</p>
              <p><strong>Amount:</strong> ${formData.amount || '0'} USD</p>
              <p><strong>BTC Equivalent:</strong> {formData.bitcoinAmount || '0'} BTC</p>
              <p><strong>Delivery to:</strong> {formData.deliveryAddress || 'Not entered'}</p>
            </div>

            <div className="warning-box">
              ⚠️ Funds will be deducted from your account balance immediately. 
              Cards are typically delivered within 24-48 hours after confirmation.
            </div>

            <button type="submit" className="btn-vip" disabled={loading}>
              {loading ? 'Processing...' : 'Confirm & Pay from Balance'}
            </button>
          </div>
        </form>
      ) : (
        <div className="payment-section">
          <h2>✅ Order Confirmed!</h2>
          
          <div className="btc-payment-info">
            <h3>Send Bitcoin to this address:</h3>
            <div className="btc-address-box">
              <code>{btcAddress}</code>
              <button 
                onClick={() => navigator.clipboard.writeText(btcAddress)}
                className="btn-copy"
              >
                Copy Address
              </button>
            </div>
            
            <div className="amount-box">
              <p><strong>Amount to send:</strong> {formData.bitcoinAmount} BTC</p>
              <p><strong>USD Amount:</strong> ${formData.amount}</p>
            </div>

            <div className="confirmation-info">
              <p>⏳ Waiting for 1 confirmation...</p>
              <p>📦 Card will be shipped to your address within 24 hours after confirmation</p>
              <p>🆔 Order ID: #VIP-{Date.now().toString().slice(-8)}</p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .vip-container {
          background: linear-gradient(135deg, #fff9e6 0%, #fff0d4 100%);
          border-radius: 15px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          border: 2px solid #ffd700;
        }

        .vip-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .vip-header h1 {
          font-size: 36px;
          color: #333;
          margin-bottom: 10px;
          background: linear-gradient(135deg, #ffd700, #ffa500);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
        }

        .vip-subtitle {
          color: #666;
          font-size: 18px;
        }

        .vip-form {
          max-width: 800px;
          margin: 0 auto;
        }

        .form-section {
          background: white;
          border-radius: 10px;
          padding: 30px;
          margin-bottom: 30px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }

        .form-section h2 {
          color: #333;
          margin-bottom: 25px;
          font-size: 20px;
          border-bottom: 2px solid #ffd700;
          padding-bottom: 10px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #444;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 12px 15px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 15px;
          transition: all 0.3s;
        }

        .form-group input:focus,
        .form-group select:focus {
          border-color: #ffd700;
          outline: none;
          box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.1);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .btc-estimate {
          margin-top: 8px;
          color: #666;
          font-size: 14px;
          padding: 5px 10px;
          background: #f5f5f5;
          border-radius: 5px;
          display: inline-block;
        }

        .info-note {
          color: #666;
          font-style: italic;
          margin-bottom: 20px;
          padding: 10px;
          background: #f9f9f9;
          border-radius: 5px;
        }

        .review-box {
          background: #f9f9f9;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
        }

        .review-box p {
          margin: 10px 0;
          color: #333;
        }

        .warning-box {
          background: #fff3cd;
          border: 1px solid #ffeeba;
          color: #856404;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 25px;
        }

        .btn-vip {
          width: 100%;
          padding: 15px;
          background: linear-gradient(135deg, #ffd700 0%, #ffa500 100%);
          color: #000;
          border: none;
          border-radius: 8px;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .btn-vip:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 20px rgba(255, 215, 0, 0.4);
        }

        .btn-vip:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .payment-section {
          text-align: center;
          padding: 40px;
          background: white;
          border-radius: 10px;
        }

        .payment-section h2 {
          color: #28a745;
          margin-bottom: 30px;
          font-size: 28px;
        }

        .btc-payment-info {
          background: #f8f9fa;
          padding: 30px;
          border-radius: 10px;
          margin-top: 20px;
        }

        .btc-address-box {
          display: flex;
          gap: 10px;
          justify-content: center;
          margin: 20px 0;
        }

        .btc-address-box code {
          background: #2d2d2d;
          color: #ffd700;
          padding: 15px 25px;
          border-radius: 8px;
          font-size: 16px;
          word-break: break-all;
        }

        .btn-copy {
          padding: 15px 25px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.2s;
        }

        .btn-copy:hover {
          background: #0056b3;
        }

        .amount-box {
          background: white;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
        }

        .amount-box p {
          font-size: 18px;
          margin: 10px 0;
        }

        .confirmation-info {
          text-align: left;
          background: #e8f4fd;
          padding: 20px;
          border-radius: 8px;
          margin-top: 20px;
        }

        .confirmation-info p {
          margin: 10px 0;
          color: #0056b3;
        }

        .error-message {
          background: #f8d7da;
          color: #721c24;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 20px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}