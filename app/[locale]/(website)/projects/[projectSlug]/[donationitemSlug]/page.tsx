import DonationOptions from "../../../components/projectdonationitem/DonationOptions";
import ImageGallery from "../../../components/projectdonationitem/ImageGallary";
import Link from "next/link";

import { notFound } from 'next/navigation'
import { urlFor } from '@/sanity/lib/image'
import { sanityFetch } from "@/app/[locale]/lib/sanity/client";
import PageHeader from "../../../components/PageHeader";
import type { DonationItemData, GalleryImage } from "../../../types/donationItem";
import IconRenderer from "@/app/[locale]/lib/icons/IconRenderer";

const ITEM_QUERY = `
  *[_type == "project" && slug.current == $projectSlug][0] {
    name,
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

      <main className="mx-auto max-w-285 px-4 sm:px-6 lg:px-8 py-8 sm:py-16 mt-6">
        <div className="flex flex-col gap-10">

          {/* Breadcrumb Bar */}
          <div className="flex flex-wrap items-center gap-2 text-[0.75rem] font-bold uppercase text-brand-black/60 mt-10">
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

          {/* Icon + itemTitle badge */}
          {/* <div className="flex flex-wrap gap-2">
            <div className="flex items-start gap-2 px-3 py-2 rounded-sm border border-purple bg-purple/10">
              <span className="mt-0.5 shrink-0 text-purple">
                <IconRenderer name={item.icon ?? ''} size={13} />
              </span>
              <div>
                <div className="text-xs font-bold text-purple">
                  {item.itemTitle}
                </div>
                {item.itemSubtext && (
                  <div className="text-[10px] mt-0.5 text-brand-grey">
                    {item.itemSubtext}
                  </div>
                )}
              </div>
            </div>
          </div> */}

          {/* Donation Options + Aid Item Details */}
          <DonationOptions item={item} projectName={data.name} projectSlug={projectSlug} />

          {/* Image Gallery */}
          <ImageGallery images={galleryImages} />

        </div>
      </main>
    </div>
  );
}
