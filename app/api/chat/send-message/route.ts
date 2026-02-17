// app/api/chat/send-message/route.ts
import { NextResponse } from 'next/server';

// Your WhatsApp number (with country code, no + or spaces)
const YOUR_WHATSAPP_NUMBER = '1234567890'; // Replace with your actual number

export async function POST(request: Request) {
  try {
    const { message, sessionId, timestamp } = await request.json();

    // Validate input
    if (!message || !sessionId) {
      return NextResponse.json(
        { error: 'Message and session ID are required' },
        { status: 400 }
      );
    }

    // Format the message for WhatsApp
    const whatsappMessage = `
🔔 *New Chat Message*
━━━━━━━━━━━━━━━━━━━
*Session:* ${sessionId}
*Time:* ${new Date(timestamp).toLocaleString()}
*Message:*
${message}
━━━━━━━━━━━━━━━━━━━
    `.trim();

    // OPTION 1: Send via WhatsApp API (Recommended)
    // Using the WhatsApp Business API or a service like WhatsApp Cloud API
    // You'll need to set up a WhatsApp Business account and get an access token
    
    /*
    const whatsappResponse = await fetch(
      `https://graph.facebook.com/v17.0/${YOUR_PHONE_NUMBER_ID}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: YOUR_WHATSAPP_NUMBER,
          type: 'text',
          text: { body: whatsappMessage }
        }),
      }
    );

    if (!whatsappResponse.ok) {
      console.error('WhatsApp API error:', await whatsappResponse.text());
    }
    */

    // OPTION 2: Send via Email (Fallback)
    // This will send the message to your email
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: 'blaisealkado@gmail.com', // Your email
        subject: `💬 New Chat Message - ${sessionId}`,
        html: `
          <h2>New Chat Message</h2>
          <p><strong>Session:</strong> ${sessionId}</p>
          <p><strong>Time:</strong> ${new Date(timestamp).toLocaleString()}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 5px;">
            ${message}
          </div>
          <p><a href="https://wa.me/${YOUR_WHATSAPP_NUMBER}?text=${encodeURIComponent('Re: ' + message.substring(0, 50))}">Click here to reply on WhatsApp</a></p>
        `,
      }),
    });

    // OPTION 3: Simple console log (for testing)
    console.log('💬 New chat message:', {
      sessionId,
      message,
      timestamp,
      whatsappMessage
    });

    // Also store in database for history
    const { createClient } = await import('@/lib/supabase/server');
    const supabase = await createClient();

    await supabase.from('chat_messages').insert({
      session_id: sessionId,
      message: message,
      timestamp: timestamp,
      status: 'sent'
    });

    return NextResponse.json({
      success: true,
      autoReply: "👋 Thanks for your message! Our team has been notified and will get back to you shortly via WhatsApp."
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}