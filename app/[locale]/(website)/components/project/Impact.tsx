import { PortableText } from "next-sanity";

interface ImpactCard {
  _key: string;
  stat?: string;
  bodyText?: string;
}

interface ImpactSectionData {
  title?: string;
  bodyText?: any[];
  impactCards?: ImpactCard[];
}

export default function Impact({ data }: { data?: ImpactSectionData }) {
  if (
    !data ||
    (!data.title &&
      !data.bodyText &&
      (!data.impactCards || data.impactCards.length === 0))
  ) {
    return null;
  }

  return (
    <section className="bg-brand-white py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-purple-100 text-purple text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-sm mb-3">
            Impact
          </span>
          {data.title && (
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {data.title}
            </h2>
          )}
          {data.bodyText && (
            <div className="text-gray-500 max-w-2xl mx-auto text-base portable-text">
              <PortableText value={data.bodyText} />
            </div>
          )}
        </div>

        {data.impactCards && data.impactCards.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {data.impactCards.map((card) => (
              <div
                key={card._key}
                className="bg-white/50 rounded-sm p-6 flex flex-col items-center text-center shadow-sm border border-brand-white hover:shadow-md transition-shadow duration-200"
              >
                <div className="text-4xl font-bold text-purple mb-3">
                  {card.stat}
                </div>
                <p className="text-sm font-medium text-brand-black/75">
                  {card.bodyText}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
