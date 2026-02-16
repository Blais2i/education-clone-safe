// app/api/notifications/order/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sendOrderNotification } from '@/lib/email/notifications';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const supabase = await createClient();

    // Generate a unique order ID if not provided
    const orderId = body.orderId || `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Save to admin_notifications
    const { error } = await supabase
      .from('admin_notifications')
      .insert({
        type: 'new_order',
        order_id: orderId,
        user_id: body.userId,
        user_email: body.userEmail,
        order_type: body.orderType,
        amount: body.amount,
        item_details: body.itemDetails,
        customer_address: body.customerAddress,
        crypto_type: body.cryptoType,
        delivery_email: body.deliveryEmail,
        status: 'unread',
        created_at: new Date().toISOString()
      });

    if (error) {
      console.error('Error saving notification:', error);
      return NextResponse.json({ error: 'Failed to save notification' }, { status: 500 });
    }

    // You can also send an email here using a service like Resend
    // await sendEmailNotification(body);

    return NextResponse.json({ success: true, orderId });
  } catch (error) {
    console.error('Notification error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}