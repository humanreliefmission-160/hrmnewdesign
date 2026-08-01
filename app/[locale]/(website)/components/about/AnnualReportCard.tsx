import Image from 'next/image';
import YellowCTA from '../YellowCTA';

interface AnnualReportCardProps {
  title: string;
  subtext?: string;
  fileUrl?: string;
  coverImageUrl?: string;
  coverImageAlt?: string;
}

export default function AnnualReportCard({
  title,
  subtext,
  fileUrl,
  coverImageUrl,
  coverImageAlt,
}: AnnualReportCardProps) {
  return (
    <div className="group bg-white rounded-sm overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 flex flex-col">
      {/* Cover Image */}
      <div className="relative w-full aspect-4/3 bg-brand-lgrey overflow-hidden">
        {coverImageUrl ? (
          <Image
            src={coverImageUrl}
            alt={coverImageAlt || title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          /* Fallback placeholder when no cover image is set */
          <div className="w-full h-full bg-linear-to-br from-purple-dark to-purple flex items-center justify-center">
            <span className="text-brand-white text-2xl font-bold select-none px-4">
              {title}
            </span>
          </div>
        )}
        {/* Purple tint overlay on hover */}
        <div className="absolute inset-0 bg-purple/0 group-hover:bg-purple/10 transition-colors duration-300" />
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-6 gap-3">
        <h3 className="text-2xl font-bold text-brand-black font-body leading-tight">
          {title}
        </h3>

        {subtext && (
          <p className="text-sm text-brand-grey leading-relaxed flex-1">
            {subtext}
          </p>
        )}

        <div className="mt-2">
          <YellowCTA
            text="Download"
            href={fileUrl || '#'}
          />
        </div>
      </div>
    </div>
  );
}
