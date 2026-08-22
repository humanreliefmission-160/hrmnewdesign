'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConsent, requiresOptIn, GeoRegion, ConsentPreferences } from '../context/ConsentContext';
import Link from 'next/link';
import { CookieIcon } from 'lucide-react';
import YellowCTA from './YellowCTA';

// ─── Region-specific copy ─────────────────────────────────────────────────────

interface RegionCopy {
  heading: string;
  body: string;
  regulation: string;
}

const REGION_COPY: Record<GeoRegion, RegionCopy> = {
  UK: {
    heading: 'We value your privacy',
    body: 'We use cookies to analyse site traffic and improve your experience. Under UK GDPR, we need your consent before using analytics cookies.',
    regulation: 'UK GDPR',
  },
  EU: {
    heading: 'We value your privacy',
    body: 'We use cookies to analyse site traffic and improve your experience. Under the EU GDPR and ePrivacy Directive, we need your consent before using analytics cookies.',
    regulation: 'EU GDPR',
  },
  AMERICAS: {
    heading: 'Your privacy choices',
    body: 'We use analytics cookies to improve your experience. You can opt out at any time using the Cookie Settings below.',
    regulation: 'CCPA / PIPEDA',
  },
  ASIA: {
    heading: 'We value your privacy',
    body: 'We use cookies to analyse site traffic and improve your experience. In line with applicable data protection laws, we require your consent before using analytics cookies.',
    regulation: 'PDPA / PIPL / APPI',
  },
  AUSTRALIA: {
    heading: 'We value your privacy',
    body: 'We use cookies to analyse site traffic and improve your experience. Under the Australian Privacy Act, we ask for your consent before using analytics cookies.',
    regulation: 'Privacy Act 1988',
  },
  DEFAULT: {
    heading: 'We value your privacy',
    body: 'We use cookies to analyse site traffic and improve your experience. We need your consent before using analytics cookies.',
    regulation: 'Privacy Policy',
  },
};

// ─── Toggle Component ─────────────────────────────────────────────────────────

function Toggle({ checked, onChange, id }: { checked: boolean; onChange: (v: boolean) => void; id: string }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      id={id}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2 ${checked ? 'bg-purple' : 'bg-gray-300'
        }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-200 ${checked ? 'translate-x-6' : 'translate-x-1'
          }`}
      />
    </button>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function CookieModal({
  onClose,
  initialPrefs,
  onSave,
  region,
}: {
  onClose: () => void;
  initialPrefs: ConsentPreferences;
  onSave: (prefs: ConsentPreferences) => void;
  region: GeoRegion;
}) {
  const [prefs, setPrefs] = useState<ConsentPreferences>({ ...initialPrefs });

  const handleSave = () => {
    onSave(prefs);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-9999 flex items-end sm:items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Cookie settings"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-brand-lgrey flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-brand-black">Cookie Settings</h2>
            <p className="text-sm text-brand-grey mt-0.5">{REGION_COPY[region].regulation}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cookie settings"
            className="p-2 rounded-full hover:bg-brand-lgrey transition-colors text-brand-grey hover:text-brand-black"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cookie categories */}
        <div className="px-6 py-5 space-y-5">
          {/* Strictly Necessary */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-brand-black">Strictly Necessary</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">Always on</span>
              </div>
              <p className="text-sm text-brand-grey mt-1">
                Essential for the website to function. These cookies enable core functionality such as security, donation basket, and account settings. They cannot be disabled.
              </p>
            </div>
            <div className="shrink-0 pt-0.5">
              <div
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500 cursor-not-allowed opacity-60"
                aria-label="Always enabled"
              >
                <span className="inline-block h-4 w-4 translate-x-6 transform rounded-full bg-white shadow-md" />
              </div>
            </div>
          </div>

          <div className="border-t border-brand-lgrey" />

          {/* Analytics */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <label htmlFor="analytics-toggle" className="text-sm font-semibold text-brand-black cursor-pointer">
                Analytics Cookies
              </label>
              <p className="text-sm text-brand-grey mt-1">
                Help us understand how visitors interact with our website using Google Analytics (GA4). All data is anonymised. No personal data is shared with third parties.
              </p>
            </div>
            <div className="shrink-0 pt-0.5">
              <Toggle
                id="analytics-toggle"
                checked={prefs.analytics}
                onChange={(v) => setPrefs((p) => ({ ...p, analytics: v }))}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-brand-lgrey flex flex-col sm:flex-row gap-3 sm:justify-end">
          <button
            onClick={() => { setPrefs({ analytics: false }); }}
            className="text-sm text-brand-grey hover:text-brand-black transition-colors underline underline-offset-2"
          >
            Reject all optional
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 bg-purple text-white text-sm font-semibold rounded-lg hover:bg-purple-dark transition-colors shadow-sm"
          >
            Save Preferences
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Banner ───────────────────────────────────────────────────────────────────

export default function CookieBanner() {
  const { consentState, preferences, region, isLoading, accept, decline, saveCustom } = useConsent();
  const [showModal, setShowModal] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const isOptIn = requiresOptIn(region);
  const shouldShow = !isLoading && !dismissed && (
    isOptIn
      ? consentState === 'pending'
      : consentState === 'pending' // for AMERICAS we show an opt-out notice
  );

  if (!shouldShow) {
    return (
      <AnimatePresence>
        {showModal && (
          <CookieModal
            onClose={() => setShowModal(false)}
            initialPrefs={preferences}
            onSave={(prefs) => { saveCustom(prefs); }}
            region={region}
          />
        )}
      </AnimatePresence>
    );
  }

  const copy = REGION_COPY[region];

  const handleAccept = () => {
    accept();
    setDismissed(true);
  };

  const handleDecline = () => {
    decline();
    setDismissed(true);
  };

  return (
    <>
      <AnimatePresence>
        {showModal && (
          <CookieModal
            onClose={() => setShowModal(false)}
            initialPrefs={preferences}
            onSave={(prefs) => { saveCustom(prefs); setDismissed(true); }}
            region={region}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        role="region"
        aria-label="Cookie consent banner"
        className="fixed bottom-0 left-0 right-0 z-9998 bg-white border-t-2 border-purple shadow-[0_-4px_30px_rgba(0,0,0,0.12)]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Icon + text */}
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="shrink-0 w-10 h-10 rounded-full bg-purple/10 flex items-center justify-center">
                <CookieIcon className='text-purple' />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-brand-black">{copy.heading}</p>
                <p className="text-sm text-brand-grey mt-0.5 leading-snug">{copy.body}{' '}
                  <Link
                    href="/policies/cookie-policy"
                    className="underline underline-offset-2 hover:text-purple transition-colors whitespace-nowrap"
                  >
                    Cookie Policy
                  </Link>.{' '}
                  <button
                    onClick={() => setShowModal(true)}
                    className="text-purple font-medium underline underline-offset-2 hover:text-purple-dark transition-colors whitespace-nowrap"
                  >
                    Cookie Settings
                  </button>
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 shrink-0 w-full sm:w-auto">
              <button
                onClick={handleDecline}
                className="flex-1 sm:flex-none px-4 py-2.5 font-semibold text-brand-white bg-purple hover:bg-purple-dark rounded-sm transition-colors"
              >
                {isOptIn ? 'Reject All' : 'Opt Out'}
              </button>
              <YellowCTA
                text={isOptIn ? 'Accept All' : 'Opt In'}
                onClick={handleAccept}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}