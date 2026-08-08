import type { Metadata } from "next";
import { sanityFetch } from "../../lib/sanity/client";
import { urlFor } from "@/sanity/lib/image";
import PageHeader from "../components/PageHeader";
import YellowCTA from "../components/YellowCTA";
import Link from "next/link";
import JsonLd from "../components/JsonLd";
import { BASE_URL, buildItemList, buildBreadcrumb } from "../lib/jsonld";

export const metadata: Metadata = {
  title: "Our Projects | Human Relief Mission",
  description:
    "Explore active humanitarian projects including emergency aid, food packages, clean water wells, healthcare and education.",
  alternates: {
    canonical: `${BASE_URL}/projects`,
  },
  openGraph: {
    title: "Our Projects | Human Relief Mission",
    description:
      "Explore active humanitarian projects including emergency aid, food packages, clean water wells, healthcare and education.",
    url: `${BASE_URL}/projects`,
    siteName: "Human Relief Mission",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Projects | Human Relief Mission",
    description:
      "Explore active humanitarian projects run by Human Relief Mission.",
  },
};

export const revalidate = 60;

// Fetch all projects that have at least one donation item
const PROJECTS_WITH_ITEMS_QUERY = `
  *[_type == "project" && defined(slug.current) && count(donationSection.donationItems) > 0] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    headerImage,
    "donationItems": donationSection.donationItems[] {
      _key,
      itemTitle,
      itemSubtext,
      "slug": slug.current,
      price,
      cardImage,
      images[] {
        asset,
        altText
      }
    }
  }
`;

type DonationItem = {
  _key: string;
  itemTitle: string;
  itemSubtext?: string;
  slug: string;
  price?: number;
  cardImage?: any;
  images?: Array<{
    asset: any;
    altText: string;
  }>;
};

type Project = {
  _id: string;
  name: string;
  slug: string;
  headerImage?: any;
  donationItems: DonationItem[];
};

export default async function ProjectsPage() {
  const projects: Project[] = await sanityFetch(PROJECTS_WITH_ITEMS_QUERY);

  return (
    <div id="page-projects" className="block min-h-screen">
      <JsonLd data={[
        buildItemList((projects || []).map((p) => ({ name: p.name, url: `${BASE_URL}/projects/${p.slug}` }))),
        buildBreadcrumb([{ name: "Home", url: BASE_URL }, { name: "Projects", url: `${BASE_URL}/projects` }]),
      ]} />
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
        <div className="max-w-285 mx-auto">
          {/* Projects */}
          {!projects || projects.length === 0 ? (
            <p className="text-brand-grey text-center py-20">
              No projects found. Check back soon.
            </p>
          ) : (
            projects.map((project, projIdx) => (
              <div key={project._id}>
                {/* Project Header (links to project detail page) */}
                <div className="mb-4">
                  <Link href={`/projects/${project.slug}`}>
                    <h2 className="text-4xl md:text-5xl font-bold text-brand-black mb-3 hover:text-purple transition-colors cursor-pointer inline-block">
                      {project.name}
                    </h2>
                  </Link>
                </div>

                {/* Donation Item Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                  {(project.donationItems || []).map((item) => {
                    // Safe image resolution: card image -> first gallery image -> project header image -> placeholder
                    let imageUrl = "/img-placeholder.JPG";

                    if (item.cardImage && item.cardImage.asset && item.cardImage.asset._ref) {
                      imageUrl = urlFor(item.cardImage.asset).width(600).height(450).fit("crop").auto("format").quality(80).url();
                    } else if (item.images?.[0] && item.images[0].asset && item.images[0].asset._ref) {
                      imageUrl = urlFor(item.images[0].asset).width(600).height(450).fit("crop").auto("format").quality(80).url();
                    } else if (project.headerImage && project.headerImage.asset && project.headerImage.asset._ref) {
                      imageUrl = urlFor(project.headerImage).width(600).height(450).fit("crop").auto("format").quality(80).url();
                    }

                    const itemUrl = `/projects/${project.slug}/${item.slug}`;

                    return (
                      <div
                        key={item._key}
                        className="bg-brand-white rounded-sm overflow-hidden shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover group"
                      >
                        <Link href={itemUrl}>
                          <div className="aspect-4/3 relative overflow-hidden cursor-pointer">
                            <img
                              src={imageUrl}
                              alt={item.itemTitle}
                              loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            {/* <span className="absolute bottom-0 left-0 right-0 bg-purple text-brand-white font-bold text-[0.8rem] tracking-widest uppercase py-2.5 px-6">
                              {project.name}
                            </span> */}
                          </div>
                        </Link>
                        <div className="p-6">
                          <Link href={itemUrl}>
                            <h3 className="font-bold text-[1.1rem] text-brand-black mb-2.5 hover:text-purple transition-colors cursor-pointer">
                              {item.itemTitle}
                            </h3>
                          </Link>
                          {item.itemSubtext && (
                            <p className="text-[0.875rem] text-brand-grey leading-[1.6] mb-4 line-clamp-3">
                              {item.itemSubtext}
                            </p>
                          )}
                          <div className="flex justify-between items-center mt-6 pt-4 border-t border-brand-lgrey">
                            <YellowCTA
                              text="Find out more"
                              href={itemUrl}
                            />
                            <Link
                              href={itemUrl}
                              className="text-purple font-bold text-sm underline hover:text-brand-grey"
                            >
                              Donate Now
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Divider between projects, not after the last one */}
                {projIdx < projects.length - 1 && (
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
