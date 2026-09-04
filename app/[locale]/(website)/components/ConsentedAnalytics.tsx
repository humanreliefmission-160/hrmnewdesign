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
  const status = analyticsGranted ? 'granted' : 'denied';
  window.gtag('consent', 'update', {
    analytics_storage: status,
    ad_storage: status,
    ad_user_data: status,
    ad_personalization: status,
  });
}

/**
 * Renders <GoogleAnalytics> always so fundamental cookieless data is captured.
 * Keeps GA4 Consent Mode v2 signals in sync based on user consent.
 */
export default function ConsentedAnalytics() {
  const { consentState, preferences } = useConsent();

  const analyticsGranted = consentState !== 'pending' && preferences.analytics;

  // Sync Consent Mode v2 whenever consent changes
  useEffect(() => {
    if (consentState === 'pending') return;
    updateGtagConsent(analyticsGranted);
  }, [consentState, analyticsGranted]);

  if (!GA_ID) return null;

  return <GoogleAnalytics gaId={GA_ID} />;
}