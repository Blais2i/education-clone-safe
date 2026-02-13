'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import './TopBar.css';

export default function TopBar() {
  const [balance, setBalance] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserData() {
      const supabase = createClient();
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Get profile with balance
        const { data: profile } = await supabase
          .from('profiles')
          .select('account_balance, email')
          .eq('id', user.id)
          .single();
        
        if (profile) {
          setBalance(profile.account_balance);
          // Use email username (part before @) as display name
          const username = profile.email.split('@')[0];
          setEmail(username || 'User');
        }
      }
      
      setLoading(false);
    }

    loadUserData();
  }, []);

  const handleAddFunds = () => {
    alert('Add funds feature coming soon!');
  };

  const handleRefund = () => {
    alert('Refund request feature coming soon!');
  };

  return (
    <div className="top-bar">
      <div className="top-bar-content">
        <div className="account-balance">
          <span>Account Balance: ${loading ? '...' : balance?.toFixed(2) || '0.00'}</span>
        </div>
        <div className="top-actions">
          <button className="btn-primary" onClick={handleAddFunds}>
            Add Funds
          </button>
          <button className="btn-secondary" onClick={handleRefund}>
            Refund
          </button>
          <div className="user-menu">
            <div className="user-avatar">
              <span>{email.charAt(0).toUpperCase()}</span>
            </div>
            <span>Hi, {loading ? '...' : email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}