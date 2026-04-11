"use client";

import PageHeader from "../../components/PageHeader";

export default function ProjectItem() {
  return (
    <>
      <PageHeader
        title="Project Item"
        subtitle={<>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat semper feugiat. Lorem ipsum dolor.</>}
        breadcrumb="Projects"
        display={true}
      />

      <h1>CARRY ON FROM HERE</h1>

    </>
  );
}
