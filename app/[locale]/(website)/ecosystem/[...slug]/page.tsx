import { notFound } from "next/navigation";
import { ecosystemStages, allStages } from "../../components/ecosystem/data/ecosystemData";
import Link from "next/link";
import FAQSection from "../../components/ecosystem/sections/ecosystempage/FAQSection";
import ProjectsPageHeader from "../../components/ProjectsPageHeader";
import IntroSection from "../../components/ecosystem/sections/ecosystempage/IntroSection";
import CaseStudySection from "../../components/ecosystem/sections/ecosystempage/CaseStudySection";
import DonateSection from "../../components/ecosystem/sections/ecosystempage/DonateSection";
import Image from "next/image";
import StageNavigation from "../../components/ecosystem/sections/ecosystempage/StageNavigation";

export async function generateStaticParams() {
  return ecosystemStages.map((stage) => ({
    slug: [stage.slug],
  }));
}

export default async function Ecosystem({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug[0];

  const stage = ecosystemStages.find((s) => s.slug === slug);

  if (!stage) {
    notFound();
  }

  const currentIndex = allStages.findIndex((s) => s.slug === slug);
  const prevStage = currentIndex > 0 ? allStages[currentIndex - 1] : null;
  const nextStage = currentIndex < allStages.length - 1 ? allStages[currentIndex + 1] : null;

  return (
    <>
      {/* Hero */}
      <ProjectsPageHeader
        title={stage.name}
        subtitle={stage.shortDescription}
        breadcrumb="ECOSYSTEM"
        display={true}
        image={stage.heroImage || "/img-placeholder.JPG"}
      />

      <section>
        <div className="mx-auto">
          {/* Intro */}
          <IntroSection stage={stage} />

          {/* Case Study */}
          <CaseStudySection stage={stage} />

          {/* How to Donate */}
          <DonateSection stage={stage} />

          {/* FAQ */}
          <FAQSection stage={stage} />

          <StageNavigation stage={stage} />

        </div>
      </section>
    </>
  );
}

