import Link from "next/link";
import YellowCTA from "./YellowCTA";
import { urlFor } from "@/sanity/lib/image";

interface Project {
  _id: string;
  name: string;
  slug: string;
  cardSummary?: string;
  headerImage?: any;
  category?: string;
}

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <section className="py-20 px-4 md:px-8 bg-brand-white">
      <div className="max-w-[1140px] mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
          <div>
            <div className="inline-block bg-purple-faint text-purple font-bold text-[0.75rem] tracking-widest uppercase px-4 py-1.5 mb-4">How To Help</div>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-black mb-[1.2rem]">Our Projects</h2>
            <p className="text-[1.05rem] text-brand-grey leading-[1.7] max-w-[600px]">
              From emergency food aid to long term education, our projects create lasting change.
            </p>
          </div>
          <YellowCTA text="Support a Project" href="/donate" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {projects && projects.length > 0 ? (
            projects.map((project) => {
              const headerImageUrl = project.headerImage?.asset
                ? urlFor(project.headerImage.asset).url()
                : "/img-placeholder.JPG";

              return (
                <div 
                  key={project._id} 
                  className="bg-brand-white rounded-sm overflow-hidden shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover group flex flex-col h-full justify-between"
                >
                  <div>
                    <div className="aspect-4/3 relative overflow-hidden">
                      <Link href={`/projects/${project.slug}`}>
                        <img 
                          src={headerImageUrl} 
                          alt={project.name} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                      </Link>
                      {project.category && (
                        <Link 
                          href={`/projects/${project.slug}`} 
                          className="absolute bottom-0 left-0 right-0 bg-purple text-brand-white font-bold text-[0.8rem] tracking-widest uppercase py-2.5 px-6 no-underline"
                        >
                          {project.category}
                        </Link>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-[1.1rem] text-brand-black mb-2.5">
                        <Link href={`/projects/${project.slug}`} className="hover:text-purple transition-colors">
                          {project.name}
                        </Link>
                      </h3>
                      {project.cardSummary && (
                        <p className="text-[0.875rem] text-brand-grey leading-[1.6]">
                          {project.cardSummary}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <div className="flex justify-between items-center pt-4 border-t border-brand-lgrey">
                      <YellowCTA text="Find out more" href={`/projects/${project.slug}`} />
                      <Link href={`/projects/${project.slug}`} className="text-purple font-bold text-sm underline hover:text-purple-dark">
                        Donate Now
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12 text-brand-grey">
              No projects found.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
