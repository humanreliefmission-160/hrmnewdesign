import { DonationState } from './types';
import DonationStepFooter from './DonationStepFooter';
import DonationBasketTotal from './DonationBasketTotal';
import GitAidIcon from '../../donate/GiftAidIcon';

interface DonationStepGiftAidProps {
  currentStep: number;
  donationState: DonationState;
  setGiftAid: (val: boolean) => void;
  goStep: (step: number) => void;
}

export default function DonationStepGiftAid({ currentStep, donationState, setGiftAid, goStep }: DonationStepGiftAidProps) {
  if (currentStep !== 3) return null;

  return (
    <div className="bg-brand-white p-8 md:p-10 rounded-2xl shadow-card border border-brand-lgrey">
      <DonationBasketTotal />
      <GitAidIcon className="w-50 h-auto text-brand-black mb-5" />
      <h2 className="text-2xl md:text-3xl font-bold text-brand-black mb-2 font-body leading-tight">
        Boost your donation
      </h2>
      <p className="text-[0.95rem] text-brand-grey mb-8 font-medium">
        {"If you're a UK taxpayer, Gift Aid lets us reclaim 25p for every £1 you donate at no extra cost to you."}
      </p>

      <div className="bg-purple-faint border border-purple/20 p-6 rounded-sm flex flex-col sm:flex-row gap-6 mb-8">
        <div className="flex-1">
          <div className="font-bold text-brand-black mb-2 leading-tight">Add Gift Aid to your donation</div>
          <p className="text-[0.875rem] text-brand-grey leading-relaxed mb-6 font-medium">
            By confirming you are a UK taxpayer and understand that if you pay less Income Tax and/or Capital Gains Tax than the amount of Gift Aid claimed on all your donations in that tax year it is your responsibility to pay any difference.
          </p>
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="giftaid"
                checked={donationState.giftAid === true}
                onChange={() => setGiftAid(true)}
                className="w-5 h-5 accent-purple border-brand-lgrey focus:ring-purple"
              />
              <span className="text-[0.95rem] font-bold text-brand-black group-hover:text-purple transition-colors">Yes, I want to add Gift Aid</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="giftaid"
                checked={donationState.giftAid === false}
                onChange={() => setGiftAid(false)}
                className="w-5 h-5 accent-purple border-brand-lgrey focus:ring-purple"
              />
              <span className="text-[0.95rem] font-bold text-brand-black group-hover:text-purple transition-colors">No thanks</span>
            </label>
          </div>
        </div>
      </div>

      {donationState.giftAid && (
        <div className="bg-purple-faint border-l-4 border-purple p-4 rounded-r-lg mb-8 text-purple text-sm animate-pulse-2">
          <strong>Great!</strong> Your donation will be worth{" "}<strong>25% more</strong> thanks to Gift Aid.
        </div>
      )}

      <DonationStepFooter onBack={() => goStep(2)} onNext={() => goStep(4)} />
    </div>
  );
}
