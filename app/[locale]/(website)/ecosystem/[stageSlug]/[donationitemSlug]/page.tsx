import AidItemDetails from "../../../components/projectdonationitem/AidItemDetails";
import DonationOptions from "../../../components/projectdonationitem/DonationOptions";
import ImageGallery from "../../../components/projectdonationitem/ImageGallary";
import Link from "next/link";

import { notFound } from 'next/navigation'
import { urlFor } from '@/sanity/lib/image'
import { sanityFetch } from "@/app/[locale]/lib/sanity/client";
import PageHeader from "../../../components/PageHeader";
import type { DonationItemData, DonationItemImage, GalleryImage } from "../../../types/donationItem";

const ECOSYSTEM_ITEM_QUERY = `
  *[_type == "project" && ecosystemSection.stage->slug.current == $stageSlug && count(donationSection.donationItems[slug.current == $donationitemSlug]) > 0][0] {
    name,
    "projectSlug": slug.current,
    "stageName": ecosystemSection.stage->stageName,
    "item": donationSection.donationItems[slug.current == $donationitemSlug][0] {
      icon,
      itemTitle,
      itemSubtext,
      price,
      contactForPricing,
      donationType,
      frequency,
      donationItemBody,
      amounts[] {
        _key,
        amount,
        label
      },
      intentions[]-> {
        title,
        description
      },
      images[] {
        altText,
        caption,
        link,
        asset
      },
      keyFeatures,
      howItHelps,
      endGoal,
      summarise,
      additionalFields,
      info
    }
  }
`;

interface EcosystemItemResult {
  name: string;
  projectSlug: string;
  stageName: string;
  item: DonationItemData | null;
}

export default async function EcosystemDonationItemPage({
  params,
}: {
  params: Promise<{ stageSlug: string; donationitemSlug: string }>
}) {
  const { stageSlug, donationitemSlug } = await params

  const data = await sanityFetch<EcosystemItemResult | null>(
    ECOSYSTEM_ITEM_QUERY,
    { stageSlug, donationitemSlug }
  );

  if (!data?.item) notFound()

  const { item, projectSlug } = data;

  const galleryImages: GalleryImage[] = (item.images ?? []).map((img: DonationItemImage) => ({
    src: img.asset
      ? urlFor(img.asset).width(1200).height(900).fit('crop').auto('format').quality(80).url()
      : '/img-placeholder.JPG',
    altText: img.altText,
    caption: img.caption,
    link: img.link,
  }));

  if (galleryImages.length === 0) {
    galleryImages.push({
      src: '/img-placeholder.JPG',
      altText: item.itemTitle,
    });
  }

  return (
    <div className="min-h-screen bg-brand-white font-sans antialiased">
      <PageHeader
        title={item.itemTitle}
        subtitle={item.itemSubtext}
        display={false}
      />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-24 mt-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14 xl:grid-cols-[55fr_45fr]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            {/* Breadcrumb Bar */}
            <div className="flex flex-wrap items-center gap-2 text-[0.75rem] font-bold uppercase mb-6 text-brand-black/60">
              <Link href="/" className="hover:text-purple transition-colors">
                Home
              </Link>
              <span className="text-purple">&gt;</span>
              <Link href="/ecosystem" className="hover:text-purple transition-colors">
                Ecosystem
              </Link>
              <span className="text-purple">&gt;</span>
              <Link href={`/ecosystem/${stageSlug}`} className="hover:text-purple transition-colors">
                {data.stageName || stageSlug}
              </Link>
              <span className="text-purple">&gt;</span>
              <span className="text-brand-black font-bold">
                {item.itemTitle}
              </span>
            </div>

            <ImageGallery images={galleryImages} />
          </div>
          <div>
            <DonationOptions item={item} projectName={data.name} projectSlug={projectSlug} />
          </div>
        </div>
        <AidItemDetails item={item} />
      </main>
    </div>
  );
}
