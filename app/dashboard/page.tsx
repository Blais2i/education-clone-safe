// app/dashboard/page.tsx
'use client';

import React, { useState } from 'react';
import './dashboard-page.css';

export default function DashboardPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Why are you doing us a favor giving us the cards to cash out while you can do it and keep the money to yourselves?",
      answer: "Yes, it's true that we cash out too, but the problem is that law enforcement regularly tracks where the money goes from the victims. If people like you from different addresses cash out, it becomes very hard to track. So, giving you some cards means it becomes really difficult for authorities to track people who are in different countries. The more diverse addresses and locations the money flows through, the safer everyone is."
    },
    {
      question: "How do I fund my account?",
      answer: "Click the 'Add Funds' button in the top bar. Enter the amount in USD, then send the equivalent USDT (TRC20) to the provided address. Your balance will update after admin verification (usually within 1 hour)."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We only accept USDT (TRC20) for all purchases and deposits. This ensures fast, secure, and anonymous transactions. Minimum deposit is $10 USD worth of USDT."
    },
    {
      question: "How long does delivery take?",
      answer: "Orders are delivered within 15 minutes to your email after payment confirmation. VIP Cash-Out services take 24-48 hours as we process through multiple secure channels."
    },
    {
      question: "What is your refund policy?",
      answer: "You have 24 hours to request a refund if the purchased logs are invalid. Simply click the 'Refund' button in the top bar and submit your request. All logs are guaranteed valid, but we'll replace or refund if there's an issue."
    },
    {
      question: "How do I receive my purchased items?",
      answer: "All items are sent to the email address you provide during checkout. Make sure to enter a valid email address that you have access to."
    },
    {
      question: "What is the VIP Cash-Out service?",
      answer: "VIP Cash-Out allows us to transfer funds from bank logs/cards to your personal crypto wallet. We charge a 50% fee which covers our risk and ensures secure, untraceable transfers through multiple addresses across different regions."
    },
    {
      question: "Why USDT only?",
      answer: "USDT on TRC20 network offers the fastest transactions with lowest fees. It's also the most widely accepted stablecoin, making it perfect for our marketplace."
    },
    {
      question: "Is my information safe?",
      answer: "Yes! We use Supabase authentication and never store sensitive information. All transactions are anonymous and we recommend using temporary emails for maximum privacy."
    }
  ];

  const steps = [
    {
      icon: "💰",
      title: "1. Fund Your Account",
      description: "Click 'Add Funds' in the top bar, enter amount, and send USDT to the provided address"
    },
    {
      icon: "🛒",
      title: "2. Browse Products",
      description: "Navigate through Bank Orders, Cards, or VIP services using the menu below"
    },
    {
      icon: "📧",
      title: "3. Provide Email",
      description: "Enter your email address where you'll receive the purchased items"
    },
    {
      icon: "✅",
      title: "4. Confirm Payment",
      description: "Click 'I've Sent Payment' and wait for confirmation (usually within 15 minutes)"
    },
    {
      icon: "📬",
      title: "5. Check Your Email",
      description: "All items are delivered to your email - check spam folder if not in inbox"
    }
  ];

  return (
    <div className="dashboard-container">
      {/* Welcome Banner without "Established 2026" */}
      <div className="welcome-banner">
        <div className="welcome-content">
          <div className="logo-large">
            <span className="logo-icon-large">💳</span>
            <h1 className="welcome-title">Welcome to Cards City</h1>
          </div>
          <p className="welcome-subtitle">Your Premium Digital Marketplace</p>
        </div>
      </div>

      {/* How to Buy - Step by Step */}
      <div className="section-container">
        <h2 className="section-title">
          <span className="title-icon">📋</span>
          How to Buy - Simple 5-Step Process
        </h2>
        <div className="steps-grid">
          {steps.map((step, index) => (
            <div key={index} className="step-card">
              <div className="step-icon">{step.icon}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Important Notices */}
      <div className="notices-grid">
        {/* Account Funding Notice */}
        <div className="notice-card funding">
          <div className="notice-header">
            <span className="notice-icon">💰</span>
            <h3>Account Funding Required</h3>
          </div>
          <div className="notice-content">
            <p className="notice-highlight">BEFORE YOU CAN PURCHASE ANY OF OUR TOOLS, YOUR ACCOUNT MUST BE FUNDED.</p>
            <div className="notice-steps">
              <p><span className="step-bullet">1️⃣</span> Go to <strong>Add Funds</strong> in the top bar</p>
              <p><span className="step-bullet">2️⃣</span> Enter amount in USD</p>
              <p><span className="step-bullet">3️⃣</span> Send USDT (TRC20) to the provided address</p>
              <p><span className="step-bullet">4️⃣</span> Funds reflect after admin verification</p>
            </div>
          </div>
        </div>

        {/* Refund Policy */}
        <div className="notice-card refund">
          <div className="notice-header">
            <span className="notice-icon">↩️</span>
            <h3>24-Hour Refund Policy</h3>
          </div>
          <div className="notice-content">
            <p className="notice-highlight">If you purchase any logs, Request REFUND within 24 hours via Refund Button</p>
            <p>If logs info are invalid <span className="badge-guaranteed">ALL LOGS ARE GUARANTEED VALID</span>, submit a ticket to replace or refund.</p>
            <div className="refund-note">
              <span className="note-icon">⏰</span>
              <span>Refund requests after 24 hours will not be accepted</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method Section */}
      <div className="payment-section">
        <h2 className="section-title">
          <span className="title-icon">💳</span>
          Payment Method
        </h2>
        
        <div className="payment-method-card">
          <div className="crypto-logo">
            <div className="crypto-icon">₿</div>
            <div className="crypto-details">
              <span className="crypto-name">USDT (TRC20)</span>
              <span className="crypto-note">Fast, secure, and low fees</span>
            </div>
          </div>

          <div className="deposit-instructions">
            <h4>How To Deposit with USDT:</h4>
            <ol className="instruction-steps">
              <li>
                <span className="step-marker">1</span>
                <div className="step-text">
                  <strong>Click "Add Funds"</strong> in the top bar menu
                </div>
              </li>
              <li>
                <span className="step-marker">2</span>
                <div className="step-text">
                  <strong>Enter the amount</strong> you want to deposit (minimum $10)
                </div>
              </li>
              <li>
                <span className="step-marker">3</span>
                <div className="step-text">
                  <strong>Send USDT (TRC20)</strong> to the provided address
                </div>
              </li>
              <li>
                <span className="step-marker">4</span>
                <div className="step-text">
                  <strong>Click "I've Sent Payment"</strong> and wait for confirmation
                </div>
              </li>
            </ol>
          </div>

          <div className="delivery-note">
            <div className="note-content">
              <span className="note-emoji">⏱️</span>
              <div>
                <strong>Funds will reflect after admin verification</strong>
                <p>Orders arrive in your email within 15 minutes after payment confirmation</p>
              </div>
            </div>
          </div>

          <div className="network-info">
            <span className="network-badge">TRC20</span>
            <span className="network-badge">USDT</span>
            <span className="network-badge">Min $10</span>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <h2 className="section-title">
          <span className="title-icon">❓</span>
          Frequently Asked Questions
        </h2>
        <p className="faq-subtitle">Click on any question to see the answer</p>

        <div className="faq-grid">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button 
                className={`faq-question ${openFaq === index ? 'active' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <span className="faq-icon">{openFaq === index ? '−' : '+'}</span>
                <span className="faq-question-text">{faq.question}</span>
              </button>
              {openFaq === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}