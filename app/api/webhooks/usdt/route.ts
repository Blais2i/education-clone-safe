// app/api/webhooks/usdt/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const supabase = await createClient();

    // Verify this is a legitimate webhook from your blockchain monitor
    // You'll need to set up a service like BlockCypher, Etherscan, or TronGrid
    
    const { transaction_hash, from_address, to_address, amount, confirmations } = body;

    // Check if this transaction is for our deposit address
    const { data: deposit } = await supabase
      .from('deposits')
      .select('*')
      .eq('usdt_address', to_address)
      .eq('status', 'pending')
      .single();

    if (deposit && parseFloat(amount) >= deposit.amount_usdt) {
      // Update deposit record
      await supabase
        .from('deposits')
        .update({
          transaction_hash,
          status: confirmations >= 1 ? 'completed' : 'confirming',
          confirmations,
          completed_at: confirmations >= 1 ? new Date().toISOString() : null
        })
        .eq('id', deposit.id);

      // If confirmed, add to user balance
      if (confirmations >= 1) {
        await supabase.rpc('add_to_balance', {
          user_id: deposit.user_id,
          amount: deposit.amount_usd
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}