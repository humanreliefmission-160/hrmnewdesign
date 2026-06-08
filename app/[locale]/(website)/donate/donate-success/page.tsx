import Link from "next/link";
import { IoIosCheckmarkCircle } from "react-icons/io";
import YellowCTA from "../../components/YellowCTA";


export default function DonationSuccess() {
  return (
    <div className="min-h-screen bg-brand-white flex flex-col">

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        {/* Card */}
        <div className="bg-white rounded-sm shadow-xl overflow-hidden">
          {/* Purple top banner */}
          <div className="bg-purple px-8 py-10 text-center relative overflow-hidden">

            {/* Checkmark circle */}
            <div className="relative mx-auto mb-5 w-24 h-24 rounded-full bg-brand-white/75 flex items-center justify-center">
              <IoIosCheckmarkCircle size={100} fill="#650199" />
            </div>

            <h1 className="relative text-white text-3xl md:text-4xl font-bold tracking-tight mb-2">
              Thank You Name
            </h1>
            <p className="relative text-white/80 text-base font-medium">
              Your donation was successful
            </p>
          </div>

          {/* Body */}
          <div className="px-8 py-10">
            {/* Donation summary box */}
            <div className="bg-purple-faint rounded-sm p-6 mb-8 border border-purple/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple/50 text-xs mb-0.5">Donation Reference</p>
                  <h1 className="relative text-purple text-2xl md:text-3xl font-bold tracking-tight mb-2">DON-2025-8472</h1>
                </div>
                <p className="text-brand-black font-semibold">
                  {new Date().toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <hr className="h-0.25 border-t-0 bg-transparent bg-linear-to-r from-transparent via-purple to-transparent dark:via-purple/50 my-6" />
              <div className="mb-2">

                <div className="mt-4 bg-white/75 px-3 py-3 rounded-sm">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-brand-black font-semibold text-sm">Hot Meals</p>
                      <p className="text-brand-black text-sm">One Hot Meal | Sadaqah</p>
                    </div>
                    <p className="text-purple font-semibold text-sm">£10.00</p>
                  </div>
                  {/* If there's only one donation item, make it hidden */}
                  <hr className="h-0.25 border-t-0 bg-purple/25 my-2" />
                </div>
                <div className="flex justify-between items-end mt-6">
                  <p className="text-brand-black text-xl font-bold">Total</p>
                  <p className="text-purple text-4xl font-bold">£50.00</p>
                </div>

              </div>
            </div>

            {/* Message */}
            <div className="text-center mb-8">
              <h2 className="text-brand-black text-xl font-bold mb-3">
                Your generosity makes a difference
              </h2>
              <p className="text-brand-black text-sm leading-relaxed max-w-md mx-auto">
                A confirmation email has been sent to your inbox with your donation receipt. Your support helps us continue our vital work in communities that need it most.
              </p><br />
              <span className="italic text-xs mt-4">Check the junk folder if you don't see your receipt in your inbox</span>
            </div>

            {/* Impact cards */}
            {/* <div className="grid grid-cols-3 gap-3 mb-8">
              <div className="bg-brand-white rounded-xl p-4 text-center border border-brand-lgrey">
                <div className="text-2xl mb-1">🍽️</div>
                <p className="text-purple font-bold text-lg">10</p>
                <p className="text-brand-grey text-xs font-medium">Meals funded</p>
              </div>
              <div className="bg-brand-white rounded-xl p-4 text-center border border-brand-lgrey">
                <div className="text-2xl mb-1">👨‍👩‍👧</div>
                <p className="text-purple font-bold text-lg">3</p>
                <p className="text-brand-grey text-xs font-medium">Families helped</p>
              </div>
              <div className="bg-brand-white rounded-xl p-4 text-center border border-brand-lgrey">
                <div className="text-2xl mb-1">🌱</div>
                <p className="text-purple font-bold text-lg">1</p>
                <p className="text-brand-grey text-xs font-medium">Tree planted</p>
              </div>
            </div> */}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="mx-auto">
                <YellowCTA text="Donate Again" href="/donate" />
              </div>
              <Link
                href="/"
                className="flex-1 text-purple font-bold text-center text-sm transition-colors duration-200 underline"
              >
                Back to Homepage
              </Link>
            </div>
          </div>

          {/* Footer note */}
          <p className="text-center text-brand-grey text-xs mb-6">
            {`Registered charity No. ${process.env.CHARITY_NO} |  All donations are securely processed`}
          </p>

        </div>
      </main>
    </div>
  );
}
