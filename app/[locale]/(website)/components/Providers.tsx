"use client";

import { BasketProvider } from "../context/BasketContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <BasketProvider>{children}</BasketProvider>;
}
