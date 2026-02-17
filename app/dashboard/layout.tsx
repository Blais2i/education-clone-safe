// app/dashboard/layout.tsx
import React from 'react';
import TopBar from './components/TopBar';
import NavBar from './components/NavBar';
import ChatWidget from './components/ChatWidget';
import TawkToWidget from './components/TawkToWidget';
import './dashboard.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-wrapper">
      <TopBar />
      <NavBar />
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <p>©2026 Cards City - Your Premium Marketplace</p>
      </footer>
      <TawkToWidget /> {/* This loads Tawk.to in the background */}
      <ChatWidget />   {/* This is your custom chat button */}
    </div>
  );
}