import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { ImWhatsapp } from "react-icons/im";
import { sanityFetch } from "../../lib/sanity/client";

// ── GROQ Query ─────────────────────────────────────────────────────────────────────

const FOOTER_NAV_QUERY = `
  *[_type == "footerNavigation"][0] {
    footerColumns[] {
      columnTitle,
      links[] {
        label,
        linkType,
        internalLink,
        externalLink,
        isExternal
      }
    }
  }
`;

// ── Types ─────────────────────────────────────────────────────────────────────

interface FooterLink {
  label: string;
  linkType: "internal" | "external";
  internalLink?: string;
  externalLink?: string;
  isExternal?: boolean;
}

interface FooterColumn {
  columnTitle: string;
  links?: FooterLink[];
}

interface FooterProps { }

function resolveHref(link: FooterLink): string {
  return link.linkType === "external"
    ? (link.externalLink ?? "#")
    : (link.internalLink ?? "#");
}

export default async function Footer() {
  const footerNav = await sanityFetch<any>(FOOTER_NAV_QUERY);
  const footerColumns: FooterColumn[] = footerNav?.footerColumns ?? [];
  return (
    <footer className="bg-purple text-brand-white/70 py-16 px-4 md:px-8">
      <div className="max-w-285 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 py-12 border-b border-brand-white/10">
        <div>
          <div>
            <Link href="/" >
              <Image src="/hhtw.svg" alt="Helping Humanity Through Welfare" width={200} height={200} className="w-48 h-auto " />
            </Link>
            <div className="text-[0.875rem] leading-[1.7] my-6">
              Delivering emergency relief, education, and sustainable development
              aid to communities in need across the world since 2016.
            </div>
          </div>
          <div className="flex gap-3">
            <Link href={`${process.env.FACEBOOK_LINK}`} className="w-10 h-10 p-3 bg-brand-white/10 rounded-full flex items-center justify-center text-brand-white text-[0.8rem] cursor-pointer transition-colors hover:bg-purple-light no-underline"
              aria-label="Human Relief Mission on Facebook"
              target="_blank"
              rel="noopener noreferrer">
              <FaFacebookF fill="#f5f5f5" size={18} />
            </Link>

            <Link href={`${process.env.LINKEDIN_LINK}`} className="w-10 h-10 p-3 bg-brand-white/10 rounded-full flex items-center justify-center text-brand-white text-[0.8rem] cursor-pointer transition-colors hover:bg-purple-light no-underline"
              aria-label="Human Relief Mission on Linkedin"
              target="_blank"
              rel="noopener noreferrer">
              <FaLinkedinIn fill="#F5F5F5" size={18} />
            </Link>

            <Link href={`${process.env.YOUTUBE_LINK}`} className="w-10 h-10 p-3 bg-brand-white/10 rounded-full flex items-center justify-center text-brand-white text-[0.8rem] cursor-pointer transition-colors hover:bg-purple-light no-underline"
              aria-label="Human Relief Mission on YouTube"
              target="_blank"
              rel="noopener noreferrer">
              <FaYoutube fill="#F5F5F5" size={18} />
            </Link>

            <Link href={`${process.env.X_LINK}`} className="w-10 h-10 p-3 bg-brand-white/10 rounded-full flex items-center justify-center text-brand-white text-[0.8rem] cursor-pointer transition-colors hover:bg-purple-light no-underline"
              aria-label="Human Relief Mission on X (Formally Twitter)"
              target="_blank"
              rel="noopener noreferrer">
              <FaXTwitter fill="#F5F5F5" size={18} />
            </Link>

            <Link href={`${process.env.INSTAGRAM_LINK}`} className="w-10 h-10 p-3 bg-brand-white/10 rounded-full flex items-center justify-center text-brand-white text-[0.8rem] cursor-pointer transition-colors hover:bg-purple-light no-underline"
              aria-label="Human Relief Mission on Instagram"
              target="_blank"
              rel="noopener noreferrer">
              <BiLogoInstagramAlt fill="#F5F5F5" size={18} />
            </Link>

            <Link href={`${process.env.WHATSAPP_LINK}`} className="w-10 h-10 p-3 bg-brand-white/10 rounded-full flex items-center justify-center text-brand-white text-[0.8rem] cursor-pointer transition-colors hover:bg-purple-light no-underline"
              aria-label="Human Relief Mission on WhatsApp"
              target="_blank"
              rel="noopener noreferrer">
              <ImWhatsapp fill="#F5F5F5" size={18} />
            </Link>
          </div>
        </div>
        {footerColumns.map((col, colIdx) => (
          <div key={colIdx}>
            <div className="text-brand-white font-bold text-[0.875rem] tracking-widest uppercase mb-6">
              {col.columnTitle}
            </div>
            {col.links && col.links.length > 0 && (
              <ul className="list-none flex flex-col gap-2.5">
                {col.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      href={resolveHref(link)}
                      target={link.isExternal ? "_blank" : undefined}
                      rel={link.isExternal ? "noopener noreferrer" : undefined}
                      className="text-[0.875rem] text-brand-white/60 no-underline cursor-pointer transition-colors hover:text-brand-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      <div className="max-w-285 mx-auto pt-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-[0.8rem] text-brand-white">Copyright &copy; Human Relief Mission 2026. All Rights Reserved</p>
          <p className="text-[0.8rem] text-brand-white opacity-80">Charity No. 1160380</p>
          <div className="max-w-285 mx-auto pt-2 text-[0.6rem] text-brand-white/40 italic">
            Developed by {""}
            <Link href="https://buildingblocks.digital" className="text-white underline cursor-pointer transition-colors duration-200">Building Blocks</Link>
          </div>
        </div>
        <Image src="/donation-policy-icon.svg" alt="Helping Box" width={75} height={75} loading="lazy" />
      </div>
    </footer>
  );
}

