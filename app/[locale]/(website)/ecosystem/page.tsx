"use client";

import BottomCTA from "../components/ecosystem/sections/BottomCTA";
import StagesCard from "../components/ecosystem/sections/StagesCard";
import ProjectsPageHeader from "../components/ProjectsPageHeader";

export default function Ecosystem() {
  return (
    <>
      <ProjectsPageHeader
        title={
          <>
            From <span className="text-brand-yellow">Receiving</span> Zakat to <span className="text-brand-yellow">Paying</span> Zakat
          </>
        }
        subtitle="Our 4 phase ecosystem lifts the needy out of poverty, providing Essentials, building Stability, enabling Development and creating Sustainability so every recipient becomes a contributor."
        breadcrumb="ECOSYSTEM"
        display={true}
        image="/img-placeholder.JPG"
      />

      <section>
        <div className="mx-auto">
          <StagesCard />
          <BottomCTA />
        </div>
      </section>
    </>
  );
}
