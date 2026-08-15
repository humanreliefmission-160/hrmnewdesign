"use client"

import { BsCalendar2DayFill } from 'react-icons/bs';
import { FaClock, FaCalendarDay, FaCalendarWeek } from 'react-icons/fa';
import { MdEventRepeat } from 'react-icons/md';
import { DonationState } from './types';
import DonationStepFooter from './DonationStepFooter';
import DonationBasketTotal from './DonationBasketTotal';
import { useBasket } from '../../context/BasketContext';

interface DonationStepTypeProps {
  currentStep: number;
  donationState: DonationState;
  setDonationType: (type: string) => void;
  setDailyDates: (start: string, end: string) => void;
  setWeeklyDuration: (weeks: number | null) => void;
  setMonthlyMode: (mode: 'quantity' | 'full_year') => void;
  selectDurationMonths: (months: number | null) => void;
  goStep: (step: number) => void;
}

export default function DonationStepType({
  currentStep,
  donationState,
  setDonationType,
  setDailyDates,
  setWeeklyDuration,
  setMonthlyMode,
  selectDurationMonths,
  goStep,
}: DonationStepTypeProps) {
  const { items } = useBasket();
  const hasItems = items.length > 0;

  if (currentStep !== 1) return null;

  const today = new Date().toISOString().split('T')[0];

  const getFrequencyLabel = (type: string) => {
    if (type === "oneoff") return "One Off";
    if (type === "friday") return "Friday Giving";
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const btnClass = (active: boolean, disabled: boolean) =>
    `flex items-center justify-center gap-3 p-4 rounded-sm border-2 font-bold transition-all hover:border-purple-faint ${
      active ? 'border-purple bg-purple-faint text-purple' : 'border-brand-lgrey bg-brand-white text-brand-grey'
    } ${disabled ? 'opacity-50 cursor-not-allowed hover:border-brand-lgrey' : ''}`;

  // Validate required inputs based on selected frequency
  const isNextDisabled = (() => {
    if (donationState.type === 'daily') {
      return !donationState.dailyStartDate || !donationState.dailyEndDate;
    }
    if (donationState.type === 'weekly' || donationState.type === 'friday') {
      return !donationState.weeklyDurationWeeks || donationState.weeklyDurationWeeks < 1;
    }
    if (donationState.type === 'monthly') {
      if (!donationState.monthlyMode) return true;
      if (donationState.monthlyMode === 'quantity') {
        return !donationState.durationMonths || donationState.durationMonths < 1;
      }
      if (donationState.monthlyMode === 'full_year') {
        return !donationState.durationMonths;
      }
    }
    return false;
  })();

  return (
    <div className="bg-brand-white p-8 md:p-10 rounded-2xl shadow-card border border-brand-lgrey">
      <DonationBasketTotal />
      <h2 className="text-2xl md:text-3xl font-bold text-brand-black mb-2 font-body leading-tight">How would you like to give?</h2>
      <p className="text-[0.95rem] text-brand-grey mb-8 font-medium">
        Choose a one off donation or set up recurring payments (daily, weekly, monthly, or Friday giving).
      </p>

      {hasItems && (
        <div className="bg-[#B60000]/10 border border-[#B60000]/50 text-[#B60000] rounded-sm p-4 mb-6 text-sm font-medium text-center animate-in fade-in duration-300">
          Your donation basket contains items with a '{getFrequencyLabel(donationState.type)}' frequency.
          To change this, please empty your basket.
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2">
        <button
          className={btnClass(donationState.type === 'oneoff', hasItems && donationState.type !== 'oneoff')}
          onClick={() => setDonationType('oneoff')}
          disabled={hasItems && donationState.type !== 'oneoff'}
        >
          <FaClock size={20} />
          One Off
        </button>
        <button
          className={btnClass(donationState.type === 'daily', hasItems && donationState.type !== 'daily')}
          onClick={() => setDonationType('daily')}
          disabled={hasItems && donationState.type !== 'daily'}
        >
          <FaCalendarDay size={20} />
          Daily
        </button>
        <button
          className={btnClass(donationState.type === 'weekly', hasItems && donationState.type !== 'weekly')}
          onClick={() => setDonationType('weekly')}
          disabled={hasItems && donationState.type !== 'weekly'}
        >
          <FaCalendarWeek size={20} />
          Weekly
        </button>
        <button
          className={btnClass(donationState.type === 'monthly', hasItems && donationState.type !== 'monthly')}
          onClick={() => setDonationType('monthly')}
          disabled={hasItems && donationState.type !== 'monthly'}
        >
          <MdEventRepeat size={20} />
          Monthly
        </button>
      </div>

      {/* ── Daily: date range picker ─────────────────────────────── */}
      {donationState.type === 'daily' && (
        <div className="bg-purple-faint border border-purple/20 rounded-sm p-5 mb-6 animate-in fade-in duration-300 flex flex-col gap-4">
          <p className="text-sm text-purple font-medium">
            Daily donors provide continuous, steady support to help those in need every day. Money is received everyday until the end date selected.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-purple uppercase tracking-wide">
                Start Date <span className="text-[#B60000]">*</span>
              </label>
              <input
                type="date"
                required
                value={donationState.dailyStartDate ?? ''}
                min={today}
                onChange={(e) =>
                  setDailyDates(e.target.value, donationState.dailyEndDate ?? '')
                }
                className="px-3 py-2 border border-purple/30 rounded-sm text-sm text-brand-black bg-white focus:outline-none focus:border-purple"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-purple uppercase tracking-wide">
                End Date <span className="text-[#B60000]">*</span>
              </label>
              <input
                type="date"
                required
                value={donationState.dailyEndDate ?? ''}
                min={donationState.dailyStartDate || today}
                onChange={(e) =>
                  setDailyDates(donationState.dailyStartDate ?? '', e.target.value)
                }
                className="px-3 py-2 border border-purple/30 rounded-sm text-sm text-brand-black bg-white focus:outline-none focus:border-purple"
              />
            </div>
          </div>
          {(!donationState.dailyStartDate || !donationState.dailyEndDate) && (
            <p className="text-xs text-[#B60000] font-medium">
              * Please select both Start Date and End Date to proceed.
            </p>
          )}
        </div>
      )}

      {/* ── Weekly: number of weeks ──────────────────────────────── */}
      {donationState.type === 'weekly' && (
        <div className="bg-purple-faint border border-purple/20 rounded-sm p-5 mb-6 animate-in fade-in duration-300 flex flex-col gap-3">
          <p className="text-sm text-purple font-medium">
            Weekly donors sustain our projects week by week, ensuring stable resources. Money is received once a week until the end date selected.
          </p>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-purple uppercase tracking-wide">
              Number of Weeks (1–52) <span className="text-[#B60000]">*</span>
            </label>
            <input
              type="number"
              required
              min={1}
              max={52}
              value={donationState.weeklyDurationWeeks ?? ''}
              placeholder="e.g. 4"
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                setWeeklyDuration(!isNaN(val) ? Math.min(52, Math.max(1, val)) : null);
              }}
              className="w-full max-w-xs px-3 py-2 border border-purple/30 rounded-sm text-sm text-brand-black bg-white focus:outline-none focus:border-purple"
            />
            {(!donationState.weeklyDurationWeeks || donationState.weeklyDurationWeeks < 1) && (
              <p className="text-xs text-[#B60000] font-medium">
                * Please enter the number of weeks (1 to 52) to proceed.
              </p>
            )}
            {(donationState.weeklyDurationWeeks ?? 0) >= 48 && (
              <p className="text-xs text-purple/70 font-medium">Notice: You are donating for up to 1 year.</p>
            )}
          </div>
        </div>
      )}

      {/* ── Monthly: quantity or full-year radio ─────────────────── */}
      {donationState.type === 'monthly' && (
        <div className="bg-purple-faint border border-purple/20 rounded-sm p-5 mb-6 animate-in fade-in duration-300 flex flex-col gap-4">
          <p className="text-sm text-purple font-medium">
            Monthly donors provide 3× more impact through consistent, predictable funding. Money is received once a month until the end date selected.
          </p>

          <div className="flex flex-col gap-3">
            {/* Radio 1 — quantity */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="radio"
                name="monthlyMode"
                checked={donationState.monthlyMode === 'quantity'}
                onChange={() => setMonthlyMode('quantity')}
                className="mt-0.5 accent-purple"
              />
              <span className="text-sm font-semibold text-brand-black">Choose a quantity (1–12 months)</span>
            </label>
            {donationState.monthlyMode === 'quantity' && (
              <div className="ml-6 flex flex-col gap-1">
                <input
                  type="number"
                  required
                  min={1}
                  max={12}
                  value={donationState.durationMonths ?? ''}
                  placeholder="e.g. 3"
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    selectDurationMonths(!isNaN(val) ? Math.min(12, Math.max(1, val)) : null);
                  }}
                  className="w-full max-w-xs px-3 py-2 border border-purple/30 rounded-sm text-sm text-brand-black bg-white focus:outline-none focus:border-purple"
                />
                {(!donationState.durationMonths || donationState.durationMonths < 1) && (
                  <p className="text-xs text-[#B60000] font-medium">
                    * Please enter the number of months (1 to 12) to proceed.
                  </p>
                )}
              </div>
            )}

            {/* Radio 2 — full year */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="radio"
                name="monthlyMode"
                checked={donationState.monthlyMode === 'full_year'}
                onChange={() => {
                  setMonthlyMode('full_year');
                  selectDurationMonths(12);
                }}
                className="mt-0.5 accent-purple"
              />
              <span className="text-sm font-semibold text-brand-black">
                Donate every month for the full year
                <span className="ml-2 text-xs text-purple font-normal">(12 months — altogether 12 months)</span>
              </span>
            </label>

            {!donationState.monthlyMode && (
              <p className="text-xs text-[#B60000] font-medium mt-1">
                * Please select a monthly duration option above to proceed.
              </p>
            )}
          </div>
        </div>
      )}

      {/* ── Friday Giving ────────────────────────────────────────── */}
      {donationState.type === 'friday' && (
        <div className="bg-purple-faint border border-purple/20 rounded-sm p-5 mb-6 animate-in fade-in duration-300 flex flex-col gap-3">
          <p className="text-sm text-purple font-medium">
            Friday giving donors schedule their automatic donations on the blessed day of Friday for maximum reward. Money is received once a week on Friday. If you donate on a Friday, payment is accepted that same Friday.
          </p>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-purple uppercase tracking-wide">
              Number of Weeks (1–52) <span className="text-[#B60000]">*</span>
            </label>
            <input
              type="number"
              required
              min={1}
              max={52}
              value={donationState.weeklyDurationWeeks ?? ''}
              placeholder="e.g. 4"
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                setWeeklyDuration(!isNaN(val) ? Math.min(52, Math.max(1, val)) : null);
              }}
              className="w-full max-w-xs px-3 py-2 border border-purple/30 rounded-sm text-sm text-brand-black bg-white focus:outline-none focus:border-purple"
            />
            {(!donationState.weeklyDurationWeeks || donationState.weeklyDurationWeeks < 1) && (
              <p className="text-xs text-[#B60000] font-medium">
                * Please enter the number of weeks (1 to 52) to proceed.
              </p>
            )}
            {(donationState.weeklyDurationWeeks ?? 0) >= 48 && (
              <p className="text-xs text-purple/70 font-medium">Notice: You are donating for up to 1 year.</p>
            )}
          </div>
        </div>
      )}

      <div className={`bg-brand-white border-2 border-brand-lgrey rounded-sm p-6 mb-8 transition-opacity ${hasItems && donationState.type !== 'friday' ? 'opacity-60' : ''}`}>
        <div className="flex items-center gap-5 sm:flex-row flex-col">
          <BsCalendar2DayFill fill={hasItems && donationState.type !== 'friday' ? '#999' : '#650199'} className='sm:w-25 w-20 h-auto' />
          <div>
            <div className="font-bold mb-1 text-brand-black leading-tight">
              Schedule your Friday Giving
            </div>
            <p className="text-[0.875rem] text-brand-grey font-medium leading-relaxed">
              Set up automatic donations on Fridays — the blessed day — for maximum spiritual reward.
            </p>
          </div>
          <button
            onClick={() => {
              setDonationType('friday');
              goStep(2);
            }}
            disabled={hasItems && donationState.type !== 'friday'}
            className="sm:inline-flex items-center gap-2 font-bold text-sm cursor-pointer transition-all duration-200 no-underline px-4 py-2 text-purple hover:text-purple-dark rounded-lg whitespace-nowrap hover:decoration-1 hover:underline disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Set Up →
          </button>
        </div>
      </div>

      <DonationBasketTotal />
      <DonationStepFooter onNext={() => goStep(2)} nextDisabled={isNextDisabled} />
    </div>
  );
}