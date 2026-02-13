'use client';

import React, { useState } from 'react';

export default function AddressDeliveryPage() {
  const [address, setAddress] = useState('');

  return (
    <div className="vip-container">
      <div className="vip-header">
        <h1>📦 Address Delivery Service</h1>
        <p className="vip-subtitle">We ship physical cards to your address</p>
      </div>

      <div className="coming-soon">
        <h2>🚀 Coming Soon!</h2>
        <p>This service is being prepared. Check back later.</p>
        <div className="features-list">
          <h3>What to expect:</h3>
          <ul>
            <li>✅ Discreet packaging</li>
            <li>✅ Worldwide shipping</li>
            <li>✅ Tracking number provided</li>
            <li>✅ Insurance included</li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        .vip-container {
          background: linear-gradient(135deg, #fff9e6 0%, #fff0d4 100%);
          border-radius: 15px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          border: 2px solid #ffd700;
          min-height: 400px;
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
        }

        .vip-subtitle {
          color: #666;
          font-size: 18px;
        }

        .coming-soon {
          text-align: center;
          padding: 60px 20px;
        }

        .coming-soon h2 {
          font-size: 32px;
          color: #333;
          margin-bottom: 20px;
        }

        .coming-soon p {
          color: #666;
          font-size: 18px;
          margin-bottom: 30px;
        }

        .features-list {
          max-width: 400px;
          margin: 0 auto;
          text-align: left;
          background: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }

        .features-list h3 {
          color: #333;
          margin-bottom: 15px;
        }

        .features-list ul {
          list-style: none;
          padding: 0;
        }

        .features-list li {
          padding: 10px 0;
          color: #555;
          border-bottom: 1px solid #eee;
        }

        .features-list li:last-child {
          border-bottom: none;
        }
      `}</style>
    </div>
  );
}