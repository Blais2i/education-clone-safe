'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './NavBar.css';

export default function NavBar() {
  const pathname = usePathname();

  const navItems: { name: string; href: string; icon: string; badge?: string }[] = [
    { name: 'Dashboard', href: '/dashboard', icon: 'home' },
    { name: 'Bank Orders', href: '/dashboard/bank-orders', icon: 'bank' },
    { name: 'Cards', href: '/dashboard/cards', icon: 'card' },
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
                {item.icon === 'bank' && (
                  <path d="M3 21h18M3 10h18M5 10v11M19 10v11M12 10v11M12 3l9 7H3l9-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                )}
                {item.icon === 'card' && (
                  <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
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