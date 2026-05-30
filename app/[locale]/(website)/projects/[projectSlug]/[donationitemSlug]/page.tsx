
import AidItemDetails from "../../../components/projectdonationitem/AidItemDetails";
import DonationOptions from "../../../components/projectdonationitem/DonationOptions";
import ImageGallery from "../../../components/projectdonationitem/ImageGallary";

import { notFound } from 'next/navigation'
import { urlFor } from '@/sanity/lib/image'
import { sanityFetch } from "@/sanity/lib/live";
// import PageHeader from "../../../components/PageHeader";

const ITEM_QUERY = `
  *[_type == "project" && slug.current == $projectSlug][0] {
    name,
    "item": donationSection.items[slug.current == $donationitemSlug][0] {
      title,
      subtext,
      slug,
      price,
      frequency,
      bodyText,
      amounts,
      intentions[]-> {
        title,
        "slug": slug.current,
        description,
      },
      images[] {
        alt,
        caption,
        asset,
      },
      keyFeatures,
      howItHelps,
      endGoal,
      summarise,
      additionalFields,
      info,
    }
  }
`;

export default async function DonationItemPage({
  params,
}: {
  params: Promise<{ projectSlug: string; donationitemSlug: string }>
}) {

  const { projectSlug, donationitemSlug } = await params

  const data = await sanityFetch(ITEM_QUERY, { projectSlug, donationitemSlug } as any);

  const { item, name: projectName } = data;

  // data.item is null if the slug doesn't match any item in the project
  if (!data?.item) notFound()


  return (
    <div className="min-h-screen bg-brand-white font-sans antialiased">
      {/* ── Page Header ── */}
      {/* <PageHeader
        title="Donation Item"
        subtitle="Lorem Ipsum text"
      /> */}

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-24 mt-6">
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
