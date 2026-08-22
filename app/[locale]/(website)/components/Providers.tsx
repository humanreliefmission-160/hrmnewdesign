"use client";

import { BasketProvider } from "../context/BasketContext";
import { ConsentProvider } from "../context/ConsentContext";
import CookieBanner from "./CookieBanner";
import ConsentedAnalytics from "./ConsentedAnalytics";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConsentProvider>
      <BasketProvider>
        {children}
      </BasketProvider>
      <CookieBanner />
      <ConsentedAnalytics />
    </ConsentProvider>
  );
}