// app/dashboard/bank-orders/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';

export default function BankOrdersPage() {
  const banks = [
    {
      name: 'Wells Fargo',
      path: '/dashboard/bank-orders/wells-fargo',
      icon: '🏦',
      description: 'Bank logs with full account access',
      count: '17 logs available',
      color: '#cd2e3e' // Wells Fargo red
    },
    {
      name: 'Citi Bank',
      path: '/dashboard/bank-orders/citi-bank',
      icon: '🏛️',
      description: 'Citi bank logs and transfers',
      count: 'Coming soon',
      color: '#003399' // Citi blue
    }
  ];

  return (
    <div className="bank-orders-container">
      <div className="page-header">
        <h1>🏦 Bank Orders</h1>
        <p className="subtitle">Select a bank to view available logs</p>
      </div>

      <div className="banks-grid">
        {banks.map((bank) => (
          <Link href={bank.path} key={bank.name} className="bank-card">
            <div className="bank-icon" style={{ background: bank.color }}>
              <span>{bank.icon}</span>
            </div>
            <div className="bank-info">
              <h2>{bank.name}</h2>
              <p className="bank-description">{bank.description}</p>
              <p className="bank-count">{bank.count}</p>
            </div>
            <div className="arrow">
              <span>→</span>
            </div>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .bank-orders-container {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .page-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .page-header h1 {
          font-size: 36px;
          color: #003399;
          margin-bottom: 10px;
        }

        .subtitle {
          color: #666;
          font-size: 18px;
        }

        .banks-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          margin-top: 30px;
        }

        .bank-card {
          background: white;
          border-radius: 15px;
          padding: 30px;
          text-decoration: none;
          color: inherit;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 20px;
          border: 2px solid transparent;
        }

        .bank-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          border-color: #003399;
        }

        .bank-icon {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          color: white;
          flex-shrink: 0;
        }

        .bank-info {
          flex: 1;
        }

        .bank-info h2 {
          font-size: 20px;
          margin-bottom: 5px;
          color: #333;
        }

        .bank-description {
          color: #666;
          font-size: 14px;
          margin-bottom: 5px;
        }

        .bank-count {
          color: #28a745;
          font-size: 13px;
          font-weight: 600;
        }

        .arrow {
          font-size: 24px;
          color: #003399;
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.3s ease;
        }

        .bank-card:hover .arrow {
          opacity: 1;
          transform: translateX(0);
        }

        @media (max-width: 768px) {
          .page-header h1 {
            font-size: 28px;
          }

          .subtitle {
            font-size: 16px;
          }

          .banks-grid {
            grid-template-columns: 1fr;
          }

          .bank-card {
            padding: 20px;
          }

          .bank-icon {
            width: 50px;
            height: 50px;
            font-size: 24px;
          }
        }
      `}</style>
    </div>
  );
}