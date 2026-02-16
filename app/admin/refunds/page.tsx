// app/admin/refunds/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function AdminRefundsPage() {
  const [refunds, setRefunds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    loadRefunds();
  }, []);

  const loadRefunds = async () => {
    const { data } = await supabase
      .from('refunds')
      .select(`
        *,
        profiles:user_id (email)
      `)
      .order('requested_at', { ascending: false });

    if (data) setRefunds(data);
    setLoading(false);
  };

  const handleProcessRefund = async (refundId: string, action: 'approve' | 'reject') => {
    const refund = refunds.find(r => r.id === refundId);
    
    if (action === 'approve') {
      // Process the refund (you would initiate USDT transfer here)
      await supabase
        .from('refunds')
        .update({
          status: 'completed',
          processed_at: new Date().toISOString(),
          completed_at: new Date().toISOString()
        })
        .eq('id', refundId);

      // Deduct from user balance
      await supabase.rpc('subtract_from_balance', {
        user_id: refund.user_id,
        amount: refund.amount
      });
    } else {
      // Reject refund
      await supabase
        .from('refunds')
        .update({
          status: 'rejected',
          processed_at: new Date().toISOString()
        })
        .eq('id', refundId);
    }

    loadRefunds();
  };

  return (
    <div className="admin-container">
      <h1>Refund Requests</h1>
      
      {refunds.map(refund => (
        <div key={refund.id} className="refund-card">
          <div className="refund-header">
            <span className={`status ${refund.status}`}>{refund.status}</span>
            <span className="amount">${refund.amount}</span>
          </div>
          <div className="refund-details">
            <p><strong>User:</strong> {refund.profiles?.email}</p>
            <p><strong>Reason:</strong> {refund.reason}</p>
            <p><strong>USDT Address:</strong> {refund.usdt_address}</p>
            <p><strong>Requested:</strong> {new Date(refund.requested_at).toLocaleString()}</p>
          </div>
          {refund.status === 'pending' && (
            <div className="actions">
              <button onClick={() => handleProcessRefund(refund.id, 'approve')}>Approve</button>
              <button onClick={() => handleProcessRefund(refund.id, 'reject')}>Reject</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}