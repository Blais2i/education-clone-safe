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

  const navItems: { 
    name: string; 
    href: string; 
    icon: string; 
    badge?: string;
    dropdown?: { name: string; href: string; }[];
  }[] = [
    { name: 'Dashboard', href: '/dashboard', icon: 'home' },
    { 
      name: 'Bank Orders', 
      href: '/dashboard/bank-orders', 
      icon: 'bank',
      dropdown: [
        { name: 'Wells Fargo Logs', href: '/dashboard/bank-orders/wells-fargo' },
        { name: 'Citi Bank', href: '/dashboard/bank-orders/citi-bank' }
      ]
    },
    { 
      name: 'Cards', 
      href: '/dashboard/cards', 
      icon: 'card',
      dropdown: [
        { name: 'Visa Card', href: '/dashboard/cards/visa' },
        { name: 'Master Card', href: '/dashboard/cards/mastercard' }
      ]
    },
    { 
      name: 'VIP', 
      href: '/dashboard/vip', 
      icon: 'crown',
      badge: 'PREMIUM',
      dropdown: [
        { name: '💳 Card Loading Service', href: '/dashboard/vip/card-loading' },
        { name: '📦 Address Delivery', href: '/dashboard/vip/address-delivery' }
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
                      {item.icon === 'crown' && (
                        <path d="M12 2L15 9H22L16 14L19 22L12 17.5L5 22L8 14L2 9H9L12 2Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                      )}
                    </svg>
                  )}
                  {item.name}
                  {item.badge && <span className="badge-vip">{item.badge}</span>}
                  <svg className="dropdown-arrow" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </div>
                
                {activeDropdown === item.name && (
                  <div className={`dropdown-menu ${item.name === 'VIP' ? 'vip-dropdown' : ''}`}>
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
                {item.icon && (
                  <svg className="nav-icon" viewBox="0 0 24 24" fill="none">
                    {item.icon === 'home' && (
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2"/>
                    )}
                  </svg>
                )}
                {item.name}
                {item.badge && <span className="badge-new">{item.badge}</span>}
              </Link>
            )}
          </div>
        ))}
        <button onClick={handleLogout} className="nav-item logout" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          Logout
        </button>
      </div>
    </nav>
  );
}