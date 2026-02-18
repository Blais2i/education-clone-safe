// app/dashboard/components/TawkToAdminWidget.tsx
'use client';

import { useEffect, useState } from 'react';

export default function TawkToAdminWidget() {
  const [lastPayment, setLastPayment] = useState<any>(null);

  useEffect(() => {
    // Listen for Tawk.to events
    const handleTawkEvents = () => {
      if (window.Tawk_API) {
        // You can customize this based on your needs
        console.log('Tawk.to is ready for admin');
      }
    };

    // Check every few seconds if Tawk is loaded
    const interval = setInterval(() => {
      if (window.Tawk_API) {
        handleTawkEvents();
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // This doesn't render anything visible
  return null;
}