import { sanityFetch } from "../../lib/sanity/client";
import Navbar from "./Navbar";

// ── GROQ Queries ──────────────────────────────────────────────────────────────

const HEADER_NAV_QUERY = `
  *[_type == "headerNavigation"][0] {
    navItems[] {
      label,
      linkType,
      internalLink,
      externalLink,
      isExternal,
      subItems[] {
        label,
        linkType,
        internalLink,
        externalLink,
        isExternal
      }
    }
  }
`;

const PROJECT_CATEGORIES_QUERY = `
  *[_type == "projectCategory"] {
    _id,
    name,
    "projects": *[_type == "project" && references(^._id)] | order(name asc) {
      name,
      "slug": slug.current,
      "donationItems": donationSection.donationItems[] {
        "slug": slug.current,
        itemTitle
      }
    }
  }
`;

// ── Component ─────────────────────────────────────────────────────────────────

export default async function NavbarWrapper() {
  const [headerNav, projectCategories] = await Promise.all([
    sanityFetch<any>(HEADER_NAV_QUERY),
    sanityFetch<any[]>(PROJECT_CATEGORIES_QUERY),
  ]);

  return (
    <Navbar
      navItems={headerNav?.navItems ?? []}
      projectCategories={projectCategories ?? []}
    />
  );
}
