import BottomCTA from "../components/ecosystem/sections/BottomCTA";
import StagesCard from "../components/ecosystem/sections/StagesCard";
import PageHeader from "../components/PageHeader";
import { sanityFetch } from "@/app/[locale]/lib/sanity/client";

const STAGES_QUERY = `
  *[_type == "ecosystemStage" && defined(slug.current)] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    order,
    stageNumber,
    stageName,
    cardImage {
      asset-> {
        _id,
        url
      }
    },
    cardDescription
  }
`;

export default async function Ecosystem() {
  const stages = await sanityFetch<any[]>(STAGES_QUERY);

  return (
    <>
      <PageHeader
        title="From Receiving Zakat to Paying Zakat"
        subtitle="Our 4 phase ecosystem lifts the needy out of poverty, providing Essentials, building Stability, enabling Development and creating Sustainability so every recipient becomes a contributor."
        breadcrumb="ECOSYSTEM"
        display={true}
      />

      <section>
        <div className="mx-auto">
          <StagesCard stages={stages} />
          <BottomCTA stages={stages} />
        </div>
      </section>
    </>
  );
}
