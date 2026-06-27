import { sanityFetch } from "@/app/[locale]/lib/sanity/client";
import DynamicIcon from "./DynamicIcon";
import YellowCTA from "./YellowCTA";

const HOMEPAGE_IMPACT_QUERY = `
  *[_type == "aboutUs"][0] {
    impactSection {
      title,
      items[] {
        icon,
        figure,
        description
      }
    }
  }
`;

const defaultItems = [
  { icon: "FaUtensils", figure: "500M", description: "Hot Meals Served" },
  { icon: "BiSolidBackpack", figure: "50K+", description: "Student Bags Delivered" },
  { icon: "GiWaterDrop", figure: "200K", description: "Families with Clean Water" },
  { icon: "FaBriefcaseMedical", figure: "150K", description: "Medical Treatments Given" },
];

export default async function Impact() {
  const data = await sanityFetch<any>(HOMEPAGE_IMPACT_QUERY);
  const impactData = data?.impactSection;

  const items = impactData?.items?.length ? impactData.items : defaultItems;
  const sectionTitle = impactData?.title || "Our Track Record";

  return (
    <section className="py-20 px-4 md:px-8 bg-brand-white">
      <div className="max-w-[1140px] mx-auto">
        <div className="inline-block bg-purple-faint text-purple font-bold text-[0.75rem] tracking-widest uppercase px-4 py-1.5 mb-4">
          {sectionTitle}
        </div>
        <div className="mb-4">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-black capitalize">
            This is how we&apos;ve made a difference{" "}
            <span className="font-medium italic text-2xl text-brand-grey">so far.</span>
          </h2>
        </div>
        <p className="text-[1.05rem] text-brand-grey leading-[1.7] max-w-[600px]">
          Every pound donated creates real, measurable change in the lives of
          people who need it most.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {items.map((item: any, idx: number) => (
            <div
              key={idx}
              className="bg-brand-white rounded-sm p-8 text-center shadow-card hover:-translate-y-1 transition-transform duration-300 flex flex-col items-center justify-between gap-3"
            >
              <div className="h-24 flex items-center justify-center">
                <DynamicIcon name={item.icon} size={90} fill="#650199" />
              </div>
              <div>
                <div className="text-[2.2rem] font-bold text-purple leading-none">{item.figure}</div>
                <div className="text-[0.875rem] text-brand-grey font-medium">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <YellowCTA text="Donate Now" href="/donate" />
        </div>
      </div>
    </section>
  );
}