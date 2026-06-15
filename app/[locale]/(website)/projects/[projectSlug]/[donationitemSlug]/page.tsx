import AidItemDetails from "../../../components/projectdonationitem/AidItemDetails";
import DonationOptions from "../../../components/projectdonationitem/DonationOptions";
import ImageGallery from "../../../components/projectdonationitem/ImageGallary";
import Link from "next/link";

import { notFound } from 'next/navigation'
import { urlFor } from '@/sanity/lib/image'
import { sanityFetch } from "@/app/[locale]/lib/sanity/client";
import PageHeader from "../../../components/PageHeader";
import type { DonationItemData, GalleryImage } from "../../../types/donationItem";

const ITEM_QUERY = `
  *[_type == "project" && slug.current == $projectSlug][0] {
    name,
    "item": donationSection.donationItems[slug.current == $donationitemSlug][0] {
      icon,
      itemTitle,
      itemSubtext,
      price,
      donationType,
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

export default async function DonationItemPage({
  params,
}: {
  params: Promise<{ projectSlug: string; donationitemSlug: string }>
}) {
  const { projectSlug, donationitemSlug } = await params

  const data = await sanityFetch<{ name: string; item: DonationItemData | null }>(
    ITEM_QUERY,
    { projectSlug, donationitemSlug }
  );

  if (!data?.item) notFound()

  const { item } = data;

  const galleryImages: GalleryImage[] = (item.images ?? []).map((img) => ({
    src: img.asset
      ? urlFor(img.asset).width(1200).height(900).fit('crop').url()
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
              <Link href="/projects" className="hover:text-purple transition-colors">
                Projects
              </Link>
              <span className="text-purple">&gt;</span>
              <Link href={`/projects/${projectSlug}`} className="hover:text-purple transition-colors">
                {data.name}
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
