'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './NavBar.css';

export default function NavBar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: 'home' },
    { name: 'Bank Logs', href: '/dashboard/bank-logs', icon: 'logs' },
    { name: 'Cards', href: '/dashboard/cards', icon: 'card' },
    { name: 'Cashapp', href: '/dashboard/cashapp' },
    { name: 'Paypal', href: '/dashboard/paypal', badge: 'NEW' },
    { name: 'Dumps', href: '/dashboard/dumps' },
    { name: 'Paxful', href: '/dashboard/paxful' },
    { name: 'Account', href: '/dashboard/account', icon: 'user' },
  ];

  return (
    <nav className="main-nav">
      <div className="nav-container">
        {navItems.map((item) => (
          <Link 
            key={item.name}
            href={item.href} 
            className={`nav-item ${pathname === item.href ? 'active' : ''}`}
          >
            {item.icon && (
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none">
                {item.icon === 'home' && (
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2"/>
                )}
                {item.icon === 'logs' && (
                  <>
                    <rect x="3" y="3" width="7" height="9" stroke="currentColor" strokeWidth="2"/>
                    <rect x="14" y="3" width="7" height="5" stroke="currentColor" strokeWidth="2"/>
                  </>
                )}
                {item.icon === 'card' && (
                  <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                )}
                {item.icon === 'user' && (
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                )}
              </svg>
            )}
            {item.name}
            {item.badge && <span className="badge-new">{item.badge}</span>}
          </Link>
        ))}
        <Link href="/login" className="nav-item logout">
          Logout
        </Link>
      </div>
    </nav>
  );
}