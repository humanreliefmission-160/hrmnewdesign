"use client";

import React, { useState } from 'react';
import { DonationState } from './types';
import DonationStepFooter from './DonationStepFooter';
import DonationBasketTotal from './DonationBasketTotal';
import { useBasket } from '../../context/BasketContext';
import {
  type DonationPortalProject,
  type DonationPortalItem,
  getProjectDonationItems,
} from '../../lib/sanity/donationProjects';

interface DonationStepFundAmountProps {
  currentStep: number;
  donationState: DonationState;
  projects: DonationPortalProject[];
  customAmount: string;
  selectProject: (projectId: string) => void;
  selectDonationItem: (itemKey: string) => void;
  selectAmount: (val: string) => void;
  selectIntention: (intention: string) => void;
  handleCustomAmount: (e: React.ChangeEvent<HTMLInputElement>) => void;
  updateAdditionalField: (label: string, value: string) => void;
  selectDurationMonths: (months: number | null) => void;
  goStep: (step: number) => void;
}

function getSelectedProject(
  projects: DonationPortalProject[],
  projectId: string
): DonationPortalProject | undefined {
  return projects.find((p) => p._id === projectId);
}

function getSelectedItem(
  project: DonationPortalProject | undefined,
  itemKey: string
): DonationPortalItem | undefined {
  return project?.donationSection?.donationItems?.find((i) => i._key === itemKey);
}

export default function DonationStepFundAmount({
  currentStep,
  donationState,
  projects,
  customAmount,
  selectProject,
  selectDonationItem,
  selectAmount,
  selectIntention,
  handleCustomAmount,
  updateAdditionalField,
  selectDurationMonths,
  goStep,
}: DonationStepFundAmountProps) {
  const { items, addItem } = useBasket();
  const [basketAdded, setBasketAdded] = useState(false);

  if (currentStep !== 2) return null;

  const selectedProject = getSelectedProject(projects, donationState.projectId);
  const donationItems = getProjectDonationItems(selectedProject, donationState.type);
  const selectedItem = getSelectedItem(selectedProject, donationState.donationItemKey);

  const presetAmounts = selectedItem?.amounts?.map((a) => a.amount) ?? [];
  const intentions = selectedItem?.intentions ?? [];
  const additionalFields = selectedItem?.additionalFields ?? [];

  const requiresIntention = intentions.length > 0;
  const hasValidAmount =
    donationState.amount !== null && donationState.amount > 0;

  const isNextDisabled =
    !donationState.projectId ||
    !donationState.donationItemKey ||
    !hasValidAmount ||
    (requiresIntention && !donationState.intention);

  const canAddToBasket = !isNextDisabled && Boolean(selectedItem?.itemTitle);

  const handleAddToBasket = () => {
    if (!canAddToBasket || !donationState.amount) return;

    const intention =
      donationState.intention ||
      (requiresIntention ? '' : 'Sadaqah');

    if (!intention) return;

    addItem({
      projectName: donationState.projectName,
      projectSlug: donationState.projectSlug,
      projectItem: selectedItem!.itemTitle!,
      donationItemKey: donationState.donationItemKey,
      amount: donationState.amount,
      intention,
      isZakat: intention.toLowerCase() === 'zakat',
      frequency: donationState.type,
    });
    setBasketAdded(true);
    setTimeout(() => setBasketAdded(false), 2000);
  };

  const getImpactMessage = (amount: number | null) => {
    if (!amount) return null;
    const matched = selectedItem?.amounts?.find((a) => a.amount === amount);
    if (matched?.label) return matched.label;
    const people = Math.floor(amount / 10);
    if (people >= 1) {
      return `£${amount} feeds ${people} person${people > 1 ? 's' : ''}.`;
    }
    return `£${amount} helps provide essential food support.`;
  };

  const optionButtonClass = (selected: boolean) =>
    `p-3 rounded-sm border text-[0.8rem] font-bold transition-all text-center leading-tight ${selected
      ? 'bg-purple text-brand-white border-purple'
      : 'border-brand-lgrey bg-brand-white text-brand-black hover:bg-brand-lgrey/30'
    }`;

  const amountButtonClass = (selected: boolean) =>
    `p-3 rounded-sm border font-bold transition-all text-center text-[0.8rem] ${selected
      ? 'bg-purple text-brand-white border-purple'
      : 'border-brand-lgrey bg-brand-white text-brand-black hover:bg-brand-lgrey/30'
    }`;

  const publishedProjects = projects.filter(
    (p) => getProjectDonationItems(p, donationState.type).length > 0
  );

  return (
    <div className="bg-brand-white p-8 md:p-10 rounded-2xl shadow-card border border-brand-lgrey">
      <DonationBasketTotal />
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-brand-black mb-2 font-body leading-tight">
          1. Select project
        </h2>
        <p className="text-[0.95rem] text-brand-grey mb-4 font-medium">
          Choose which project you would like to support.
        </p>

        {publishedProjects.length === 0 ? (
          <p className="text-sm text-brand-grey mb-8">
            No projects are available for{' '}
            {donationState.type === 'oneoff'
              ? 'one-off'
              : donationState.type === 'daily'
                ? 'daily'
                : donationState.type === 'weekly'
                  ? 'weekly'
                  : donationState.type === 'monthly'
                    ? 'monthly'
                    : 'Friday'} giving right now.
            Please try another donation type or check back later.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {publishedProjects.map((project) => (
              <button
                key={project._id}
                type="button"
                className={optionButtonClass(donationState.projectId === project._id)}
                onClick={() => selectProject(project._id)}
              >
                {project.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {donationState.projectId && (
        <div className="py-6 border-t border-brand-lgrey">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-black mb-2 font-body leading-tight">
            2. Select donation item
          </h2>
          <p className="text-[0.95rem] text-brand-grey mb-4 font-medium">
            Choose how you can help in the {donationState.projectName} project.
          </p>

          {donationItems.length === 0 ? (
            <p className="text-sm text-brand-grey mb-4">
              This project has no donation items for your selected giving type.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {donationItems.map((item) => (
                <button
                  key={item._key}
                  type="button"
                  className={`${optionButtonClass(donationState.donationItemKey === item._key)} text-left`}
                  onClick={() => selectDonationItem(item._key)}
                >
                  <span className="block">{item.itemTitle}</span>
                  {item.itemSubtext && (
                    <span className="block text-[0.7rem] font-normal mt-1 opacity-90">
                      {item.itemSubtext}
                    </span>
                  )}
                  <span className="block text-[0.7rem] font-semibold mt-2">
                    {item.contactForPricing ? "Contact us for pricing" : `Full price: £${item.price}`}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {selectedItem && (
        <div className="py-6 border-t border-brand-lgrey">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-black mb-2 font-body leading-tight">
            3. Select amount
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-5">
            {presetAmounts.map((val) => (
              <button
                key={val}
                type="button"
                className={amountButtonClass(
                  donationState.amount === val && customAmount === ''
                )}
                onClick={() => selectAmount(String(val))}
              >
                £{val}
              </button>
            ))}
            <button
              type="button"
              className={amountButtonClass(
                donationState.amount === null && customAmount !== ''
              )}
              onClick={() => selectAmount('other')}
            >
              Other
            </button>
          </div>

          {(donationState.amount === null || customAmount !== '') && (
            <input
              className="w-full px-4 py-3 border-2 border-purple rounded-sm focus:outline-none text-lg font-bold text-purple mb-4 placeholder:text-purple/50 bg-brand-white"
              type="number"
              id="customAmount"
              min={1}
              placeholder="Enter custom amount (£)"
              value={customAmount}
              onChange={handleCustomAmount}
            />
          )}

          {donationState.type === 'monthly' && (
            <div className="mb-4 flex flex-col gap-1.5 animate-in fade-in duration-300">
              <label className="text-sm font-bold text-brand-black">Donation Duration (Months)</label>
              <select
                className="w-full px-4 py-3 border border-brand-lgrey rounded-sm focus:border-purple focus:ring-1 focus:ring-purple outline-none bg-brand-white font-medium text-brand-black cursor-pointer"
                value={donationState.durationMonths ?? ''}
                onChange={(e) => {
                  const val = e.target.value;
                  selectDurationMonths(val ? parseInt(val, 10) : null);
                }}
              >
                <option value="">Ongoing (No fixed end date)</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>
                    {m} Month{m > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
          )}

          {hasValidAmount && (
            <div className="mb-4 bg-purple/5 border border-purple/20 p-3 rounded-sm flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-purple shrink-0"
                aria-hidden
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
              <p className="text-purple font-medium text-sm">
                {getImpactMessage(donationState.amount)}
              </p>
            </div>
          )}
        </div>
      )}

      {selectedItem && requiresIntention && (
        <div className="py-6 border-t border-brand-lgrey">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-black mb-2 font-body leading-tight">
            4. Select intention
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {intentions.map((intention) => (
              <button
                key={intention._id}
                type="button"
                className={optionButtonClass(donationState.intention === intention.title)}
                onClick={() => selectIntention(intention.title)}
              >
                {intention.title}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={handleAddToBasket}
            disabled={!canAddToBasket}
            className="mt-5 text-sm font-semibold text-purple underline underline-offset-2 hover:text-purple-dark transition-colors disabled:opacity-40 disabled:no-underline disabled:cursor-not-allowed"
          >
            {basketAdded ? 'Added to donation basket!' : 'Add to donation basket'}
          </button>
        </div>
      )}

      {selectedItem && additionalFields.length > 0 && (
        <div className="py-6 border-t border-brand-lgrey">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-black mb-2 font-body leading-tight">
            Additional information
          </h2>
          <div className="space-y-4">
            {additionalFields.map((field) => (
              <div key={field.label} className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-brand-black">{field.label}</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-brand-lgrey rounded-sm focus:border-purple focus:ring-1 focus:ring-purple outline-none bg-brand-white font-medium"
                  placeholder={field.label}
                  value={donationState.additionalFieldValues[field.label] ?? ''}
                  onChange={(e) => updateAdditionalField(field.label, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <DonationBasketTotal />

      <DonationStepFooter
        onBack={() => goStep(1)}
        onNext={() => {
          const intention =
            donationState.intention ||
            (intentions.length > 0 ? '' : 'Sadaqah');

          const alreadyInBasket = items.some(
            (item) =>
              item.donationItemKey === donationState.donationItemKey &&
              item.projectName === donationState.projectName &&
              item.amount === donationState.amount &&
              item.intention === intention
          );

          if (!alreadyInBasket) {
            handleAddToBasket();
          }
          goStep(3);
        }}
        nextDisabled={isNextDisabled}
      />
    </div>
  );
}
