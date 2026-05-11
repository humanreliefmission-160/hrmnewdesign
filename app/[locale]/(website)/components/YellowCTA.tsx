import Link from "next/link";
import React from "react";

interface YellowCTAProps {
  text: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const YellowCTA: React.FC<YellowCTAProps> = ({ text, href, onClick, className = "", disabled = false }) => {
  const baseClasses = `inline-flex items-center gap-2 font-bold text-[1rem] cursor-pointer transition-all duration-200 no-underline px-5 pt-3 pb-2 bg-yellow text-brand-black [clip-path:polygon(0_0,100%_13.5%,100%_100%,0_100%)] hover:bg-yellow-hover hover:-translate-y-0.5 hover:shadow-btn disabled:opacity-70 disabled:cursor-not-allowed text-base md:text-lg py-4 ${className}`;

  if (href && !disabled) {
    return (
      <Link href={href} className={baseClasses} onClick={onClick}>
        {text}
      </Link>
    );
  }

  return (
    <button className={baseClasses} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default YellowCTA;
