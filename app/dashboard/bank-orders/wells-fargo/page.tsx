// app/dashboard/bank-orders/wells-fargo/page.tsx
'use client';

import React, { useState } from 'react';
import EmailModal from './components/EmailModal';
import PaymentModal from './components/PaymentModal';

// Mock data for Wells Fargo logs
const wellsfargoLogs = [
  {
    id: 1,
    vendor: '@Mc_loyd',
    includes: 'Online Access, Email Access, DOB, Cookies, Q&A, Gender, SSN, Address, Acct&Rn license NO, ZelleON',
    balance: 1400,
    price: 130,
    status: 'available'
  },
  {
    id: 2,
    vendor: '@DarkWeb_Kings',
    includes: 'Online Access, Email Access, DOB, Cookies, Q&A, Gender, SSN, Address, Acct&Rn license NO, ZelleON',
    balance: 902,
    price: 65,
    status: 'available'
  },
  {
    id: 3,
    vendor: '@Crypto_Plug',
    includes: 'Online Access, Email Access, DOB, Cookies, Q&A, Gender, SSN, Address, Acct&Rn license NO, ZelleON',
    balance: 1370,
    price: 120,
    status: 'available'
  },
  {
    id: 4,
    vendor: '@ValidShop',
    includes: 'Online Access, Email Access, DOB, Cookies, Q&A, Gender, SSN, Address, Acct&Rn license NO, ZelleON',
    balance: 2200,
    price: 195,
    status: 'soldout'
  },
  {
    id: 5,
    vendor: '@EliteAccess',
    includes: 'Online Access, Email Access, DOB, Cookies, Q&A, Gender, SSN, Address, Acct&Rn license NO, ZelleON',
    balance: 2765,
    price: 250,
    status: 'soldout'
  },
  {
    id: 6,
    vendor: '@FreshLogs',
    includes: 'Online Access, Email Access, DOB, Cookies, Q&A, Gender, SSN, Address, Acct&Rn license NO, ZelleON',
    balance: 1250,
    price: 110,
    status: 'soldout'
  },
  {
    id: 7,
    vendor: '@PremiumHUB',
    includes: 'Online Access, Email Access, DOB, Cookies, Q&A, Gender, SSN, Address, Acct&Rn license NO, ZelleON',
    balance: 2110,
    price: 180,
    status: 'soldout'
  },
  {
    id: 8,
    vendor: '@KingPin',
    includes: 'Online Access, Email Access, DOB, Cookies, Q&A, Gender, SSN, Address, Acct&Rn license NO, ZelleON',
    balance: 4800,
    price: 420,
    status: 'available'
  },
  {
    id: 9,
    vendor: '@ThePlug',
    includes: 'Online Access, Email Access, DOB, Cookies, Q&A, Gender, SSN, Address, Acct&Rn license NO, ZelleON',
    balance: 1160,
    price: 100,
    status: 'soldout'
  },
  {
    id: 10,
    vendor: '@BlackMarket',
    includes: 'Online Access, Email Access, DOB, Cookies, Q&A, Gender, SSN, Address, Acct&Rn license NO, ZelleON',
    balance: 3000,
    price: 270,
    status: 'available'
  },
  {
    id: 11,
    vendor: '@DarkVault',
    includes: 'Online Access, Email Access, DOB, Cookies, Q&A, Gender, SSN, Address, Acct&Rn license NO, ZelleON',
    balance: 1950,
    price: 150,
    status: 'available'
  },
  {
    id: 12,
    vendor: '@CryptoCartel',
    includes: 'Online Access, Email Access, DOB, Cookies, Q&A, Gender, SSN, Address, Acct&Rn license NO, ZelleON',
    balance: 1045,
    price: 74,
    status: 'available'
  },
  {
    id: 13,
    vendor: '@LogsMaster',
    includes: 'Online Access, Email Access, DOB, Cookies, Q&A, Gender, SSN, Address, Acct&Rn license NO, ZelleON',
    balance: 2100,
    price: 190,
    status: 'available'
  },
  {
    id: 14,
    vendor: '@ValidAccess',
    includes: 'Online Access, Email Access, DOB, Cookies, Q&A, Gender, SSN, Address, Acct&Rn license NO, ZelleON',
    balance: 8500,
    price: 700,
    status: 'available'
  },
  {
    id: 15,
    vendor: '@ElitePlug',
    includes: 'Online Access, Email Access, DOB, Cookies, Q&A, Gender, SSN, Address, Acct&Rn license NO, ZelleON',
    balance: 7740,
    price: 600,
    status: 'available'
  },
  {
    id: 16,
    vendor: '@PremiumKing',
    includes: 'Online Access, Email Access, DOB, Cookies, Q&A, Gender, SSN, Address, Acct&Rn license NO, ZelleON',
    balance: 9435,
    price: 800,
    status: 'soldout'
  },
  {
    id: 17,
    vendor: '@DarkWeb_Plug',
    includes: 'Online Access, Email Access, DOB, Cookies, Q&A, Gender, SSN, Address, Acct&Rn license NO, ZelleON',
    balance: 3899,
    price: 330,
    status: 'available'
  }
];

export default function WellsFargoPage() {
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
    <div className="wells-fargo-container">
      <div className="page-header">
        <h1>🏦 Wells Fargo Bank Logs</h1>
        <p className="subtitle">Premium bank logs with full account access</p>
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
            {wellsfargoLogs.map((log) => (
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
        .wells-fargo-container {
          background: var(--bg-card);
          border-radius: 15px;
          padding: 30px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border-color);
        }

        .page-header {
          margin-bottom: 30px;
          text-align: center;
        }

        .page-header h1 {
          font-size: 32px;
          background: linear-gradient(135deg, #fff, var(--accent-blue));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 10px;
        }

        .subtitle {
          color: var(--text-secondary);
          font-size: 16px;
        }

        .table-wrapper {
          overflow-x: auto;
          border-radius: 10px;
          border: 1px solid var(--border-color);
          background: var(--bg-secondary);
        }

        .logs-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 1200px;
        }

        .logs-table thead {
          background: var(--bg-secondary);
          color: var(--text-primary);
          border-bottom: 2px solid var(--accent-blue);
        }

        .logs-table th {
          padding: 15px;
          text-align: left;
          font-weight: 600;
          font-size: 14px;
          white-space: nowrap;
          color: var(--text-primary);
        }

        .logs-table td {
          padding: 20px 15px;
          border-bottom: 1px solid var(--border-color);
          vertical-align: middle;
          color: var(--text-secondary);
        }

        .logs-table tbody tr:hover {
          background: var(--bg-hover);
        }

        .soldout-row {
          opacity: 0.7;
        }

        .vendor-name {
          font-weight: 600;
          color: var(--accent-blue);
          font-size: 15px;
        }

        .includes-cell {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          max-width: 400px;
        }

        .include-tag {
          background: var(--bg-secondary);
          color: var(--text-secondary);
          border: 1px solid var(--border-color);
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 11px;
          white-space: nowrap;
        }

        .balance-cell {
          font-weight: 600;
          color: var(--accent-green);
          font-size: 16px;
          text-shadow: var(--glow-green);
        }

        .price-cell {
          font-weight: 700;
          color: var(--accent-blue);
          font-size: 18px;
        }

        .status-badge {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-align: center;
        }

        .status-badge.available {
          background: rgba(0, 255, 136, 0.1);
          color: var(--accent-green);
          border: 1px solid var(--accent-green);
        }

        .status-badge.soldout {
          background: rgba(255, 59, 59, 0.1);
          color: var(--accent-red);
          border: 1px solid var(--accent-red);
        }

        .btn-buy {
          background: linear-gradient(135deg, var(--accent-green), #00cc6a);
          color: var(--bg-primary);
          border: none;
          padding: 10px 25px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .btn-buy:hover {
          transform: translateY(-2px);
          box-shadow: var(--glow-green);
        }

        .btn-soldout {
          background: rgba(255, 59, 59, 0.1);
          color: var(--accent-red);
          border: 1px solid var(--accent-red);
          padding: 10px 25px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 14px;
          cursor: not-allowed;
          opacity: 1;
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .wells-fargo-container {
            padding: 15px;
          }

          .page-header h1 {
            font-size: 24px;
          }
        }
      `}</style>
    </div>
  );
}