// app/api/notify-payment-tawk/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { depositId, userId, amount, userEmail } = await request.json();

    // Format the message for Tawk.to
    const message = `
🔔 *NEW PAYMENT RECEIVED*

💰 *Amount:* $${amount} USDT
👤 *User:* ${userEmail}
🆔 *Deposit ID:* ${depositId}
⏰ *Time:* ${new Date().toLocaleString()}

━━━━━━━━━━━━━━━━━━━
⚠️ *ACTION REQUIRED*
1. Check your USDT wallet (TRC20)
2. Verify the amount
3. Go to Supabase admin
4. Confirm the deposit
━━━━━━━━━━━━━━━━━━━

👉 Click to reply to this message
    `.trim();

    // For Tawk.to, we need to store the notification
    // The actual sending will be handled by the frontend
    // We'll return the notification data and let the frontend display it

    return NextResponse.json({ 
      success: true,
      notification: {
        message,
        depositId,
        amount,
        userEmail,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Tawk.to notification error:', error);
    return NextResponse.json(
      { error: 'Failed to create notification' },
      { status: 500 }
    );
  }
}