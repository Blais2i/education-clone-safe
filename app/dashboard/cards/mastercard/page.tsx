// app/dashboard/cards/mastercard/page.tsx
'use client';

import React, { useState } from 'react';
import EmailModal from './components/EmailModal';
import PaymentModal from './components/PaymentModal';

// Mock data for Mastercard cards with minimum $30 price
const mastercardCards = [
  // High Balance / Platinum Cards
  {
    id: 1,
    bin: '543210',
    cardType: 'Platinum',
    bank: 'Chase',
    country: 'USA',
    cardNumber: '543210******1234',
    balance: 12500,
    price: 450,
    status: 'available',
    level: 'Platinum',
    features: ['Fullz Included', 'Email Access', 'CVV2', 'Name/DOB/SSN']
  },
  {
    id: 2,
    bin: '542418',
    cardType: 'World Elite',
    bank: 'Citi',
    country: 'USA',
    cardNumber: '542418******5678',
    balance: 8900,
    price: 380,
    status: 'available',
    level: 'World Elite',
    features: ['Fullz Included', 'Email Access', 'CVV2', 'Name/DOB/SSN', 'Phone Access']
  },
  {
    id: 3,
    bin: '552632',
    cardType: 'Signature',
    bank: 'Bank of America',
    country: 'USA',
    cardNumber: '552632******9012',
    balance: 15400,
    price: 520,
    status: 'soldout',
    level: 'Signature',
    features: ['Fullz Included', 'Email Access', 'CVV2', 'Name/DOB/SSN', 'Online Banking']
  },
  {
    id: 4,
    bin: '545678',
    cardType: 'Gold',
    bank: 'Wells Fargo',
    country: 'USA',
    cardNumber: '545678******3456',
    balance: 6700,
    price: 290,
    status: 'available',
    level: 'Gold',
    features: ['Fullz Included', 'Email Access', 'CVV2', 'Name/DOB/SSN']
  },
  {
    id: 5,
    bin: '537589',
    cardType: 'Standard',
    bank: 'Capital One',
    country: 'USA',
    cardNumber: '537589******7890',
    balance: 3200,
    price: 180,
    status: 'available',
    level: 'Standard',
    features: ['Fullz Included', 'CVV2', 'Name/DOB/SSN']
  },
  {
    id: 6,
    bin: '559201',
    cardType: 'Business',
    bank: 'American Express',
    country: 'USA',
    cardNumber: '559201******2345',
    balance: 22300,
    price: 750,
    status: 'available',
    level: 'Business',
    features: ['Fullz Included', 'Email Access', 'CVV2', 'Name/DOB/SSN', 'Business Docs', 'Online Banking']
  },
  {
    id: 7,
    bin: '523456',
    cardType: 'Platinum',
    bank: 'TD Bank',
    country: 'USA',
    cardNumber: '523456******6789',
    balance: 5100,
    price: 240,
    status: 'available',
    level: 'Platinum',
    features: ['Fullz Included', 'Email Access', 'CVV2', 'Name/DOB/SSN']
  },
  {
    id: 8,
    bin: '541234',
    cardType: 'Signature',
    bank: 'PNC Bank',
    country: 'USA',
    cardNumber: '541234******0123',
    balance: 9800,
    price: 410,
    status: 'soldout',
    level: 'Signature',
    features: ['Fullz Included', 'Email Access', 'CVV2', 'Name/DOB/SSN', 'Credit Line: $15k']
  },
  {
    id: 9,
    bin: '557890',
    cardType: 'World',
    bank: 'US Bank',
    country: 'USA',
    cardNumber: '557890******4567',
    balance: 7500,
    price: 320,
    status: 'available',
    level: 'World',
    features: ['Fullz Included', 'Email Access', 'CVV2', 'Name/DOB/SSN', 'Travel Points']
  },
  {
    id: 10,
    bin: '534567',
    cardType: 'Standard',
    bank: 'Discover',
    country: 'USA',
    cardNumber: '534567******8901',
    balance: 2800,
    price: 150,
    status: 'available',
    level: 'Standard',
    features: ['Fullz Included', 'CVV2', 'Name/DOB/SSN']
  },
  {
    id: 11,
    bin: '548901',
    cardType: 'Platinum',
    bank: 'Fifth Third',
    country: 'USA',
    cardNumber: '548901******2345',
    balance: 4300,
    price: 210,
    status: 'available',
    level: 'Platinum',
    features: ['Fullz Included', 'Email Access', 'CVV2', 'Name/DOB/SSN']
  },
  {
    id: 12,
    bin: '556782',
    cardType: 'Elite',
    bank: 'HSBC',
    country: 'USA',
    cardNumber: '556782******6789',
    balance: 18700,
    price: 620,
    status: 'available',
    level: 'Elite',
    features: ['Fullz Included', 'Email Access', 'CVV2', 'Name/DOB/SSN', 'Phone Access', 'Online Banking']
  },
  // New lower-priced cards starting at $30 minimum
  {
    id: 13,
    bin: '512345',
    cardType: 'Standard',
    bank: 'Chase',
    country: 'USA',
    cardNumber: '512345******4321',
    balance: 850,
    price: 45,
    status: 'available',
    level: 'Standard',
    features: ['Fullz Included', 'CVV2', 'Name/DOB/SSN']
  },
  {
    id: 14,
    bin: '526789',
    cardType: 'Basic',
    bank: 'Wells Fargo',
    country: 'USA',
    cardNumber: '526789******8765',
    balance: 600,
    price: 35,
    status: 'available',
    level: 'Basic',
    features: ['Fullz Included', 'CVV2', 'Name/DOB/SSN']
  },
  {
    id: 15,
    bin: '538901',
    cardType: 'Entry',
    bank: 'Capital One',
    country: 'USA',
    cardNumber: '538901******2109',
    balance: 450,
    price: 30,
    status: 'available',
    level: 'Entry',
    features: ['Fullz Included', 'CVV2', 'Name/DOB']
  },
  {
    id: 16,
    bin: '549876',
    cardType: 'Standard',
    bank: 'Citi',
    country: 'USA',
    cardNumber: '549876******5432',
    balance: 720,
    price: 40,
    status: 'available',
    level: 'Standard',
    features: ['Fullz Included', 'CVV2', 'Name/DOB/SSN']
  },
  {
    id: 17,
    bin: '551234',
    cardType: 'Basic',
    bank: 'Bank of America',
    country: 'USA',
    cardNumber: '551234******9876',
    balance: 550,
    price: 32,
    status: 'available',
    level: 'Basic',
    features: ['Fullz Included', 'CVV2', 'Name/DOB/SSN']
  },
  {
    id: 18,
    bin: '524567',
    cardType: 'Entry',
    bank: 'TD Bank',
    country: 'USA',
    cardNumber: '524567******6543',
    balance: 380,
    price: 30,
    status: 'available',
    level: 'Entry',
    features: ['Fullz Included', 'CVV2', 'Name/DOB']
  }
];

export default function MastercardPage() {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');
  const [filterBin, setFilterBin] = useState('');
  const [filterBank, setFilterBank] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
  const [filterMinPrice, setFilterMinPrice] = useState('');
  const [filterMaxPrice, setFilterMaxPrice] = useState('');

  // Get unique banks for filter
  const banks = [...new Set(mastercardCards.map(card => card.bank))];
  const levels = [...new Set(mastercardCards.map(card => card.level))];

  const handleBuyNow = (item: any) => {
    setSelectedItem(item);
    setShowEmailModal(true);
  };

  const handleEmailSubmit = (email: string) => {
    setCustomerEmail(email);
    setShowEmailModal(false);
    setShowPaymentModal(true);
  };

  const handlePaymentComplete = () => {
    setShowPaymentModal(false);
    setSelectedItem(null);
    setCustomerEmail('');
    // Here you would typically update the card status to 'soldout'
    // and handle the download of the card details
  };

  // Filter cards
  const filteredCards = mastercardCards.filter(card => {
    if (filterBin && !card.bin.includes(filterBin)) return false;
    if (filterBank && card.bank !== filterBank) return false;
    if (filterLevel && card.level !== filterLevel) return false;
    if (filterMinPrice && card.price < parseInt(filterMinPrice)) return false;
    if (filterMaxPrice && card.price > parseInt(filterMaxPrice)) return false;
    return true;
  });

  return (
    <div className="mastercard-container">
      <div className="page-header">
        <div className="header-icon">💳</div>
        <h1>Cards City - Mastercard Collection</h1>
        <p className="subtitle">Premium Mastercard cards with fullz information</p>
      </div>

      {/* BIN Information Banner */}
      <div className="bin-info">
        <div className="bin-info-content">
          <span className="bin-label">🔢 Mastercard BIN Ranges:</span>
          <span className="bin-range">51xxxx - 55xxxx • 2221xx - 2720xx</span>
        </div>
        <div className="bin-info-content">
          <span className="bin-label">💵 Balance Range:</span>
          <span className="bin-range">$380 - $22,300</span>
        </div>
        <div className="bin-info-content">
          <span className="bin-label">💰 Price Range:</span>
          <span className="bin-range">$30 - $750</span>
        </div>
      </div>

      {/* Filter Section */}
      <div className="filter-section">
        <div className="filter-group">
          <label>BIN:</label>
          <input
            type="text"
            placeholder="Filter by BIN..."
            value={filterBin}
            onChange={(e) => setFilterBin(e.target.value)}
            className="filter-input"
          />
        </div>
        <div className="filter-group">
          <label>Bank:</label>
          <select value={filterBank} onChange={(e) => setFilterBank(e.target.value)} className="filter-select">
            <option value="">All Banks</option>
            {banks.map(bank => (
              <option key={bank} value={bank}>{bank}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Card Level:</label>
          <select value={filterLevel} onChange={(e) => setFilterLevel(e.target.value)} className="filter-select">
            <option value="">All Levels</option>
            {levels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Min Price ($):</label>
          <input
            type="number"
            placeholder="Min"
            value={filterMinPrice}
            onChange={(e) => setFilterMinPrice(e.target.value)}
            className="filter-input"
            min="0"
          />
        </div>
        <div className="filter-group">
          <label>Max Price ($):</label>
          <input
            type="number"
            placeholder="Max"
            value={filterMaxPrice}
            onChange={(e) => setFilterMaxPrice(e.target.value)}
            className="filter-input"
            min="0"
          />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="cards-grid">
        {filteredCards.map((card) => (
          <div key={card.id} className={`card-item ${card.status === 'soldout' ? 'soldout' : ''}`}>
            <div className="card-header">
              <div className="card-type">
                <span className="card-chip">💳</span>
                <span className="card-brand">MASTERCARD</span>
              </div>
              <span className={`status-badge ${card.status}`}>
                {card.status === 'available' ? '🟢 LIVE' : '🔴 SOLD'}
              </span>
            </div>

            <div className="card-number-display">
              <div className="card-number">{card.cardNumber}</div>
              <div className="card-bin">BIN: {card.bin}</div>
            </div>

            <div className="card-details">
              <div className="detail-row">
                <span className="detail-label">Bank:</span>
                <span className="detail-value">{card.bank}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Level:</span>
                <span className="detail-value">{card.level}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Country:</span>
                <span className="detail-value">{card.country}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Exp/CVV/Name:</span>
                <span className="detail-value">Included ✓</span>
              </div>
            </div>

            <div className="card-features">
              {card.features.map((feature, idx) => (
                <span key={idx} className="feature-tag">{feature}</span>
              ))}
            </div>

            <div className="card-footer">
              <div className="balance-price">
                <div className="balance">${card.balance.toLocaleString()}</div>
                <div className="price">${card.price}</div>
              </div>
              
              {card.status === 'available' ? (
                <button 
                  className="btn-purchase"
                  onClick={() => handleBuyNow(card)}
                >
                  Purchase →
                </button>
              ) : (
                <button className="btn-soldout" disabled>
                  Sold Out
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredCards.length === 0 && (
        <div className="no-results">
          <p>No cards match your filters</p>
          <button onClick={() => {
            setFilterBin('');
            setFilterBank('');
            setFilterLevel('');
            setFilterMinPrice('');
            setFilterMaxPrice('');
          }} className="btn-clear">
            Clear Filters
          </button>
        </div>
      )}

      {/* Modals */}
      {showEmailModal && selectedItem && (
        <EmailModal
          item={selectedItem}
          onClose={() => setShowEmailModal(false)}
          onSubmit={handleEmailSubmit}
        />
      )}

      {showPaymentModal && selectedItem && (
        <PaymentModal
          item={selectedItem}
          email={customerEmail}
          onClose={() => setShowPaymentModal(false)}
          onComplete={handlePaymentComplete}
        />
      )}

      <style jsx>{`
        .mastercard-container {
          padding: 20px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-header {
          text-align: center;
          margin-bottom: 30px;
          position: relative;
        }

        .header-icon {
          font-size: 48px;
          margin-bottom: 10px;
        }

        .page-header h1 {
          font-size: 36px;
          background: linear-gradient(135deg, #ff6b6b, #ff8e53);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 10px;
        }

        .subtitle {
          color: #666;
          font-size: 16px;
        }

        .bin-info {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 30px;
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          gap: 20px;
          color: white;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }

        .bin-info-content {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .bin-label {
          font-weight: 600;
          opacity: 0.9;
        }

        .bin-range {
          font-family: monospace;
          font-size: 16px;
          background: rgba(255,255,255,0.2);
          padding: 5px 15px;
          border-radius: 20px;
        }

        .filter-section {
          display: flex;
          gap: 15px;
          margin-bottom: 30px;
          flex-wrap: wrap;
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }

        .filter-group {
          flex: 1;
          min-width: 150px;
        }

        .filter-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: 600;
          color: #333;
          font-size: 13px;
        }

        .filter-input, .filter-select {
          width: 100%;
          padding: 10px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 14px;
          transition: all 0.2s;
        }

        .filter-input:focus, .filter-select:focus {
          border-color: #667eea;
          outline: none;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 25px;
          margin-top: 20px;
        }

        .card-item {
          background: white;
          border-radius: 16px;
          padding: 25px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          transition: all 0.3s;
          border: 2px solid transparent;
          position: relative;
          overflow: hidden;
        }

        .card-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #ff6b6b, #ff8e53);
        }

        .card-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.12);
          border-color: #ff8e53;
        }

        .card-item.soldout {
          opacity: 0.7;
          filter: grayscale(0.5);
        }

        .card-item.soldout::before {
          background: linear-gradient(90deg, #6c757d, #495057);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .card-type {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .card-chip {
          font-size: 24px;
        }

        .card-brand {
          font-weight: 700;
          font-size: 18px;
          color: #333;
          letter-spacing: 1px;
        }

        .status-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        .status-badge.available {
          background: #d4edda;
          color: #155724;
        }

        .status-badge.soldout {
          background: #f8d7da;
          color: #721c24;
        }

        .card-number-display {
          background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 20px;
          color: #ffd700;
          font-family: 'Courier New', monospace;
          text-align: center;
        }

        .card-number {
          font-size: 20px;
          letter-spacing: 2px;
          margin-bottom: 8px;
        }

        .card-bin {
          font-size: 14px;
          color: #888;
        }

        .card-details {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 15px;
          margin-bottom: 15px;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #e0e0e0;
        }

        .detail-row:last-child {
          border-bottom: none;
        }

        .detail-label {
          color: #666;
          font-size: 13px;
        }

        .detail-value {
          font-weight: 600;
          color: #333;
        }

        .card-features {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
        }

        .feature-tag {
          background: #e3f2fd;
          color: #1976d2;
          padding: 4px 10px;
          border-radius: 15px;
          font-size: 11px;
          font-weight: 600;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 15px;
        }

        .balance-price {
          text-align: left;
        }

        .balance {
          font-size: 20px;
          font-weight: 700;
          color: #28a745;
        }

        .price {
          font-size: 24px;
          font-weight: 800;
          color: #ff6b6b;
        }

        .btn-purchase {
          background: linear-gradient(135deg, #ff6b6b, #ff8e53);
          color: white;
          border: none;
          padding: 12px 25px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-purchase:hover {
          transform: scale(1.05);
          box-shadow: 0 5px 15px rgba(255,107,107,0.3);
        }

        .btn-soldout {
          background: #6c757d;
          color: white;
          border: none;
          padding: 12px 25px;
          border-radius: 8px;
          font-weight: 600;
          cursor: not-allowed;
          opacity: 0.6;
        }

        .btn-clear {
          background: #667eea;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
          margin-top: 10px;
        }

        .no-results {
          text-align: center;
          padding: 50px;
          background: white;
          border-radius: 12px;
          margin-top: 30px;
        }

        @media (max-width: 768px) {
          .cards-grid {
            grid-template-columns: 1fr;
          }

          .page-header h1 {
            font-size: 28px;
          }

          .bin-info {
            flex-direction: column;
            text-align: center;
          }

          .filter-section {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}