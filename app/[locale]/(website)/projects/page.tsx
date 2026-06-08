import { sanityFetch } from "../../lib/sanity/client";
import { urlFor } from "@/sanity/lib/image";
import PageHeader from "../components/PageHeader";
import YellowCTA from "../components/YellowCTA";
import Link from "next/link";
import { YouTubeEmbed } from "@next/third-parties/google";
import ProjectPageVideo from "../components/project/ProjectPageVideo";

export const revalidate = 60;

// Fetch all project categories that have at least one project,
// grouped so we can render a section per category.
const PROJECTS_BY_CATEGORY_QUERY = `
  *[_type == "projectCategory"] | order(name asc) {
    _id,
    name,
    "projects": *[_type == "project" && references(^._id)] | order(name asc) {
      _id,
      name,
      tagline,
      cardSummary,
      "slug": slug.current,
      headerImage
    }
  }
`;

type Project = {
  _id: string;
  name: string;
  tagline?: string;
  cardSummary?: string;
  slug: string;
  headerImage?: any;
};

type ProjectCategory = {
  _id: string;
  name: string;
  projects: Project[];
};

export default async function ProjectsPage() {
  const categories: ProjectCategory[] = await sanityFetch(PROJECTS_BY_CATEGORY_QUERY);

  // Filter out categories with no projects
  const populatedCategories = (categories ?? []).filter(
    (cat) => cat.projects && cat.projects.length > 0
  );

  return (
    <div id="page-projects" className="block min-h-screen">
      <PageHeader
        title="Projects"
        subtitle={
          <>
            Explore our work across food aid, healthcare, education, water and
            more. Every project is a step toward lasting change.
          </>
        }
        breadcrumb="Projects"
        display={true}
      />

      {/* <ProjectPageVideo /> */}

      <section className="py-20 px-4 md:px-8 bg-brand-white">

        <div className="max-w-[1140px] mx-auto">
          {/* Projects */}
          {populatedCategories.length === 0 ? (
            <p className="text-brand-grey text-center py-20">
              No projects found. Check back soon.
            </p>
          ) : (
            populatedCategories.map((category, catIdx) => (
              <div key={category._id}>
                {/* Category Header */}
                <div className="mb-4">
                  <h2 className="text-4xl md:text-5xl font-bold text-brand-black mb-3">
                    {category.name}
                  </h2>
                </div>

                {/* Project Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                  {category.projects.map((project) => {
                    const imageUrl = project.headerImage?.asset
                      ? urlFor(project.headerImage).width(600).height(450).fit("crop").url()
                      : "/img-placeholder.JPG";

                    return (
                      <div
                        key={project._id}
                        className="bg-brand-white rounded-sm overflow-hidden shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover group"
                      >
                        <div className="aspect-4/3 relative overflow-hidden">
                          <img
                            src={imageUrl}
                            alt={project.name}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <span className="absolute bottom-0 left-0 right-0 bg-purple text-brand-white font-bold text-[0.8rem] tracking-widest uppercase py-2.5 px-6">
                            {category.name}
                          </span>
                        </div>
                        <div className="p-6">
                          <h3 className="font-bold text-[1.1rem] text-brand-black mb-2.5">
                            {project.name}
                          </h3>
                          {project.cardSummary && (
                            <p className="text-[0.875rem] text-brand-grey leading-[1.6] mb-4">
                              {project.cardSummary}
                            </p>
                          )}
                          <div className="flex justify-between items-center mt-6 pt-4 border-t border-brand-lgrey">
                            <YellowCTA
                              text="Find out more"
                              href={`/projects/${project.slug}`}
                            />
                            <Link
                              href="/donate"
                              className="text-brand-black font-bold text-sm underline hover:text-brand-grey"
                            >
                              Donate Now
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Divider between categories, not after the last one */}
                {catIdx < populatedCategories.length - 1 && (
                  <hr className="my-12 h-px border-t-0 bg-transparent bg-linear-to-r from-transparent via-purple/30 to-transparent" />
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
