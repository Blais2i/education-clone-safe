// app/dashboard/components/TopBar.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import AddFundsModal from './AddFundsModal';
import RefundModal from './RefundModal';
import './TopBar.css';

export default function TopBar() {
  const [balance, setBalance] = useState<number | null>(null);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [showRefund, setShowRefund] = useState(false);
  const supabase = createClient();

  const loadUserData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('account_balance, email')
        .eq('id', user.id)
        .single();
      
      if (profile) {
        setBalance(profile.account_balance || 0);
        setUsername(profile.email.split('@')[0] || 'User');
      }
    }
    
    setLoading(false);
  };

  useEffect(() => {
    loadUserData();

    // Subscribe to real-time balance updates
    const subscription = supabase
      .channel('profile_changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'profiles'
        },
        (payload) => {
          if (payload.new && 'account_balance' in payload.new) {
            setBalance(payload.new.account_balance);
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleAddFundsSuccess = (amount: number) => {
    // Balance will update via real-time subscription
    setShowAddFunds(false);
  };

  const handleRefundSuccess = () => {
    // Refresh balance after refund request
    loadUserData();
  };

  return (
    <>
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
            <button 
              className="btn-add"
              onClick={() => setShowAddFunds(true)}
            >
              <span>+</span> Add Funds
            </button>
            <button 
              className="btn-refund"
              onClick={() => setShowRefund(true)}
            >
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

      {showAddFunds && (
        <AddFundsModal
          onClose={() => setShowAddFunds(false)}
          onSuccess={handleAddFundsSuccess}
        />
      )}

      {showRefund && (
        <RefundModal
          onClose={() => setShowRefund(false)}
          onSuccess={handleRefundSuccess}
        />
      )}
    </>
  );
}