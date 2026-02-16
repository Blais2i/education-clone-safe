// app/dashboard/vip/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';

export default function VIPPage() {
  return (
    <div className="vip-container">
      <div className="vip-header">
        <h1>👑 VIP Cash-Out Service</h1>
        <p className="vip-subtitle">Professional money transfer service - We send crypto to your wallet</p>
      </div>

      <div className="vip-cards">
        <Link href="/dashboard/vip/cashout" className="vip-card">
          <div className="vip-icon">💸</div>
          <h2>Cash-Out Service</h2>
          <p>We transfer money from bank logs/cards to your crypto wallet</p>
          <div className="vip-features">
            <span>✅ No tracing - multiple addresses</span>
            <span>✅ 50% service fee (includes risk coverage)</span>
            <span>✅ Crypto sent to your wallet</span>
            <span>✅ Amounts: $500 - $10,000</span>
          </div>
          <div className="vip-price">50% Fee</div>
          <button className="btn-vip-small">Get Started →</button>
        </Link>
      </div>

      <div className="info-section">
        <h3>Why Choose Our VIP Cash-Out Service?</h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-icon">🔒</span>
            <h4>Security First</h4>
            <p>We use multiple addresses across different regions to avoid detection and tracing</p>
          </div>
          <div className="info-item">
            <span className="info-icon">⚡</span>
            <h4>Quick Processing</h4>
            <p>Funds sent within 24-48 hours after confirmation</p>
          </div>
          <div className="info-item">
            <span className="info-icon">💰</span>
            <h4>Why 50% Fee?</h4>
            <p>Covers our risk, time, and ensures serious clients only - we take all the risk</p>
          </div>
          <div className="info-item">
            <span className="info-icon">🌍</span>
            <h4>Global Coverage</h4>
            <p>We route through different regions to maximize safety</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .vip-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .vip-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .vip-header h1 {
          font-size: 42px;
          background: linear-gradient(135deg, #ffd700, #ffa500);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 10px;
        }

        .vip-subtitle {
          color: #666;
          font-size: 18px;
        }

        .vip-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 30px;
          margin-top: 40px;
          justify-content: center;
        }

        .vip-card {
          background: white;
          border-radius: 15px;
          padding: 40px 30px;
          text-decoration: none;
          color: inherit;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s, box-shadow 0.3s;
          border: 2px solid transparent;
          display: flex;
          flex-direction: column;
        }

        .vip-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(255, 215, 0, 0.2);
          border-color: #ffd700;
        }

        .vip-icon {
          font-size: 64px;
          margin-bottom: 20px;
          text-align: center;
        }

        .vip-card h2 {
          font-size: 28px;
          margin-bottom: 15px;
          color: #333;
          text-align: center;
        }

        .vip-card p {
          color: #666;
          text-align: center;
          margin-bottom: 25px;
          line-height: 1.6;
        }

        .vip-features {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 25px;
        }

        .vip-features span {
          color: #28a745;
          font-size: 14px;
        }

        .vip-price {
          font-size: 28px;
          font-weight: bold;
          color: #ffd700;
          text-align: center;
          margin-bottom: 20px;
        }

        .btn-vip-small {
          width: 100%;
          padding: 15px;
          background: linear-gradient(135deg, #ffd700 0%, #ffa500 100%);
          color: #000;
          border: none;
          border-radius: 8px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-vip-small:hover {
          transform: scale(1.05);
          box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);
        }

        .info-section {
          margin-top: 60px;
          padding: 40px;
          background: linear-gradient(135deg, #f8f9fa, #ffffff);
          border-radius: 20px;
          border: 1px solid #ffd700;
        }

        .info-section h3 {
          text-align: center;
          font-size: 28px;
          color: #333;
          margin-bottom: 40px;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }

        .info-item {
          text-align: center;
          padding: 20px;
        }

        .info-icon {
          font-size: 40px;
          display: block;
          margin-bottom: 15px;
        }

        .info-item h4 {
          font-size: 18px;
          color: #333;
          margin-bottom: 10px;
        }

        .info-item p {
          color: #666;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .vip-header h1 {
            font-size: 32px;
          }

          .vip-cards {
            grid-template-columns: 1fr;
          }

          .info-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}