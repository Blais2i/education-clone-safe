import React from 'react';
import TopBar from './components/TopBar';
import NavBar from './components/NavBar';
import ChatWidget from './components/ChatWidget';
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
        <p>©2025 Logs City</p>
      </footer>
      <ChatWidget />
    </div>
  );
}