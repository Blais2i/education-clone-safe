// app/dashboard/components/NavBar.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import './NavBar.css';

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { 
      name: 'Bank Orders', 
      href: '/dashboard/bank-orders', 
      icon: '🏦',
      dropdown: [
        { name: 'Wells Fargo', href: '/dashboard/bank-orders/wells-fargo' },
        { name: 'Citi Bank', href: '/dashboard/bank-orders/citi-bank' }
      ]
    },
    { 
      name: 'Cards', 
      href: '/dashboard/cards', 
      icon: '💳',
      dropdown: [
        { name: 'Visa', href: '/dashboard/cards/visa' },
        { name: 'Mastercard', href: '/dashboard/cards/mastercard' }
      ]
    },
    { 
      name: 'VIP', 
      href: '/dashboard/vip', 
      icon: '👑',
      badge: 'PREMIUM',
      dropdown: [
        { name: 'Card Loading', href: '/dashboard/vip/card-loading' },
        { name: 'Address Delivery', href: '/dashboard/vip/address-delivery' }
      ]
    },
  ];

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <nav className="main-nav">
      <div className="nav-container">
        <div className="nav-items">
          {navItems.map((item) => (
            <div 
              key={item.name}
              className="nav-item-wrapper"
              onMouseEnter={() => setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {item.dropdown ? (
                <>
                  <div className={`nav-item ${pathname.startsWith(item.href) ? 'active' : ''} ${item.name === 'VIP' ? 'vip-item' : ''}`}>
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.name}</span>
                    {item.badge && <span className="badge-vip">{item.badge}</span>}
                    <svg className="dropdown-arrow" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </div>
                  
                  {activeDropdown === item.name && (
                    <div className="dropdown-menu">
                      {item.dropdown.map((dropItem) => (
                        <Link
                          key={dropItem.name}
                          href={dropItem.href}
                          className="dropdown-item"
                        >
                          {dropItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link 
                  href={item.href} 
                  className={`nav-item ${pathname === item.href ? 'active' : ''}`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.name}</span>
                </Link>
              )}
            </div>
          ))}
        </div>

        <button onClick={handleLogout} className="nav-item logout">
          <span className="nav-icon">🚪</span>
          <span className="nav-label">Logout</span>
        </button>
      </div>
    </nav>
  );
}