import type { Metadata } from "next";
import "@/app/[locale]/globals.css";

export const metadata: Metadata = {
  title: "Donations | Human Relief Mission",
  description: "Donations for Human Relief Mission",
};

export default function DatabaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Rubik+Dirt&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="donations-layout">
          {children}
        </div>
      </body>
    </html>
  );
}
