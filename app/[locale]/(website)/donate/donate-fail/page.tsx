import Link from "next/link";
import { IoIosCloseCircle } from "react-icons/io";
import YellowCTA from "../../components/YellowCTA";

export default function DonationFail() {
  return (
    <div className="min-h-screen bg-brand-white flex flex-col">

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-2xl">
          {/* Card */}
          <div className="bg-white rounded-sm shadow-xl overflow-hidden">
            {/* Red-tinted top banner using purple-dark */}
            <div
              className="px-8 py-10 text-center relative overflow-hidden bg-[#B60000]"
            >

              {/* X circle */}
              <div className="relative mx-auto mb-5 w-24 h-24 rounded-full bg-brand-white/50 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg">
                  <IoIosCloseCircle size={100} fill="#B60000" />
                </div>
              </div>

              <h1 className="relative text-white text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
                Payment Failed
              </h1>
              <p className="relative text-white/80 text-base font-medium">
                We were unable to process your donation
              </p>
            </div>

            {/* Body */}
            <div className="px-8 py-10">
              {/* Error info box */}
              <div className="rounded-sm p-6 mb-8 border border-[#B60000]/15 bg-[#b60000]/5">

                <div>
                  <p className="text-brand-black font-bold mb-1 text-sm">What went wrong?</p>
                  <p className="text-brand-grey text-sm leading-relaxed">
                    Your payment could not be completed. This may be due to insufficient funds,
                    an incorrect card number, or your bank declining the transaction.
                    <strong className="text-brand-black"> No money has been taken from your account.</strong>
                  </p>
                </div>
              </div>

              {/* Attempted summary */}
              <div className="bg-brand-white rounded-sm p-6 mb-8 border border-brand-lgrey">
                <p className="text-brand-black text-xs font-bold uppercase mb-4">
                  Attempted Donation
                </p>
                <div>
                  <p className="text-brand-grey text-sm mb-1">Amount</p>
                  <p className="text-brand-black text-4xl font-black">£50.00</p>
                </div>
                <div className="mt-4 bg-white/75 px-3 py-3 rounded-sm">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-brand-black font-semibold text-sm">Hot Meals</p>
                      <p className="text-brand-black text-sm">One Hot Meal | Sadaqah</p>
                    </div>
                    <p className="text-[#B60000] font-semibold text-sm">£10.00</p>
                  </div>
                  {/* If there's only one donation item, make it hidden */}
                  <hr className="h-0.25 border-t-0 bg-[#B60000]/25 my-2" />
                </div>
                <div className="flex items-center gap-2 mt-6">
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: 'rgba(185,28,28,0.1)', color: '#b91c1c' }}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    Payment declined on
                    <span className="text-[#B60000] text-xs">
                      {new Date().toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                </div>
              </div>

              {/* Common reasons */}
              <div className="mb-1">
                <h3 className="text-brand-black font-bold text-sm mb-3">Common reasons for failure:</h3>
                <ul className="space-y-2">
                  {[
                    'Insufficient funds in your account',
                    'Incorrect card details entered',
                    'Card expired or not activated for online payments',
                    'Bank security block on the transaction',
                  ].map((reason, i) => (
                    <li key={i} className="flex items-center gap-3 text-brand-black/75 text-sm">
                      <div className="w-5 h-5 rounded-full bg-[#B60000]/10 flex items-center justify-center shrink-0">
                        <span className="text-[#B60000] text-xs font-bold">{i + 1}</span>
                      </div>
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-10">
                <div className="mx-auto">
                  {/* Go back to the payment section with the basket items in the basket and make the payment again with all payment options available */}
                  <YellowCTA text="Try Again" href="/donate" />
                </div>

                <Link
                  href="/"
                  className="text-[#B60000] font-bold underline text-center text-sm"
                >
                  Return to Homepage
                </Link>
              </div>

              {/* Support */}
              <div className="mt-6 p-4 bg-[#B60000]/5 rounded-sm border border-[#B60000]/10 flex items-center justify-between gap-4">
                <div>
                  <p className="text-brand-black font-semibold text-sm">Need help?</p>
                  <p className="text-brand-grey text-xs mt-0.5">
                    Contact our support team and we'll assist you.
                  </p>
                </div>
                <a
                  href="mailto:info@humanreliefmission.com"
                  className="shrink-0 bg-[#B60000] hover:bg-[#B60000]-dark/10 text-white text-xs font-bold px-4 py-2.5 rounded-sm"
                >
                  Get Support
                </a>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <p className="text-center text-brand-grey text-xs mt-6">
            {`Registered charity No. ${process.env.CHARITY_NO} |  All donations are securely processed`}
          </p>
        </div>
      </main>
    </div>
  );
}
