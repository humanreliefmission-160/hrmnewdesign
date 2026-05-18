import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { ImWhatsapp } from "react-icons/im";

export default function Footer() {
  return (
    <footer className="bg-purple text-brand-white/70 py-16 px-4 md:px-8">
      <div className="max-w-[1140px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 py-12 border-b border-brand-white/10">
        <div>
          <div>
            <Link href="/" >
              <Image src="/hhtw.svg" alt="Helping Humanity Through Welfare" width={200} height={200} />
            </Link>
            <div className="text-[0.875rem] leading-[1.7] my-6">
              Delivering emergency relief, education, and sustainable development
              aid to communities in need across the world since 2016.
            </div>
          </div>
          <div className="flex gap-3">
            <Link href={`${process.env.FACEBOOK_LINK}`} className="w-10 h-10 p-3 bg-brand-white/10 rounded-full flex items-center justify-center text-brand-white text-[0.8rem] cursor-pointer transition-colors hover:bg-purple-light no-underline">
              <FaFacebookF fill="#f5f5f5" size={18} />
            </Link>
            <Link href={`${process.env.LINKEDIN_LINK}`} className="w-10 h-10 p-3 bg-brand-white/10 rounded-full flex items-center justify-center text-brand-white text-[0.8rem] cursor-pointer transition-colors hover:bg-purple-light no-underline">
              <FaLinkedinIn fill="#F5F5F5" size={18} />
            </Link>
            <Link href={`${process.env.YOUTUBE_LINK}`} className="w-10 h-10 p-3 bg-brand-white/10 rounded-full flex items-center justify-center text-brand-white text-[0.8rem] cursor-pointer transition-colors hover:bg-purple-light no-underline">
              <FaYoutube fill="#F5F5F5" size={18} />
            </Link>
            <Link href={`${process.env.X_LINK}`} className="w-10 h-10 p-3 bg-brand-white/10 rounded-full flex items-center justify-center text-brand-white text-[0.8rem] cursor-pointer transition-colors hover:bg-purple-light no-underline">
              <FaXTwitter fill="#F5F5F5" size={18} />
            </Link>
            <Link href={`${process.env.INSTAGRAM_LINK}`} className="w-10 h-10 p-3 bg-brand-white/10 rounded-full flex items-center justify-center text-brand-white text-[0.8rem] cursor-pointer transition-colors hover:bg-purple-light no-underline">
              <BiLogoInstagramAlt fill="#F5F5F5" size={18} />
            </Link>
            <Link href={`${process.env.WHATSAPP_LINK}`} className="w-10 h-10 p-3 bg-brand-white/10 rounded-full flex items-center justify-center text-brand-white text-[0.8rem] cursor-pointer transition-colors hover:bg-purple-light no-underline">
              <ImWhatsapp fill="#F5F5F5" size={18} />
            </Link>
          </div>
        </div>
        <div>
          <div className="text-brand-white font-bold text-[0.875rem] tracking-widest uppercase mb-6">Quick Links</div>
          <ul className="list-none flex flex-col gap-2.5">
            <li>
              <Link href="/about" className="text-[0.875rem] text-brand-white/60 no-underline cursor-pointer transition-colors hover:text-brand-white">About Us</Link>
            </li>
            <li>
              <Link href="/" className="text-[0.875rem] text-brand-white/60 no-underline cursor-pointer transition-colors hover:text-brand-white">Projects</Link>
            </li>
            <li>
              <Link href="/" className="text-[0.875rem] text-brand-white/60 no-underline cursor-pointer transition-colors hover:text-brand-white">Locations</Link>
            </li>
            <li>
              <Link href="/contact" className="text-[0.875rem] text-brand-white/60 no-underline cursor-pointer transition-colors hover:text-brand-white">Contact Us</Link>
            </li>
            <li>
              <Link href="/donate" className="text-[0.875rem] text-brand-white/60 no-underline cursor-pointer transition-colors hover:text-brand-white">Donate</Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-brand-white font-bold text-[0.875rem] tracking-widest uppercase mb-6">Our Work</div>
          <ul className="list-none flex flex-col gap-2.5">
            <li>
              <Link href="/" className="text-[0.875rem] text-brand-white/60 no-underline cursor-pointer transition-colors hover:text-brand-white">Food Relief</Link>
            </li>
            <li>
              <Link href="/" className="text-[0.875rem] text-brand-white/60 no-underline cursor-pointer transition-colors hover:text-brand-white">Education</Link>
            </li>
            <li>
              <Link href="/" className="text-[0.875rem] text-brand-white/60 no-underline cursor-pointer transition-colors hover:text-brand-white">Water & Sanitation</Link>
            </li>
            <li>
              <Link href="/" className="text-[0.875rem] text-brand-white/60 no-underline cursor-pointer transition-colors hover:text-brand-white">Emergency Aid</Link>
            </li>
            <li>
              <Link href="/" className="text-[0.875rem] text-brand-white/60 no-underline cursor-pointer transition-colors hover:text-brand-white">Orphan Support</Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-brand-white font-bold text-[0.875rem] tracking-widest uppercase mb-6">Giving</div>
          <ul className="list-none flex flex-col gap-2.5">
            <li>
              <Link href="/donate" className="text-[0.875rem] text-brand-white/60 no-underline cursor-pointer transition-colors hover:text-brand-white">One-Off Donation</Link>
            </li>
            <li>
              <Link href="/donate" className="text-[0.875rem] text-brand-white/60 no-underline cursor-pointer transition-colors hover:text-brand-white">Monthly Giving</Link>
            </li>
            <li>
              <Link href="/donate" className="text-[0.875rem] text-brand-white/60 no-underline cursor-pointer transition-colors hover:text-brand-white">Zakat</Link>
            </li>
            <li>
              <Link href="/donate" className="text-[0.875rem] text-brand-white/60 no-underline cursor-pointer transition-colors hover:text-brand-white">Sadaqah</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-[1140px] mx-auto pt-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-[0.8rem] text-brand-white">Copyright &copy; Human Relief Mission 2026.<br />All Rights Reserved</p>
          <p className="text-[0.8rem] text-brand-white opacity-80">Charity No. 1160380</p>
          <div className="max-w-[1140px] mx-auto pt-2 text-[0.6rem] text-brand-white/40 italic">
            Developed by {""}
            <Link href="http://buildingblocks.digital" className="hover:underline cursor-pointer">Building Blocks</Link>
          </div>
        </div>
        <Image src="/donation-policy-icon.svg" alt="Helping Box" width={75} height={75} loading="eager" />
      </div>
    </footer>
  );
}

