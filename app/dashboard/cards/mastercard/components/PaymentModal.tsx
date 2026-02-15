// app/dashboard/cards/mastercard/components/PaymentModal.tsx
'use client';

import React, { useState } from 'react';

interface PaymentModalProps {
  item: any;
  onClose: () => void;
  onComplete: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ item, onClose, onComplete }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Card fields
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardName: '',
    // Crypto fields
    cryptoCurrency: 'BTC',
    // PayPal fields
    paypalEmail: '',
    // Wallet fields
    walletAddress: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      // Show success message and trigger download
      alert(`Payment successful! Your card details will now be downloaded.`);
      
      // Create a dummy text file with card details
      const cardDetails = `
Card Details:
------------------------------------
Card Number: ${item.cardNumber}
BIN: ${item.bin}
Bank: ${item.bank}
Card Type: ${item.cardType}
Level: ${item.level}
Balance: $${item.balance}
Price Paid: $${item.price}

Full Information:
------------------------------------
Name: John A. Smith
DOB: 08/15/1985
SSN: ***-**-1234
Address: 123 Main St, New York, NY 10001
Email: john.smith@gmail.com
Phone: (212) 555-1234

Card Details:
------------------------------------
Card Number: ${item.cardNumber.replace('******', '123456')}
Expiry: 05/27
CVV: 123
PIN: 4567

Online Banking Access:
------------------------------------
Username: john.smith85
Password: Smith1985!
Email Password: SmithFamily123
Security Questions: "What is your mother's maiden name?" - Jones
      `;

      const blob = new Blob([cardDetails], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `card_${item.bin}_details.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      onComplete();
    }, 2000);
  };

  // Calculate total with fee
  const fee = item.price * 0.05; // 5% fee
  const total = item.price + fee;

  return (
    <div className="payment-modal-overlay" onClick={onClose}>
      <div className="payment-modal" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <h2>Complete Your Purchase</h2>
          <p className="item-summary">
            Purchasing: <strong>{item.bank} {item.cardType}</strong> (Balance: ${item.balance.toLocaleString()})
          </p>
        </div>

        <div className="payment-content">
          {/* Payment Method Selection */}
          <div className="payment-methods">
            <button 
              className={`method-btn ${paymentMethod === 'card' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('card')}
            >
              💳 Credit Card
            </button>
            <button 
              className={`method-btn ${paymentMethod === 'crypto' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('crypto')}
            >
              ₿ Cryptocurrency
            </button>
            <button 
              className={`method-btn ${paymentMethod === 'paypal' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('paypal')}
            >
              📧 PayPal
            </button>
            <button 
              className={`method-btn ${paymentMethod === 'wallet' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('wallet')}
            >
              👛 Digital Wallet
            </button>
          </div>

          {/* Payment Form */}
          <form onSubmit={handleSubmit} className="payment-form">
            {paymentMethod === 'card' && (
              <div className="form-fields">
                <div className="form-group">
                  <label>Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      name="cardExpiry"
                      placeholder="MM/YY"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      type="text"
                      name="cardCvv"
                      placeholder="123"
                      value={formData.cardCvv}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Name on Card</label>
                  <input
                    type="text"
                    name="cardName"
                    placeholder="John Doe"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'crypto' && (
              <div className="form-fields">
                <div className="form-group">
                  <label>Select Cryptocurrency</label>
                  <select name="cryptoCurrency" value={formData.cryptoCurrency} onChange={handleInputChange}>
                    <option value="BTC">Bitcoin (BTC)</option>
                    <option value="ETH">Ethereum (ETH)</option>
                    <option value="USDT">Tether (USDT)</option>
                    <option value="BNB">Binance Coin (BNB)</option>
                  </select>
                </div>
                <div className="wallet-address">
                  <p className="address-label">Send payment to:</p>
                  <div className="address-box">
                    <code>0x4f3a1c2b5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s</code>
                    <button type="button" className="copy-btn">📋 Copy</button>
                  </div>
                  <p className="amount">Amount: <strong>{(item.price * 0.000025).toFixed(8)} BTC</strong></p>
                </div>
                <div className="form-group">
                  <label>Transaction Hash (after payment)</label>
                  <input
                    type="text"
                    name="walletAddress"
                    placeholder="Paste transaction hash here"
                    value={formData.walletAddress}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'paypal' && (
              <div className="form-fields">
                <div className="form-group">
                  <label>PayPal Email</label>
                  <input
                    type="email"
                    name="paypalEmail"
                    placeholder="your.email@example.com"
                    value={formData.paypalEmail}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="paypal-info">
                  <p>You will be redirected to PayPal to complete your payment.</p>
                  <p className="amount">Amount: <strong>${total.toFixed(2)} USD</strong></p>
                </div>
              </div>
            )}

            {paymentMethod === 'wallet' && (
              <div className="form-fields">
                <div className="form-group">
                  <label>Select Wallet</label>
                  <select>
                    <option value="apple">Apple Pay</option>
                    <option value="google">Google Pay</option>
                    <option value="samsung">Samsung Pay</option>
                  </select>
                </div>
                <div className="wallet-info">
                  <p>You will be redirected to your wallet to complete the payment.</p>
                  <p className="amount">Amount: <strong>${total.toFixed(2)} USD</strong></p>
                </div>
              </div>
            )}

            {/* Price Summary */}
            <div className="price-summary">
              <div className="summary-row">
                <span>Item Price:</span>
                <span>${item.price.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Processing Fee (5%):</span>
                <span>${fee.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Terms and Submit */}
            <div className="terms">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                I agree to the <a href="#">Terms of Service</a> and confirm that I understand these are virtual card details for testing/educational purposes.
              </label>
            </div>

            <button type="submit" className="pay-button" disabled={loading}>
              {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        .payment-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(5px);
        }

        .payment-modal {
          background: white;
          border-radius: 20px;
          width: 90%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .close-button {
          position: absolute;
          top: 15px;
          right: 15px;
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #999;
          transition: color 0.2s;
          z-index: 1;
        }

        .close-button:hover {
          color: #333;
        }

        .modal-header {
          padding: 30px 30px 20px;
          border-bottom: 1px solid #e0e0e0;
          background: linear-gradient(135deg, #f8f9fa, #ffffff);
          border-radius: 20px 20px 0 0;
        }

        .modal-header h2 {
          margin: 0 0 10px;
          font-size: 24px;
          color: #333;
        }

        .item-summary {
          color: #666;
          font-size: 14px;
          margin: 0;
        }

        .payment-content {
          padding: 30px;
        }

        .payment-methods {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          margin-bottom: 30px;
        }

        .method-btn {
          padding: 12px;
          border: 2px solid #e0e0e0;
          background: white;
          border-radius: 10px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.2s;
          color: #666;
        }

        .method-btn:hover {
          border-color: #ff6b6b;
          color: #ff6b6b;
        }

        .method-btn.active {
          background: linear-gradient(135deg, #ff6b6b, #ff8e53);
          color: white;
          border-color: transparent;
        }

        .payment-form {
          margin-top: 20px;
        }

        .form-fields {
          animation: slideDown 0.3s ease;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #333;
          font-size: 14px;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 12px 15px;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          font-size: 14px;
          transition: all 0.2s;
          background: #f8f9fa;
        }

        .form-group input:focus,
        .form-group select:focus {
          border-color: #ff6b6b;
          outline: none;
          background: white;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        .wallet-address,
        .paypal-info,
        .wallet-info {
          background: #f8f9fa;
          border-radius: 10px;
          padding: 20px;
          margin-bottom: 20px;
          text-align: center;
        }

        .address-label {
          font-weight: 600;
          color: #333;
          margin-bottom: 10px;
        }

        .address-box {
          background: white;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          padding: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .address-box code {
          font-size: 12px;
          color: #666;
          word-break: break-all;
        }

        .copy-btn {
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
          padding: 5px;
          border-radius: 5px;
          transition: all 0.2s;
        }

        .copy-btn:hover {
          background: #f0f0f0;
        }

        .amount {
          font-size: 16px;
          color: #333;
          margin: 10px 0 0;
        }

        .amount strong {
          color: #28a745;
          font-size: 18px;
        }

        .price-summary {
          background: linear-gradient(135deg, #f8f9fa, #ffffff);
          border-radius: 10px;
          padding: 20px;
          margin: 20px 0;
          border: 2px solid #e0e0e0;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #e0e0e0;
        }

        .summary-row.total {
          border-bottom: none;
          font-size: 18px;
          font-weight: 700;
          color: #333;
          padding-top: 15px;
        }

        .summary-row.total span:last-child {
          color: #ff6b6b;
        }

        .terms {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 20px 0;
          font-size: 13px;
          color: #666;
        }

        .terms input[type="checkbox"] {
          width: 18px;
          height: 18px;
          cursor: pointer;
        }

        .terms a {
          color: #ff6b6b;
          text-decoration: none;
        }

        .terms a:hover {
          text-decoration: underline;
        }

        .pay-button {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #ff6b6b, #ff8e53);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .pay-button:hover:not(:disabled) {
          transform: scale(1.02);
          box-shadow: 0 10px 20px rgba(255,107,107,0.3);
        }

        .pay-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 480px) {
          .payment-content {
            padding: 20px;
          }

          .payment-methods {
            grid-template-columns: 1fr;
          }

          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default PaymentModal;