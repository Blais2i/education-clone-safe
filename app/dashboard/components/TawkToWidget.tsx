// app/dashboard/components/TawkToWidget.tsx
'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    Tawk_API: any;
    Tawk_LoadStart: Date;
  }
}

export default function TawkToWidget() {
  useEffect(() => {
    // Don't load if already exists
    if (document.querySelector('script[src*="tawk.to"]')) {
      return;
    }

    // Initialize Tawk_API with event handlers
    window.Tawk_API = window.Tawk_API || {};
    
    // This will run when Tawk.to is fully loaded
    window.Tawk_API.onLoad = function() {
      console.log('Tawk.to loaded successfully');
      
      // You can pre-fill visitor info if needed - FIXED THE ERROR PARAMETER TYPE
      window.Tawk_API.setAttributes({
        name: 'Cards City Admin',
        email: 'blaisealkado@gmail.com',
        hash: 'optional-hash-for-secure-mode'
      }, function(error: any) { // 👈 Added :any type here
        if (error) {
          console.error('Error setting Tawk.to attributes:', error);
        } else {
          console.log('Tawk.to attributes set successfully');
        }
      });
    };

    window.Tawk_LoadStart = new Date();

    // Create and load the Tawk.to script
    const s1 = document.createElement("script");
    const s0 = document.getElementsByTagName("script")[0];
    
    s1.async = true;
    s1.src = 'https://embed.tawk.to/6994366d73d8cb1c357e385a/1jhlf97p4';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    
    s0.parentNode?.insertBefore(s1, s0);

    // Cleanup
    return () => {
      const script = document.querySelector('script[src*="tawk.to"]');
      if (script) {
        script.remove();
      }
    };
  }, []);

  return null;
}