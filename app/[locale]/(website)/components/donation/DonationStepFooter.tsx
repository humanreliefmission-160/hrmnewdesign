import React from 'react';
import YellowCTA from '../YellowCTA';

interface DonationStepFooterProps {
  onBack?: () => void;
  onNext?: () => void;
  nextDisabled?: boolean;
}

export default function DonationStepFooter({ onBack, onNext, nextDisabled = false }: DonationStepFooterProps) {
  return (
    <div className="flex justify-between items-center mt-12 bg-gray-50 -mx-10 -mb-10 px-8 py-6 rounded-b-2xl border-t border-brand-lgrey">
      {onBack ? (
        <button className="font-bold text-purple hover:underline" onClick={onBack}>
          ← Back
        </button>
      ) : (
        <div></div>
      )}

      {onNext ? (
        <YellowCTA onClick={onNext} text="Next →" disabled={nextDisabled} />
      ) : (
        <div></div>
      )}
    </div>
  );
}
