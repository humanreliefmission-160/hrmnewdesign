'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';

export type GeoRegion = 'UK' | 'EU' | 'AMERICAS' | 'ASIA' | 'AUSTRALIA' | 'DEFAULT';
export type ConsentState = 'pending' | 'accepted' | 'declined' | 'custom';

export interface ConsentPreferences {
  analytics: boolean;
}

interface StoredConsent {
  state: ConsentState;
  preferences: ConsentPreferences;
  expiresAt: number;
}

interface ConsentContextValue {
  consentState: ConsentState;
  preferences: ConsentPreferences;
  region: GeoRegion;
  isLoading: boolean;
  accept: () => void;
  decline: () => void;
  saveCustom: (prefs: ConsentPreferences) => void;
  reset: () => void
}

const STORAGE_KEY = 'hrm_cookie_consent';
const CONSENT_DURATION_MS = 180 * 24 * 60 * 60 * 1000;

const DEFAULT_PREFS: ConsentPreferences = { analytics: true };

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function requiresOptIn(region: GeoRegion): boolean {
  return region !== 'AMERICAS';
}

function readStoredConsent(): StoredConsent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: StoredConsent = JSON.parse(raw);
    if (Date.now() > parsed.expiresAt) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function writeStoredConsent(state: ConsentState, preferences: ConsentPreferences) {
  const payload: StoredConsent = {
    state,
    preferences,
    expiresAt: Date.now() + CONSENT_DURATION_MS,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consentState, setConsentState] = useState<ConsentState>('pending');
  const [preferences, setPreferences] = useState<ConsentPreferences>(DEFAULT_PREFS);
  const [region, setRegion] = useState<GeoRegion>('DEFAULT');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = readStoredConsent();
    if (stored) {
      setConsentState(stored.state);
      setPreferences(stored.preferences);
    }

    const geoCookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('hrm_geo_region='));
    if (geoCookie) {
      const r = geoCookie.split('=')[1] as GeoRegion;
      setRegion(r);
      if (!stored && r === 'AMERICAS') {
        setConsentState('accepted');
        writeStoredConsent('accepted', DEFAULT_PREFS);
      }
      setIsLoading(false);
    } else {
      fetch('/api/geo')
        .then((res) => res.json())
        .then(({ region: r }: { region: GeoRegion }) => {
          setRegion(r);
          if (!stored && r === 'AMERICAS') {
            setConsentState('accepted');
            writeStoredConsent('accepted', DEFAULT_PREFS);
          }
        })
        .catch(() => setRegion('DEFAULT'))
        .finally(() => setIsLoading(false));
    }
  }, []);

  const accept = useCallback(() => {
    setConsentState('accepted');
    setPreferences(DEFAULT_PREFS);
    writeStoredConsent('accepted', DEFAULT_PREFS);
  }, []);

  const decline = useCallback(() => {
    const noAnalytics: ConsentPreferences = { analytics: false };
    setConsentState('declined');
    setPreferences(noAnalytics);
    writeStoredConsent('declined', noAnalytics);
  }, []);

  const saveCustom = useCallback((prefs: ConsentPreferences) => {
    const state: ConsentState = prefs.analytics ? 'accepted' : 'declined';
    setConsentState(state);
    setPreferences(prefs);
    writeStoredConsent('custom', prefs);
  }, []);

  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setConsentState('pending');
    setPreferences(DEFAULT_PREFS);
  }, []);

  return (
    <ConsentContext.Provider
      value={{ consentState, preferences, region, isLoading, accept, decline, saveCustom, reset }}
    >
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error('useConsent must be used within ConsentProvider');
  return ctx;
}