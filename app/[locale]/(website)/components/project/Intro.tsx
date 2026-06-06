import { PortableText } from "next-sanity";

interface Stat {
  title: string;
  subtext: string;
}

interface IntroData {
  sectionTag?: string;
  title?: string;
  bodyText?: any[];
  stats?: Stat[];
}

export default function Intro({ data }: { data?: IntroData }) {
  if (!data) return null;

  return (
    <section className="pt-16 pb-0 sm:py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto text-center">
        {data.sectionTag && (
          <span className="inline-block bg-purple/10 text-purple text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-sm mb-4">
            {data.sectionTag}
          </span>
        )}
        {data.title && (
          <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-6 leading-tight">
            {data.title}
          </h2>
        )}
        {data.bodyText && (
          <div className="text-brand-black text-base leading-relaxed max-w-2xl mx-auto space-y-4">
            <PortableText value={data.bodyText} />
          </div>
        )}
        {data.stats && (
          <div className="mt-10 flex flex-row gap-6 align-middle justify-center">
            {data.stats.map((stat, idx) => (
              <div key={idx} className="bg-purple/5 rounded-sm py-6 px-4 border border-purple-100 flex flex-col items-center justify-center">
                <p className="text-2xl font-bold text-purple sm:text-3xl">{stat.title}</p>
                <p className="text-sm text-brand-black mt-1 font-medium">{stat.subtext}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
