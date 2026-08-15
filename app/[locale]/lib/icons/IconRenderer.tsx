// app/[locale]/lib/icons/IconRenderer.tsx
// Lazy icon registry — imports only what is needed at render time.
// Each icon set is behind a dynamic import so Next.js code-splits them
// out of the main bundle and loads only the chunks actually used.
"use client";

import React, { useEffect, useState } from "react";

type IconComponent = React.ComponentType<{ size?: number; className?: string }>;

/** Map of prefix → dynamic importer for that react-icons sub-package */
const ICON_LOADERS: Record<string, () => Promise<Record<string, IconComponent>>> = {
  Fa:  () => import("react-icons/fa")  as unknown as Promise<Record<string, IconComponent>>,
  Fa6: () => import("react-icons/fa6") as unknown as Promise<Record<string, IconComponent>>,
  Md:  () => import("react-icons/md")  as unknown as Promise<Record<string, IconComponent>>,
  Hi:  () => import("react-icons/hi")  as unknown as Promise<Record<string, IconComponent>>,
  Bs:  () => import("react-icons/bs")  as unknown as Promise<Record<string, IconComponent>>,
  Gi:  () => import("react-icons/gi")  as unknown as Promise<Record<string, IconComponent>>,
  Pi:  () => import("react-icons/pi")  as unknown as Promise<Record<string, IconComponent>>,
  Bi:  () => import("react-icons/bi")  as unknown as Promise<Record<string, IconComponent>>,
  Si:  () => import("react-icons/si")  as unknown as Promise<Record<string, IconComponent>>,
  Io:  () => import("react-icons/io5") as unknown as Promise<Record<string, IconComponent>>,
  Tb:  () => import("react-icons/tb")  as unknown as Promise<Record<string, IconComponent>>,
  Ri:  () => import("react-icons/ri")  as unknown as Promise<Record<string, IconComponent>>,
};

/** Derive which prefix to use from the icon name (e.g. "FaHandHoldingHeart" → "Fa") */
function getPrefixKey(name: string): string | null {
  // Check longer prefixes first to avoid "Fa" matching "Fa6" names
  if (name.startsWith("Fa6")) return "Fa6";
  if (name.startsWith("Io"))  return "Io";
  for (const prefix of Object.keys(ICON_LOADERS)) {
    if (name.startsWith(prefix)) return prefix;
  }
  return null;
}

const iconCache: Record<string, IconComponent | null> = {};

interface IconRendererProps {
  name: string;
  size?: number;
  className?: string;
}

export default function IconRenderer({ name, size = 16, className }: IconRendererProps) {
  const [Icon, setIcon] = useState<IconComponent | null>(() => iconCache[name] ?? null);

  useEffect(() => {
    if (!name) return;
    if (iconCache[name] !== undefined) {
      setIcon(iconCache[name]);
      return;
    }

    const prefixKey = getPrefixKey(name);
    if (!prefixKey || !ICON_LOADERS[prefixKey]) {
      iconCache[name] = null;
      return;
    }

    ICON_LOADERS[prefixKey]().then((mod) => {
      const resolved = (mod[name] as IconComponent) ?? null;
      iconCache[name] = resolved;
      setIcon(resolved);
    });
  }, [name]);

  if (!name) return null;

  // Emoji fallback (short strings ≤ 4 chars that are not icon names)
  if (!Icon && name.length <= 4 && !/^[A-Z]/.test(name)) {
    return <span style={{ fontSize: size }} className={className}>{name}</span>;
  }

  // Fallback question-mark while loading or if icon not found
  if (!Icon) {
    return <span style={{ fontSize: size, opacity: 0.4 }} className={className}>?</span>;
  }

  return <Icon size={size} className={className} />;
}
