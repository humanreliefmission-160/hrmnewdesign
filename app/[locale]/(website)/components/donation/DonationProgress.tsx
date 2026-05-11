import React from 'react';

interface DonationProgressProps {
  currentStep: number;
}

export default function DonationProgress({ currentStep }: DonationProgressProps) {
  return (
    <div className="flex justify-between items-center mb-12 relative before:content-[''] before:absolute before:top-5 before:left-0 before:w-full before:h-0.5 before:bg-brand-lgrey before:z-0">
      {[1, 2, 3, 4, 5].map((step) => (
        <div
          key={step}
          className="flex flex-col items-center gap-2 relative z-10"
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all border-2 ${
            currentStep === step 
              ? "bg-purple border-purple text-brand-white" 
              : currentStep > step 
              ? "bg-purple border-purple text-brand-white"
              : "bg-brand-white border-brand-lgrey text-brand-grey"
          }`}>
            {step}
          </div>
          <div className={`text-[0.7rem] font-bold uppercase tracking-widest ${currentStep === step ? "text-purple" : "text-brand-grey"}`}>
            {["Start", "Donation", "Gift Aid", "Details", "Payment"][step - 1]}
          </div>
        </div>
      ))}
    </div>
  );
}
