import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Human Relief Mission",
  description: "Helping Humanity Through Welfare",
};

export default function StudioLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
}
