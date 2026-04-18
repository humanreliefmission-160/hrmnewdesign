import Link from "next/link";
import { useState } from "react";

const items = [
  {
    question: "What is the mission of this project?",
    answer:
      "Our mission is to provide access to quality education, clean water, and essential resources to underprivileged communities across the globe. We believe every child deserves the opportunity to learn, grow, and thrive regardless of where they are born.",
  },
  {
    question: "How are donations used?",
    answer:
      "100% of your donation goes directly towards on-the-ground programs. This includes building classrooms, distributing school kits, funding teacher training, and supporting clean water infrastructure. We publish full financial reports annually for complete transparency.",
  },
  {
    question: "Which countries do you currently operate in?",
    answer:
      "We currently operate in over 30 countries across South Asia, Sub-Saharan Africa, and the Middle East. Key regions include Pakistan, Syria, Kenya, Somalia, and Bangladesh — with new programmes launching every quarter.",
  },
  {
    question: "How can I get involved beyond donating?",
    answer:
      "There are many ways to contribute — you can volunteer on field trips, sponsor a child's education, partner your business with our initiatives, or help spread awareness on social media. Reach out to our team to explore what works best for you.",
  },
  {
    question: "Are my donations tax-deductible?",
    answer:
      "Yes. We are a registered non-profit organisation and all donations are fully tax-deductible where applicable. You will receive an official receipt after every contribution that can be used for tax filing purposes.",
  },
  {
    question: "How do I track the impact of my donation?",
    answer:
      "After donating, you'll receive regular impact updates via email including photos, stories, and data from the communities you've helped. You can also access your personalised impact dashboard through your donor account on our website.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <hr className="h-px border-t-0 bg-transparent bg-linear-to-r from-transparent via-brand-purple to-transparent opacity-50 dark:via-purple" />

      <section className="w-full bg-brand-white py-20 px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <span className="inline-block bg-purple/10 text-purple text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base">
            Everything you need to know about our work, your impact, and how to get involved.
          </p>
        </div>

        {/* Accordion items */}
        <div className="max-w-3xl mx-auto flex flex-col gap-3">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-sm border transition-all duration-300 bg-white/50 ${isOpen
                  ? "border-purple bg-white/5"
                  : "border-purple/10 bg-white/50 hover:border-purple/25"
                  }`}
              >
                {/* Question row */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 group"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-base font-semibold transition-colors duration-200 ${isOpen ? "text-purple" : "text-black group-hover:text-purple"
                      }`}
                  >
                    {item.question}
                  </span>

                  {/* Icon */}
                  <span
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 bg-purple ${isOpen
                      ? "bg-purple rotate-45"
                      : "bg-brand-white group-hover:bg-purple"
                      }`}
                  >
                    <svg
                      className={`w-4 h-4 transition-colors duration-200 ${isOpen ? "text-brand-white" : "text-brand-white"
                        }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </button>

                {/* Answer — animated height */}
                <div
                  className={`overflow-hidden transition-all duration-400 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  style={{
                    transitionProperty: "max-height, opacity",
                    transitionDuration: "350ms",
                    transitionTimingFunction: "ease-in-out",
                  }}
                >
                  <div className="px-6 pb-6 text-brand-black text-sm leading-relaxed border-t border-white/5">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-brand-black text-sm">
            Still have questions?
            <br />
            Get in touch with our team: {" "}
            <Link
              href="mailto:info@humanreliefmission.com"
              className="text-purple-light hover:text-purple-dark underline underline-offset-2 transition-colors"
            >
              info@humanreliefmission.com
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
