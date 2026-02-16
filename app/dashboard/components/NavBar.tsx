// app/dashboard/components/NavBar.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import './NavBar.css';

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

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
        { name: 'Cash-Out Service', href: '/dashboard/vip/cashout' }
      ]
    },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (openDropdown) {
        const dropdownElement = dropdownRefs.current[openDropdown];
        if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
          setOpenDropdown(null);
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  // Close dropdown when route changes
  useEffect(() => {
    setOpenDropdown(null);
  }, [pathname]);

  const handleDropdownClick = (itemName: string, hasDropdown: boolean, href?: string) => {
    if (hasDropdown) {
      // Toggle dropdown - if clicking the same dropdown, close it; otherwise open it
      setOpenDropdown(openDropdown === itemName ? null : itemName);
    } else if (href) {
      // Navigate to the page
      router.push(href);
    }
  };

  const handleDropdownItemClick = (href: string) => {
    setOpenDropdown(null); // Close dropdown after clicking an item
    router.push(href);
  };

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
          {navItems.map((item) => {
            const hasDropdown = !!item.dropdown && item.dropdown.length > 0;
            const isOpen = openDropdown === item.name;
            
            return (
              <div 
                key={item.name}
                className="nav-item-wrapper"
                ref={(el) => { dropdownRefs.current[item.name] = el; }}
              >
                {hasDropdown ? (
                  <>
                    <button 
                      className={`nav-item ${pathname.startsWith(item.href) ? 'active' : ''} ${item.name === 'VIP' ? 'vip-item' : ''} ${isOpen ? 'dropdown-open' : ''}`}
                      onClick={() => handleDropdownClick(item.name, hasDropdown)}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                    >
                      <span className="nav-icon">{item.icon}</span>
                      <span className="nav-label">{item.name}</span>
                      {item.badge && <span className="badge-vip">{item.badge}</span>}
                      <svg 
                        className={`dropdown-arrow ${isOpen ? 'rotated' : ''}`} 
                        viewBox="0 0 24 24" 
                        width="16" 
                        height="16" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2"
                      >
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </button>
                    
                    {isOpen && (
                      <div className="dropdown-menu">
                        {item.dropdown?.map((dropItem) => (
                          <button
                            key={dropItem.name}
                            className="dropdown-item"
                            onClick={() => handleDropdownItemClick(dropItem.href)}
                          >
                            {dropItem.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <button 
                    onClick={() => handleDropdownClick(item.name, false, item.href)}
                    className={`nav-item ${pathname === item.href ? 'active' : ''}`}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.name}</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <button onClick={handleLogout} className="nav-item logout">
          <span className="nav-icon">🚪</span>
          <span className="nav-label">Logout</span>
        </button>
      </div>
    </nav>
  );
}
