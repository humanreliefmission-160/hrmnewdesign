import { sanityFetch } from "../../lib/sanity/client";
import Navbar from "./Navbar";

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

export default async function NavbarWrapper() {
  const headerNav = await sanityFetch<any>(HEADER_NAV_QUERY);

  return <Navbar navItems={headerNav?.navItems ?? []} />;
}
