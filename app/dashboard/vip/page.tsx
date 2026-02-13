'use client';

import React from 'react';
import Link from 'next/link';

export default function VIPPage() {
  return (
    <div className="vip-container">
      <div className="vip-header">
        <h1>👑 VIP Services</h1>
        <p className="vip-subtitle">Premium carding assistance for professionals</p>
      </div>

      <div className="vip-cards">
        <Link href="/dashboard/vip/card-loading" className="vip-card">
          <div className="vip-icon">💳</div>
          <h2>Card Loading Service</h2>
          <p>We load cards for you - just pay and provide address</p>
          <div className="vip-features">
            <span>✅ No experience needed</span>
            <span>✅ Bitcoin payment</span>
            <span>✅ Discreet delivery</span>
          </div>
          <div className="vip-price">Starting at $100</div>
          <button className="btn-vip-small">Get Started →</button>
        </Link>

        <Link href="/dashboard/vip/address-delivery" className="vip-card">
          <div className="vip-icon">📦</div>
          <h2>Address Delivery</h2>
          <p>Physical card shipping to your location</p>
          <div className="vip-features">
            <span>✅ Worldwide shipping</span>
            <span>✅ Tracking included</span>
            <span>✅ Insurance</span>
          </div>
          <div className="vip-price">Coming Soon</div>
          <button className="btn-vip-small" disabled>Notify Me</button>
        </Link>
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
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
          margin-top: 40px;
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
          font-size: 24px;
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
          font-size: 24px;
          font-weight: bold;
          color: #ffd700;
          text-align: center;
          margin-bottom: 20px;
        }

        .btn-vip-small {
          width: 100%;
          padding: 12px;
          background: linear-gradient(135deg, #ffd700 0%, #ffa500 100%);
          color: #000;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-vip-small:hover {
          transform: scale(1.05);
          box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);
        }

        .btn-vip-small:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }
      `}</style>
    </div>
  );
}