import PageHeader from "@/app/(website)/components/PageHeader";
import AidItemDetails from "@/app/(website)/components/projectdonationitem/AidItemDetails";
import DonationOptions from "@/app/(website)/components/projectdonationitem/DonationOptions";
import ImageGallery from "@/app/(website)/components/projectdonationitem/ImageGallary";

export default function App() {
  return (
    <div className="min-h-screen bg-brand-white font-sans antialiased">
      {/* ── Page Header ── */}
      <PageHeader
        title="Donation Item"
        subtitle="Lorem Ipsum text"
      />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-24">
        {/* Product layout: image left | options right */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14 xl:grid-cols-[55fr_45fr]">
          {/* Left – Image Gallery */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            {/* <ImageGallery /> */}
            <ImageGallery />
          </div>
          {/* Right – Product Options */}
          <div>
            <DonationOptions />
          </div>
        </div>
        <AidItemDetails />
      </main>
    </div>
  );
}
