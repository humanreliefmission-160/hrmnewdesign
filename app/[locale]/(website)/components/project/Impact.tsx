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

  const cardCount = data.impactCards?.length ?? 0;
  const gridCols =
    cardCount === 1
      ? "max-w-md mx-auto"
      : cardCount === 2
        ? "grid grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto"
        : cardCount === 3
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          : cardCount % 3 === 0
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

  return (
    <section className="bg-brand-white py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-285 mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-purple/10 text-purple text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-sm mb-3">
            Impact
          </span>
          {data.title && (
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
              {data.title}
            </h2>
          )}
          {data.bodyText && (
            <div className="text-brand-black/75 mx-auto text-base leading-relaxed portable-text">
              <PortableText value={data.bodyText} />
            </div>
          )}
        </div>

        {data.impactCards && data.impactCards.length > 0 && (
          <div className={`${gridCols} gap-6 mt-10`}>
            {data.impactCards.map((card, idx) => (
              <div
                key={card._key || `impact-card-${idx}`}
                className="bg-white rounded-sm p-6 flex flex-col items-center text-center align-middle shadow-card hover:-translate-y-1 transition-all duration-300 border border-gray-100"
              >
                <div className="text-3xl sm:text-4xl font-bold text-purple mb-3">
                  {card.stat}
                </div>
                <p className="text-sm font-medium text-brand-black/75 leading-relaxed">
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
