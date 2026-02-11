import React from 'react';
import './dashboard-page.css';

export default function DashboardPage() {
  return (
    <div className="content-container">
      {/* Account Funding Section */}
      <section className="info-card">
        <h2 className="section-title">ACCOUNT FUNDING</h2>
        <p className="funding-notice">
          BEFORE YOU CAN PURCHASE ANY OF OUR TOOLS, YOUR ACCOUNT MUST BE FUNDED. 
          GO TO ACCOUNT AND ADD FUNDS THEN PROCEED.
        </p>
      </section>

      {/* Refund Policy Section */}
      <section className="info-card">
        <h2 className="section-title">REFUND POLICY</h2>
        <p className="refund-policy">
          If you purchase any logs, Request REFUND within 24 hours via Refund Button, 
          if logs info are invalid (ALL LOGS ARE GUARANTEED VALID), submit a ticket 
          to replace or to refund.
        </p>
      </section>

      {/* Payment Method Section */}
      <section className="info-card">
        <h3 className="payment-title">Payment Method:</h3>
        <div className="bitcoin-logo">
          <div className="btc-icon">₿</div>
          <span className="bitcoin-text">itcoin</span>
        </div>

        <div className="deposit-instructions">
          <h4 className="deposit-title">How To Deposit:</h4>
          <ol className="deposit-steps">
            <li>Click on the Account dropdown Menu</li>
            <li>Click Deposit</li>
            <li>Input an amount</li>
          </ol>
          <p className="confirmation-note">
            Funds will automatically reflect after 1st btc confirmation. 
            Orders will arrive in email within 15 minutes
          </p>
        </div>
      </section>
    </div>
  );
}