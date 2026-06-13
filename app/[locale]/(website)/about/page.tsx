import Hero from "../components/about/ecosystem/Hero";
import WhoWeAre from "../components/about/WhoWeAre";
import Impact from "../components/about/Impact";
import Values from "../components/about/values";
import FinalCTA from "../components/FinalCTA";
import PoliciesReports from "../components/about/PoliciesReports";
import FundingDiagram from "../components/about/donationpolicy/FundingDiagram";
import DonationPolicySection from "../components/about/donationpolicy/DonationPolicy";

export default function About() {
  return (
    <div id="page-about" className="block mt-8 sm:mt-24">
      <WhoWeAre />
      <Hero />
      <DonationPolicySection />
      <Impact />
      <Values />
      <PoliciesReports />
      <FinalCTA />
    </div>
  );
}