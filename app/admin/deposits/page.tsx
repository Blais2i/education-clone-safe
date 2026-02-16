// app/admin/deposits/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function AdminDepositsPage() {
  const [deposits, setDeposits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');
  const supabase = createClient();

  useEffect(() => {
    loadDeposits();
  }, [filter]);

  const loadDeposits = async () => {
    const { data } = await supabase
      .from('deposits')
      .select(`
        *,
        profiles:user_id (email)
      `)
      .eq('status', filter)
      .order('created_at', { ascending: false });

    if (data) setDeposits(data);
    setLoading(false);
  };

  const markAsCompleted = async (depositId: string, userId: string, amount: number) => {
    if (!confirm('Have you verified this payment in your wallet?')) return;

    setLoading(true);
    
    try {
      // 1. Update deposit status
      const { error: updateError } = await supabase
        .from('deposits')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString()
        })
        .eq('id', depositId);

      if (updateError) throw updateError;

      // 2. ADD TO USER'S BALANCE! 🎉
      const { error: balanceError } = await supabase
        .rpc('add_to_balance', {
          user_id: userId,
          amount: amount
        });

      if (balanceError) throw balanceError;

      // 3. Refresh the list
      loadDeposits();
      
      alert('✅ Deposit confirmed and balance updated!');

    } catch (error) {
      console.error('Error processing deposit:', error);
      alert('❌ Error processing deposit');
    } finally {
      setLoading(false);
    }
  };

  const markAsFailed = async (depositId: string) => {
    if (!confirm('Mark this deposit as failed?')) return;

    await supabase
      .from('deposits')
      .update({ status: 'failed' })
      .eq('id', depositId);

    loadDeposits();
  };

  return (
    <div className="admin-container">
      <div className="header">
        <h1>💰 Deposit Management</h1>
        <div className="filters">
          <button 
            className={filter === 'pending' ? 'active' : ''}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button 
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
          <button 
            className={filter === 'failed' ? 'active' : ''}
            onClick={() => setFilter('failed')}
          >
            Failed
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading deposits...</div>
      ) : (
        <div className="deposits-list">
          {deposits.length === 0 ? (
            <div className="no-data">No {filter} deposits found</div>
          ) : (
            deposits.map(deposit => (
              <div key={deposit.id} className="deposit-card">
                <div className="deposit-header">
                  <span className={`status-badge ${deposit.status}`}>
                    {deposit.status.toUpperCase()}
                  </span>
                  <span className="amount">${deposit.amount_usd}</span>
                </div>
                
                <div className="deposit-details">
                  <p><strong>User:</strong> {deposit.profiles?.email}</p>
                  <p><strong>User ID:</strong> {deposit.user_id}</p>
                  <p><strong>USDT Amount:</strong> {deposit.amount_usdt} USDT</p>
                  <p><strong>Address:</strong> <code>{deposit.usdt_address}</code></p>
                  <p><strong>Requested:</strong> {new Date(deposit.created_at).toLocaleString()}</p>
                  {deposit.completed_at && (
                    <p><strong>Completed:</strong> {new Date(deposit.completed_at).toLocaleString()}</p>
                  )}
                </div>

                {deposit.status === 'pending' && (
                  <div className="action-buttons">
                    <button 
                      className="btn-verify"
                      onClick={() => {
                        // Open your wallet to verify
                        window.open('https://tronscan.org/#/address/' + deposit.usdt_address, '_blank');
                      }}
                    >
                      🔍 Verify in Blockchain
                    </button>
                    <button 
                      className="btn-approve"
                      onClick={() => markAsCompleted(deposit.id, deposit.user_id, deposit.amount_usd)}
                      disabled={loading}
                    >
                      ✅ Confirm Payment
                    </button>
                    <button 
                      className="btn-reject"
                      onClick={() => markAsFailed(deposit.id)}
                    >
                      ❌ Mark as Failed
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      <style jsx>{`
        .admin-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 30px;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .header h1 {
          color: #333;
        }

        .filters {
          display: flex;
          gap: 10px;
        }

        .filters button {
          padding: 8px 16px;
          border: 2px solid #e0e0e0;
          background: white;
          border-radius: 6px;
          cursor: pointer;
        }

        .filters button.active {
          background: #fbbf24;
          border-color: #f59e0b;
        }

        .loading {
          text-align: center;
          padding: 50px;
          color: #666;
        }

        .no-data {
          text-align: center;
          padding: 50px;
          background: #f8f9fa;
          border-radius: 10px;
          color: #666;
        }

        .deposits-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .deposit-card {
          background: white;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          border-left: 4px solid #fbbf24;
        }

        .deposit-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .status-badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        .status-badge.pending {
          background: #fff3cd;
          color: #856404;
        }

        .status-badge.completed {
          background: #d4edda;
          color: #155724;
        }

        .status-badge.failed {
          background: #f8d7da;
          color: #721c24;
        }

        .amount {
          font-size: 20px;
          font-weight: 700;
          color: #f59e0b;
        }

        .deposit-details {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 15px;
        }

        .deposit-details p {
          margin: 8px 0;
        }

        .deposit-details code {
          background: #2d2d2d;
          color: #10b981;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 12px;
        }

        .action-buttons {
          display: flex;
          gap: 10px;
        }

        .btn-verify, .btn-approve, .btn-reject {
          flex: 1;
          padding: 12px;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
        }

        .btn-verify {
          background: #e8f4fd;
          color: #0056b3;
        }

        .btn-approve {
          background: #10b981;
          color: white;
        }

        .btn-reject {
          background: #ef4444;
          color: white;
        }

        .btn-approve:hover, .btn-reject:hover, .btn-verify:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}