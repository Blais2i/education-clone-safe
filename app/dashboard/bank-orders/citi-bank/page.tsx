// app/dashboard/bank-orders/citi-bank/page.tsx
'use client';

import React, { useState } from 'react';
import EmailModal from './components/EmailModal';
import PaymentModal from './components/PaymentModal';

// Mock data for Citi Bank logs
const citiBankLogs = [
  // Higher balance logs
  {
    id: 1,
    vendor: '@Mc_loyd',
    includes: 'Online Access, Email Access, DOB, Cookies, Q&A, Gender, SSN, Address, Acct&Rn license NO, ZelleON',
    balance: 4850,
    price: 420,
    status: 'available'
  },
  {
    id: 2,
    vendor: '@Crypto_Plug',
    includes: 'Online Access, Email Access, DOB, Cookies, Q&A, Gender, SSN, Address, Acct&Rn license NO, ZelleON',
    balance: 3200,
    price: 290,
    status: 'soldout'
  },
  {
    id: 3,
    vendor: '@DarkWeb_Kings',
    includes: 'Online Access, Email Access, DOB, Cookies, Q&A, Gender, SSN, Address, Acct&Rn license NO, ZelleON',
    balance: 5600,
    price: 480,
    status: 'available'
  },
  // $60 range logs
  {
    id: 4,
    vendor: '@FreshLogs',
    includes: 'Online Access, Email Access, DOB, Cookies, Q&A, Gender, SSN, Address, Acct&Rn license NO',
    balance: 850,
    price: 60,
    status: 'available'
  },
  {
    id: 5,
    vendor: '@ValidShop',
    includes: 'Online Access, Email Access, DOB, Cookies, Q&A, Gender, SSN, Address',
    balance: 780,
    price: 60,
    status: 'available'
  },
  {
    id: 6,
    vendor: '@EliteAccess',
    includes: 'Online Access, Email Access, DOB, Cookies, Q&A, Gender, SSN',
    balance: 820,
    price: 60,
    status: 'soldout'
  },
  {
    id: 7,
    vendor: '@PremiumHUB',
    includes: 'Online Access, Email Access, DOB, Cookies, Q&A, Gender, SSN, Address',
    balance: 795,
    price: 60,
    status: 'available'
  },
  {
    id: 8,
    vendor: '@ThePlug',
    includes: 'Online Access, Email Access, DOB, Cookies, Q&A, Gender',
    balance: 900,
    price: 60,
    status: 'soldout'
  },
  // $50 range logs
  {
    id: 9,
    vendor: '@BlackMarket',
    includes: 'Online Access, Email Access, DOB, Cookies, Q&A, Gender',
    balance: 650,
    price: 50,
    status: 'available'
  },
  {
    id: 10,
    vendor: '@DarkVault',
    includes: 'Online Access, Email Access, DOB, Cookies, Q&A',
    balance: 580,
    price: 50,
    status: 'available'
  },
  {
    id: 11,
    vendor: '@CryptoCartel',
    includes: 'Online Access, Email Access, DOB, Cookies',
    balance: 720,
    price: 50,
    status: 'available'
  },
  {
    id: 12,
    vendor: '@LogsMaster',
    includes: 'Online Access, Email Access, DOB, Cookies, Q&A',
    balance: 690,
    price: 50,
    status: 'soldout'
  },
  {
    id: 13,
    vendor: '@ValidAccess',
    includes: 'Online Access, Email Access, DOB, Cookies',
    balance: 550,
    price: 50,
    status: 'available'
  },
  {
    id: 14,
    vendor: '@ElitePlug',
    includes: 'Online Access, Email Access, DOB, Gender',
    balance: 600,
    price: 50,
    status: 'available'
  },
  {
    id: 15,
    vendor: '@PremiumKing',
    includes: 'Online Access, Email Access, DOB',
    balance: 450,
    price: 35,
    status: 'available'
  },
  {
    id: 16,
    vendor: '@DarkWeb_Plug',
    includes: 'Online Access, Email Access',
    balance: 400,
    price: 30,
    status: 'available'
  },
  {
    id: 17,
    vendor: '@KingPin',
    includes: 'Online Access, Email Access, DOB, Cookies, Q&A, Gender, SSN',
    balance: 2100,
    price: 180,
    status: 'available'
  }
];

export default function CitiBankPage() {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');

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
  };

  return (
    <div className="citi-bank-container">
      <div className="page-header">
        <h1>🏛️ Citi Bank Logs</h1>
        <p className="subtitle">Premium citi bank logs with various balances</p>
      </div>

      {/* Price Filter Info */}
      <div className="filter-info">
        <div className="price-tag">💰 $30 - $60 Entry Level Logs Available</div>
        <div className="price-tag">💎 Premium High Balance Logs Also Available</div>
      </div>

      {/* Products Table */}
      <div className="table-wrapper">
        <table className="logs-table">
          <thead>
            <tr>
              <th>Vendor</th>
              <th>Includes</th>
              <th>Balance</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {citiBankLogs.map((log) => (
              <tr key={log.id} className={log.status === 'soldout' ? 'soldout-row' : ''}>
                <td>
                  <div className="vendor-cell">
                    <span className="vendor-name">{log.vendor}</span>
                  </div>
                </td>
                <td>
                  <div className="includes-cell">
                    {log.includes.split(', ').map((item, i) => (
                      <span key={i} className="include-tag">{item}</span>
                    ))}
                  </div>
                </td>
                <td className="balance-cell">${log.balance.toLocaleString()}</td>
                <td className="price-cell">${log.price}</td>
                <td>
                  <span className={`status-badge ${log.status}`}>
                    {log.status === 'available' ? '✅ AVAILABLE' : '❌ SOLD OUT'}
                  </span>
                </td>
                <td>
                  {log.status === 'available' ? (
                    <button 
                      className="btn-buy"
                      onClick={() => handleBuyNow(log)}
                    >
                      Buy Now
                    </button>
                  ) : (
                    <button className="btn-soldout" disabled>
                      Sold Out
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
        .citi-bank-container {
          background: white;
          border-radius: 15px;
          padding: 30px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .page-header {
          margin-bottom: 20px;
          text-align: center;
        }

        .page-header h1 {
          font-size: 32px;
          color: #003399;
          margin-bottom: 10px;
        }

        .subtitle {
          color: #666;
          font-size: 16px;
        }

        .filter-info {
          display: flex;
          gap: 15px;
          justify-content: center;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }

        .price-tag {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 10px 20px;
          border-radius: 25px;
          font-size: 14px;
          font-weight: 600;
          box-shadow: 0 2px 10px rgba(102, 126, 234, 0.3);
        }

        .table-wrapper {
          overflow-x: auto;
          border-radius: 10px;
          border: 1px solid #e0e0e0;
        }

        .logs-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 1200px;
        }

        .logs-table thead {
          background: linear-gradient(135deg, #003399 0%, #0052cc 100%);
          color: white;
        }

        .logs-table th {
          padding: 15px;
          text-align: left;
          font-weight: 600;
          font-size: 14px;
          white-space: nowrap;
        }

        .logs-table td {
          padding: 20px 15px;
          border-bottom: 1px solid #e0e0e0;
          vertical-align: middle;
        }

        .logs-table tbody tr:hover {
          background: #f8f9ff;
        }

        .soldout-row {
          background: #fafafa;
          opacity: 0.8;
        }

        .vendor-name {
          font-weight: 600;
          color: #0052cc;
          font-size: 15px;
        }

        .includes-cell {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          max-width: 400px;
        }

        .include-tag {
          background: #f0f0f0;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 11px;
          color: #333;
          white-space: nowrap;
        }

        .balance-cell {
          font-weight: 600;
          color: #28a745;
          font-size: 16px;
        }

        .price-cell {
          font-weight: 700;
          color: #003399;
          font-size: 18px;
        }

        .status-badge {
          display: inline-block;
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

        .btn-buy {
          background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
          color: white;
          border: none;
          padding: 10px 25px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .btn-buy:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(40, 167, 69, 0.3);
        }

        .btn-soldout {
          background: #6c757d;
          color: white;
          border: none;
          padding: 10px 25px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 14px;
          cursor: not-allowed;
          opacity: 0.6;
        }

        @media (max-width: 768px) {
          .citi-bank-container {
            padding: 15px;
          }

          .page-header h1 {
            font-size: 24px;
          }

          .filter-info {
            flex-direction: column;
            align-items: center;
          }

          .price-tag {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}