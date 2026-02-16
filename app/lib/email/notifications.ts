// app/lib/email/notifications.ts
import { createClient } from '@/lib/supabase/server';

interface OrderNotification {
  orderId: string;
  userId: string;
  userEmail: string;
  amount: number;
  itemDetails: any;
  orderType: 'bank_log' | 'card' | 'vip_cashout';
  customerAddress?: string;
  cryptoType?: string;
  deliveryEmail?: string;
}

// Admin email to receive notifications
const ADMIN_EMAIL = 'blaisealkado@gmail.com';

export async function sendOrderNotification(orderData: OrderNotification) {
  try {
    const supabase = await createClient();
    
    // In a real production environment, you would use a service like Resend, SendGrid, etc.
    // For now, we'll store notifications in the database and you can check them in an admin panel
    
    const { error } = await supabase
      .from('admin_notifications')
      .insert({
        type: 'new_order',
        order_id: orderData.orderId,
        user_id: orderData.userId,
        user_email: orderData.userEmail,
        order_type: orderData.orderType,
        amount: orderData.amount,
        item_details: orderData.itemDetails,
        customer_address: orderData.customerAddress,
        crypto_type: orderData.cryptoType,
        delivery_email: orderData.deliveryEmail,
        status: 'unread',
        created_at: new Date().toISOString()
      });

    if (error) {
      console.error('Error saving notification:', error);
    }

    // You can also send an actual email using a service like Resend
    // Here's a commented example using Resend:
    /*
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ADMIN_EMAIL,
      subject: `New Order: ${orderData.orderType}`,
      html: generateEmailTemplate(orderData)
    });
    */

  } catch (error) {
    console.error('Failed to send notification:', error);
  }
}

// Optional: Email template for when you implement actual email sending
function generateEmailTemplate(data: OrderNotification): string {
  const templates = {
    bank_log: `
      <h2>New Bank Log Order</h2>
      <p><strong>Order ID:</strong> ${data.orderId}</p>
      <p><strong>User:</strong> ${data.userEmail}</p>
      <p><strong>Amount Paid:</strong> $${data.amount}</p>
      <p><strong>Bank:</strong> ${data.itemDetails.bank}</p>
      <p><strong>Vendor:</strong> ${data.itemDetails.vendor}</p>
      <p><strong>Balance:</strong> $${data.itemDetails.balance}</p>
      <p><strong>Delivery Email:</strong> ${data.deliveryEmail}</p>
    `,
    card: `
      <h2>New Card Order</h2>
      <p><strong>Order ID:</strong> ${data.orderId}</p>
      <p><strong>User:</strong> ${data.userEmail}</p>
      <p><strong>Amount Paid:</strong> $${data.amount}</p>
      <p><strong>Card Type:</strong> ${data.itemDetails.cardType}</p>
      <p><strong>Bank:</strong> ${data.itemDetails.bank}</p>
      <p><strong>Balance:</strong> $${data.itemDetails.balance}</p>
      <p><strong>Delivery Email:</strong> ${data.deliveryEmail}</p>
    `,
    vip_cashout: `
      <h2>New VIP Cash-Out Request</h2>
      <p><strong>Order ID:</strong> ${data.orderId}</p>
      <p><strong>User:</strong> ${data.userEmail}</p>
      <p><strong>Amount to Cash Out:</strong> $${data.amount}</p>
      <p><strong>Fee (50%):</strong> $${data.amount * 0.5}</p>
      <p><strong>User Receives:</strong> $${data.amount * 0.5}</p>
      <p><strong>Crypto Address:</strong> ${data.customerAddress}</p>
      <p><strong>Crypto Type:</strong> ${data.cryptoType}</p>
    `
  };

  return templates[data.orderType];
}