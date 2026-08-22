'use client';

import { useEffect } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';
import { useConsent } from '../context/ConsentContext';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? '';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Object[];
  }
}

/**
 * Updates GA4 Consent Mode v2 signals based on the user's consent state.
 * Must be called after gtag is available on the window.
 */
function updateGtagConsent(analyticsGranted: boolean) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('consent', 'update', {
    analytics_storage: analyticsGranted ? 'granted' : 'denied',
    ad_storage: 'denied', // We don't use advertising cookies
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
}

/**
 * Renders <GoogleAnalytics> only when the user has consented to analytics.
 * For AMERICAS (opt-out) visitors, GA loads by default but can be revoked.
 * Also keeps GA4 Consent Mode v2 signals in sync.
 */
export default function ConsentedAnalytics() {
  const { consentState, preferences } = useConsent();

  const analyticsGranted = consentState !== 'pending' && preferences.analytics;

  // Sync Consent Mode v2 whenever consent changes
  useEffect(() => {
    if (consentState === 'pending') return;
    updateGtagConsent(analyticsGranted);
  }, [consentState, analyticsGranted]);

  if (!GA_ID || !analyticsGranted) return null;

  return <GoogleAnalytics gaId={GA_ID} />;
}