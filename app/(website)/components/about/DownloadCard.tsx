import YellowCTA from "../YellowCTA";

interface DownloadCardProps {
  title: string;
  subtext?: string;
  buttonLabel?: string;
  href?: string;
  size?: "sm" | "md";
}

export default function DownloadCard({
  title,
  subtext,
  buttonLabel = "Download",
  href = "#",
  size = "md",
}: DownloadCardProps) {
  return (
    <div className={`bg-white rounded-sm flex flex-col justify-between ${size === "sm" ? "p-4 min-h-[120px]" : "p-5 min-h-[160px] "} gap-`}
    >
      {/* Title */}
      <h3 className={`font-bold text-brand-black leading-tight ${size === "sm" ? "text-2xl" : "text-2xl"}`}>
        {title}
      </h3>

      {/* Subtext */}
      {subtext && (
        <p className="text-sm text-brand-black/75 mt-2 mb-1">
          {subtext}
        </p>
      )}

      {/* Spacer to push button down */}
      <div className="mt-1" />

      <div>
        {/* Button */}
        <YellowCTA
          text={buttonLabel}
          href={href}
        />
      </div>
    </div>
  );
}
