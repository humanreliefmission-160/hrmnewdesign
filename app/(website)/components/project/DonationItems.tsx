import { useState } from "react";
import YellowCTA from "../YellowCTA";
import { BiSolidBackpack, BiSolidTShirt } from "react-icons/bi";
import { SiBookstack } from "react-icons/si";
import Link from "next/link";

const items = [
  {
    id: 1,
    icon: <BiSolidBackpack fill="#650199" size={30} />,
    title: "School Bag & Stationery Pack",
    description: "Provides one child with a full school bag, exercise books, pens, pencils, a ruler, and an eraser — everything they need to start learning.",
    price: 20,
    amounts: [5, 10, 20],
    impact: "Equips 1 child for a full school term",
    donationFrequency: ["One Off"]
  },
  {
    id: 2,
    icon: <SiBookstack fill="#650199" size={30} />,
    title: "Textbook Bundle",
    description:
      "A complete set of curriculum-aligned textbooks in the local language for one student across all core subjects.",
    price: 5,
    amounts: [10, 20, 40],
    impact: "Supports 1 child's full academic year",
    donationFrequency: ["One Off"]
  },
  {
    id: 3,
    icon: <BiSolidTShirt fill="#650199" size={30} />,
    title: "School Uniform",
    description:
      "Many children are turned away or feel excluded without a uniform. This donation covers a full uniform set for one child.",
    price: 10,
    amounts: [15, 30, 50],
    impact: "Keeps 1 child in school with dignity",
    donationFrequency: ["Monthly"]
  }
];

type DonationItem = typeof items[number];

function DonationCard({ item }: { item: DonationItem }) {
  const [selected, setSelected] = useState<number>(item.amounts[1]);
  const [custom, setCustom] = useState("");
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="shadow-md bg-brand-white rounded-sm border border-gray-100 p-7 flex flex-col gap-4 hover:shadow-xl transition-shadow duration-300 justify-between">
      <div className="flex gap-4 items-center">
        <div className="bg-purple-faint p-3 rounded-sm">
          <span className="text-4xl">{item.icon}</span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 leading-tight">{item.title}</h3>
          <p className="text-xs text-purple mt-1">{item.impact}</p>
        </div>
      </div>

      <div className="flex">
        <div className="flex flex-row items-end gap-1 bg-purple-dark px-4 py-2 text-brand-white rounded-sm">
          <h2 className="text-2xl font-bold">
            £{item.price}
          </h2>
          <span className="text-[10px] text-brand-white rounded-sm">
            {item.donationFrequency[0]}
          </span>
        </div>
      </div>

      <p className="text-sm text-brand-black/75 leading-relaxed">{item.description}</p>

      {/* Amount selector */}
      <div className="flex flex-wrap gap-2 mt-1">
        {item.amounts.map((amt) => (
          <button
            key={amt}
            onClick={() => { setSelected(amt); setCustom(""); }}
            className={`px-4 py-2 rounded-sm text-sm font-semibold border transition-all duration-200 ${selected === amt && !custom
              ? "bg-purple text-white border-purple-700"
              : "bg-white text-gray-700 border-gray-300 hover:border-purple/50"
              }`}
          >
            £{amt}
          </button>
        ))}
        <input
          type="number"
          min="1"
          placeholder="£ Other"
          value={custom}
          onChange={(e) => { setCustom(e.target.value); setSelected(0); }}
          className="px-3 py-2 rounded-sm text-sm border border-gray-300 w-24 focus:outline-none focus:border-purple/50 focus:ring-1 focus:ring-purple-300"
        />
      </div>

      {/* CTA */}
      {/* <button
        onClick={handleAdd}
        className={`mt-2 w-full py-3 rounded-full font-bold text-sm transition-all duration-300 ${added
          ? "bg-green-500 text-white"
          : "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
          }`}
      >
        {added ? "Added to Basket!" : "Add to Donation Basket"}
      </button> */}

      <div className="flex flex-col gap-4 justify-between items-left sm:flex sm:justify-between sm:gap-2">
        <div>
          <YellowCTA text="Add to Donation Basket" href="/donate" />
        </div>
        <Link className="underline text-sm font-semibold text-purple" href="/projects/projectitem/donationitem">Find out more</Link>
      </div>
    </div>
  );
}

export default function DonationItems() {
  return (
    <section className="bg-purple-dark py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-purple-light/50 text-brand-white text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-sm mb-3">
            Donate Today
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-white mb-4">
            Choose Your Donation
          </h2>
          <p className="text-brand-white max-w-2xl mx-auto text-base">
            Every item below directly benefits a child in need. Select the amount that feels right for you — no donation
            is too small, and 100% of your gift reaches the project.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <DonationCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
