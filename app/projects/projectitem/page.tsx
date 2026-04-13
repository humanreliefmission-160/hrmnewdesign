"use client";

import ProjectsPageHeader from "../../components/ProjectsPageHeader";

export default function ProjectItem() {
  return (
    <>
      <ProjectsPageHeader
        title="Projects Name"
        subtitle={<>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat semper feugiat. Lorem ipsum dolor.</>}
        breadcrumb="HOME"
        display={true}
        image="/img-placeholder.JPG"
      />

      <h1>CARRY ON FROM HERE</h1>

    </>
  );
}
