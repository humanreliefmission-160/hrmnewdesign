import React from 'react';
import Link from 'next/link';

interface DonationSuccessProps {
  showSuccess: boolean;
  resetDonation: () => void;
}

export default function DonationSuccess({ showSuccess, resetDonation }: DonationSuccessProps) {
  if (!showSuccess) return null;

  return (
    <div className="bg-brand-white p-8 md:p-12 rounded-2xl shadow-card border border-brand-lgrey text-center animate-in zoom-in-95 duration-500">
      <div className="text-6xl mb-6 animate-bounce">🎉</div>
      <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4 font-body">Thank You!</h2>
      <p className="text-[1.1rem] text-brand-grey leading-relaxed mb-8 font-medium">
        Your donation has been received and will make a real difference to
        people in need.
        <br />A confirmation has been sent to your email address.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link
          href="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-bold text-base cursor-pointer transition-all duration-200 no-underline px-8 py-4 bg-purple text-brand-white hover:bg-purple-dark hover:-translate-y-0.5 hover:shadow-btn-purple"
        >
          Back to Home
        </Link>
        <button
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-bold text-base cursor-pointer transition-all duration-200 no-underline px-8 py-4 border-2 border-purple text-purple rounded-lg hover:bg-purple hover:text-brand-white"
          onClick={resetDonation}
        >
          Make Another Donation
        </button>
      </div>
    </div>
  );
}
