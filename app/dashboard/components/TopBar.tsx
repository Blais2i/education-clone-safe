// app/dashboard/components/TopBar.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import './TopBar.css';

export default function TopBar() {
  const [balance, setBalance] = useState<number | null>(null);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserData() {
      const supabase = createClient();
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('account_balance, email')
          .eq('id', user.id)
          .single();
        
        if (profile) {
          setBalance(profile.account_balance);
          setUsername(profile.email.split('@')[0] || 'User');
        }
      }
      
      setLoading(false);
    }

    loadUserData();
  }, []);

  return (
    <div className="top-bar">
      <div className="top-bar-content">
        <div className="logo-section">
          <span className="logo-icon">💳</span>
          <span className="logo-text">Cards City</span>
          <span className="logo-badge">2026</span>
        </div>

        <div className="balance-section">
          <span className="balance-label">Balance</span>
          <span className="balance-amount">
            ${loading ? '...' : balance?.toFixed(2) || '0.00'}
          </span>
        </div>

        <div className="action-buttons">
          <button className="btn-add">
            <span>+</span> Add Funds
          </button>
          <button className="btn-refund">
            <span>↩</span> Refund
          </button>
        </div>

        <div className="user-profile">
          <div className="user-avatar">
            {username.charAt(0).toUpperCase()}
          </div>
          <div className="user-info">
            <span className="user-greeting">Hi,</span>
            <span className="user-name">{loading ? '...' : username}</span>
          </div>
        </div>
      </div>
    </div>
  );
}