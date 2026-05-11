import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Human Relief Mission | Studio",
  description: "Sanity Studio for Human Relief Mission",
};

export default function StudioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
