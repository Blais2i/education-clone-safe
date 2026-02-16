// app/admin/notifications/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

interface Notification {
  id: string;
  order_id: string;
  user_email: string;
  order_type: string;
  amount: number;
  item_details: any;
  customer_address?: string;
  crypto_type?: string;
  delivery_email?: string;
  status: string;
  created_at: string;
}

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const supabase = createClient();

  useEffect(() => {
    loadNotifications();
    
    // Subscribe to real-time notifications
    const subscription = supabase
      .channel('admin_notifications')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'admin_notifications' },
        (payload) => {
          setNotifications(prev => [payload.new as Notification, ...prev]);
          // Play sound or show browser notification
          playNotificationSound();
          showBrowserNotification(payload.new as Notification);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadNotifications = async () => {
    let query = supabase
      .from('admin_notifications')
      .select('*')
      .order('created_at', { ascending: false });

    if (filter !== 'all') {
      query = query.eq('order_type', filter);
    }

    const { data } = await query;
    if (data) setNotifications(data);
    setLoading(false);
  };

  const playNotificationSound = () => {
    const audio = new Audio('/notification.mp3'); // Add a notification sound
    audio.play().catch(() => {}); // Ignore autoplay errors
  };

  const showBrowserNotification = (notification: Notification) => {
    if (Notification.permission === 'granted') {
      new Notification('New Order Received!', {
        body: `${notification.order_type}: $${notification.amount} from ${notification.user_email}`,
        icon: '/favicon.ico'
      });
    }
  };

  const markAsRead = async (id: string) => {
    await supabase
      .from('admin_notifications')
      .update({ status: 'read', read_at: new Date().toISOString() })
      .eq('id', id);
    
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, status: 'read' } : n)
    );
  };

  const markAllAsRead = async () => {
    const unreadIds = notifications.filter(n => n.status === 'unread').map(n => n.id);
    if (unreadIds.length === 0) return;

    await supabase
      .from('admin_notifications')
      .update({ status: 'read', read_at: new Date().toISOString() })
      .in('id', unreadIds);

    setNotifications(prev =>
      prev.map(n => ({ ...n, status: 'read' }))
    );
  };

  const requestNotificationPermission = () => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  };

  const unreadCount = notifications.filter(n => n.status === 'unread').length;

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>📋 Order Notifications</h1>
        <div className="header-actions">
          <button onClick={requestNotificationPermission} className="btn-permission">
            🔔 Enable Desktop Notifications
          </button>
          {unreadCount > 0 && (
            <button onClick={markAllAsRead} className="btn-mark-read">
              ✓ Mark All as Read ({unreadCount})
            </button>
          )}
        </div>
      </div>

      <div className="filter-section">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Orders</option>
          <option value="bank_log">Bank Logs</option>
          <option value="card">Cards</option>
          <option value="vip_cashout">VIP Cash-Out</option>
        </select>
      </div>

      {loading ? (
        <div className="loading">Loading notifications...</div>
      ) : (
        <div className="notifications-list">
          {notifications.length === 0 ? (
            <div className="no-notifications">No notifications yet</div>
          ) : (
            notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`notification-card ${notification.status}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="notification-header">
                  <span className="notification-type">
                    {notification.order_type === 'bank_log' && '🏦 Bank Log'}
                    {notification.order_type === 'card' && '💳 Card'}
                    {notification.order_type === 'vip_cashout' && '💸 VIP Cash-Out'}
                  </span>
                  <span className="notification-time">
                    {new Date(notification.created_at).toLocaleString()}
                  </span>
                </div>

                <div className="notification-body">
                  <p><strong>Order ID:</strong> {notification.order_id}</p>
                  <p><strong>User:</strong> {notification.user_email}</p>
                  <p><strong>Amount:</strong> ${notification.amount}</p>

                  {notification.order_type === 'bank_log' && (
                    <>
                      <p><strong>Bank:</strong> {notification.item_details?.bank}</p>
                      <p><strong>Vendor:</strong> {notification.item_details?.vendor}</p>
                      <p><strong>Balance:</strong> ${notification.item_details?.balance}</p>
                      <p><strong>Delivery Email:</strong> {notification.delivery_email}</p>
                    </>
                  )}

                  {notification.order_type === 'card' && (
                    <>
                      <p><strong>Card Type:</strong> {notification.item_details?.cardType}</p>
                      <p><strong>Bank:</strong> {notification.item_details?.bank}</p>
                      <p><strong>Balance:</strong> ${notification.item_details?.balance}</p>
                      <p><strong>Delivery Email:</strong> {notification.delivery_email}</p>
                    </>
                  )}

                  {notification.order_type === 'vip_cashout' && (
                    <>
                      <p><strong>Fee (50%):</strong> ${notification.amount * 0.5}</p>
                      <p><strong>User Receives:</strong> ${notification.amount * 0.5}</p>
                      <p><strong>Crypto Address:</strong> {notification.customer_address}</p>
                      <p><strong>Crypto Type:</strong> {notification.crypto_type}</p>
                    </>
                  )}
                </div>

                {notification.status === 'unread' && (
                  <div className="unread-badge">New</div>
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
          padding: 20px;
        }

        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          flex-wrap: wrap;
          gap: 15px;
        }

        .admin-header h1 {
          font-size: 32px;
          color: #333;
        }

        .header-actions {
          display: flex;
          gap: 15px;
        }

        .btn-permission, .btn-mark-read {
          padding: 10px 20px;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-permission {
          background: #f0f0f0;
          color: #333;
        }

        .btn-permission:hover {
          background: #e0e0e0;
        }

        .btn-mark-read {
          background: #28a745;
          color: white;
        }

        .btn-mark-read:hover {
          background: #218838;
        }

        .filter-section {
          margin-bottom: 20px;
        }

        .filter-section select {
          padding: 10px 15px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 14px;
          min-width: 200px;
        }

        .notifications-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .notification-card {
          background: white;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          position: relative;
          border-left: 4px solid transparent;
        }

        .notification-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
        }

        .notification-card.unread {
          border-left-color: #ffd700;
          background: #fff9e6;
        }

        .notification-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
        }

        .notification-type {
          font-weight: bold;
          font-size: 16px;
        }

        .notification-time {
          color: #666;
          font-size: 14px;
        }

        .notification-body {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 10px;
        }

        .notification-body p {
          margin: 5px 0;
          color: #333;
        }

        .unread-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background: #ffd700;
          color: #000;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: bold;
        }

        .loading {
          text-align: center;
          padding: 50px;
          color: #666;
        }

        .no-notifications {
          text-align: center;
          padding: 50px;
          color: #666;
          background: #f8f9fa;
          border-radius: 10px;
        }

        @media (max-width: 768px) {
          .admin-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .header-actions {
            width: 100%;
            flex-direction: column;
          }

          .notification-body {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}