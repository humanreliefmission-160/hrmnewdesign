"use client";

import type { BasketItem } from "../../context/BasketContext";
import {
  getBasketLineSubtitle,
  getBasketLineTitle,
  shouldShowIntentionBadge,
} from "../../lib/donation/basketDisplay";

interface BasketItemCardProps {
  item: BasketItem;
  onRemove?: (id: string) => void;
  className?: string;
}

export default function BasketItemCard({
  item,
  onRemove,
  className = "",
}: BasketItemCardProps) {
  const subtitle = getBasketLineSubtitle(item);

  const scheduleText = (() => {
    if (!item.frequency || item.frequency === 'oneoff') return null;
    const amount = item.amount;
    if (item.frequency === 'daily') {
      if (!item.dailyStartDate || !item.dailyEndDate) return `£${amount.toFixed(2)} / day`;
      const s = new Date(item.dailyStartDate);
      const e = new Date(item.dailyEndDate);
      const days = Math.max(1, Math.floor((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1);
      return `£${amount.toFixed(2)}/day for ${days} days (Total: £${(amount * days).toFixed(2)})`;
    }
    if (item.frequency === 'weekly') {
      const weeks = item.weeklyDurationWeeks || 1;
      return `£${amount.toFixed(2)}/week for ${weeks} weeks (Total: £${(amount * weeks).toFixed(2)})`;
    }
    if (item.frequency === 'friday') {
      const weeks = item.weeklyDurationWeeks || 1;
      return `£${amount.toFixed(2)}/Friday for ${weeks} Fridays (Total: £${(amount * weeks).toFixed(2)})`;
    }
    if (item.frequency === 'monthly') {
      if (item.durationMonths) {
        return `£${amount.toFixed(2)}/month for ${item.durationMonths} months (Total: £${(amount * item.durationMonths).toFixed(2)})`;
      }
      return `£${amount.toFixed(2)}/month (Ongoing)`;
    }
    return null;
  })();

  return (
    <div
      id={`basket-item-${item.id}`}
      className={`bg-gray-50 border border-gray-100 rounded-sm p-4 flex flex-col gap-2 relative group hover:border-purple/30 transition-colors ${className}`}
    >
      {onRemove && (
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          aria-label={`Remove ${getBasketLineTitle(item)}`}
          className="absolute top-3 right-3 text-gray-300 hover:text-purple-light transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}

      <span className="text-lg font-bold text-brand-black pr-6 leading-snug">
        {getBasketLineTitle(item)}
      </span>

      {subtitle ? (
        <p className="text-sm font-medium text-gray-900 pr-5 leading-snug">
          {subtitle}
        </p>
      ) : null}

      <div className="flex items-center gap-2 flex-wrap mt-1">
        <span className="bg-purple text-white text-xs font-bold px-3 py-1 rounded-sm">
          £{item.amount.toLocaleString()}
        </span>
        {shouldShowIntentionBadge(item) && (
          <span className="bg-purple-faint text-purple-dark text-xs font-semibold px-2 py-1 rounded-sm border border-purple-faint">
            {item.intention}
          </span>
        )}
      </div>

      {scheduleText && (
        <p className="text-xs text-purple font-semibold mt-0.5">
          📅 {scheduleText}
        </p>
      )}
    </div>
  );
}
