import type { Metadata } from "next";
import ContactClient from "./ContactClient";
import JsonLd from "../components/JsonLd";
import { BASE_URL, buildContactPage, buildBreadcrumb } from "../lib/jsonld";

export const metadata: Metadata = {
  title: "Contact Us | Human Relief Mission",
  description:
    "Get in touch with Human Relief Mission. Have a question, donation enquiry, or volunteer application? Contact our team in Leeds, UK.",
  alternates: {
    canonical: `${BASE_URL}/contact`,
  },
  openGraph: {
    title: "Contact Us | Human Relief Mission",
    description:
      "Get in touch with Human Relief Mission. Have a question, donation enquiry, or volunteer application? Contact our team in Leeds, UK.",
    url: `${BASE_URL}/contact`,
    siteName: "Human Relief Mission",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Human Relief Mission",
    description: "Get in touch with our team in Leeds, UK.",
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          buildContactPage(),
          buildBreadcrumb([
            { name: "Home", url: BASE_URL },
            { name: "Contact", url: `${BASE_URL}/contact` },
          ]),
        ]}
      />
      <ContactClient />
    </>
  );
}
