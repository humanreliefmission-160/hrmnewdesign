import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import Image from "next/image";

interface StageItem {
  _id: string;
  title: string;
  slug: string;
  order: number;
  stageNumber?: number;
  stageName?: string;
  cardImage?: {
    asset: {
      _id: string;
      url: string;
    };
  };
  cardDescription?: string;
}

export default function StagesCard({ stages }: { stages?: StageItem[] }) {
  if (!stages || stages.length === 0) return null;

  return (
    <section className="bg-purple-faint/50 py-16 px-4 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block bg-purple-faint text-purple text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-sm mb-4">
            Explore All Stages
          </span>
          <h2 className="text-3xl font-bold text-brand-black">
            Four Stages. One Transformation.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stages.map((stage) => {
            const imageUrl = stage.cardImage?.asset?.url || "/img-placeholder.JPG";
            const stageNum = stage.stageNumber ?? stage.order;
            const displayName = stage.stageName || stage.title;

            return (
              <Link
                key={stage._id}
                href={`/ecosystem/${stage.slug}`}
                className="group rounded-sm overflow-hidden border border-brand-lgrey shadow-sm hover:shadow-lg transition-all bg-brand-white/50"
              >
                <div className="h-40 overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={displayName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    width={400}
                    height={400}
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-brand-grey font-semibold uppercase tracking-wider">
                      Stage {stageNum}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{displayName}</h3>
                  {stage.cardDescription && (
                    <p className="text-brand-black/75 text-sm leading-snug mb-4">{stage.cardDescription}</p>
                  )}
                  <div className="flex items-center gap-1 text-purple text-sm font-semibold group-hover:gap-2 transition-all">
                    <span>Explore stage</span>
                    <FaChevronRight />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}