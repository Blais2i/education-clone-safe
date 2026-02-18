// app/dashboard/layout.tsx
import React from 'react';
import TopBar from './components/TopBar';
import NavBar from './components/NavBar';
import ChatWidget from './components/ChatWidget';
import TawkToWidget from './components/TawkToWidget';
import TawkToAdminWidget from './components/TawkToAdminWidget';
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
      <TawkToWidget /> {/* Loads Tawk.to in background */}
      <TawkToAdminWidget /> {/* Optional admin helper */}
      <ChatWidget /> {/* Your custom chat button that opens Tawk */}
    </div>
  );
}