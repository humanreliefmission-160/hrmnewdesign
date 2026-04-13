"use client";

import ProjectsPageHeader from "../../components/ProjectsPageHeader";

export default function ProjectItem() {
  return (
    <>
      <ProjectsPageHeader
        title="Projects Name"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat semper feugiat. Lorem ipsum dolor."
        breadcrumb="HOME"
        display={true}
        image="/img-placeholder.JPG"
      />

      <section className="px-4 md:px-8 py-12">
        <div className="max-w-[1140px] mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-body leading-tight">
            CARRY ON FROM HERE
          </h1>
        </div>
      </section>

    </>
  );
}
