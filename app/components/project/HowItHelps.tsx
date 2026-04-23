import { BsGraphUpArrow } from "react-icons/bs";
import { FaBoxes, FaSearch } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { MdChatBubble } from "react-icons/md";
import { PiCraneTowerFill, PiPlantFill } from "react-icons/pi";
import { SlSpeech } from "react-icons/sl";

const steps = [
  {
    step: "01",
    icon: <FaSearch fill="#650199" size={30} />,
    title: "Identifying the Most Vulnerable",
    desc: "Our on-the-ground teams conduct needs assessments in conflict zones, flood-affected areas, and impoverished rural communities to find the children who need help most — those who have never set foot in a classroom.",
  },
  {
    step: "02",
    icon: <PiCraneTowerFill fill="#650199" size={30} />,
    title: "Setting Up Learning Spaces",
    desc: "We establish temporary learning centres or repair damaged schools, providing safe, secure spaces equipped with basic furniture, teaching materials, and sanitation facilities — creating environments where children can focus on learning.",
  },
  {
    step: "03",
    icon: <GiTeacher fill="#650199" size={30} />,
    title: "Hiring & Training Local Teachers",
    desc: "We recruit qualified local teachers from the community, provide training in child-friendly teaching methods and trauma-informed practice, and pay fair salaries — ensuring children learn from people who understand their culture and language.",
  },
  {
    step: "04",
    icon: <FaBoxes fill="#650199" size={30} />,
    title: "Distributing Educational Kits",
    desc: "Every enrolled child receives a fully-stocked school bag, uniform, and nutritious meals where applicable — removing the practical barriers that keep families from sending their children to school.",
  },
  {
    step: "05",
    icon: <BsGraphUpArrow fill="#650199" size={30} />,
    title: "Monitoring Progress & Attainment",
    desc: "Our teams track attendance, literacy, numeracy, and wellbeing for every child. Regular assessments ensure the programme is working and help us adapt our approach where needed to maximise each child's potential.",
  },
  {
    step: "06",
    icon: <PiPlantFill fill="#650199" size={30} />,
    title: "Transitioning to Formal Education",
    desc: "At the end of the programme, we work with government schools and local authorities to transition children into mainstream education — creating lasting change that outlives the project itself.",
  },
];

export default function HowItHelps() {
  return (
    <section className="bg-brand-white py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block bg-purple/10 text-purple text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-sm mb-3">
            Our Approach
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
            How the Project Helps Beneficiaries
          </h2>
          <p className="text-brand-black max-w-2xl mx-auto text-base">
            From identification to long-term integration, here's exactly how your donation creates real, sustained change in the lives of children who need it most.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div
              key={s.step}
              className="relative group bg-white/50 rounded-sm p-7 border border-gray-100 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 shadow-lg"
            >
              {/* Step number */}
              <span className="absolute top-6 right-6 text-5xl font-black text-purple/10 leading-none select-none">
                {s.step}
              </span>
              {/* Icon */}
              <div className="w-14 h-14 bg-purple-faint/50 rounded-sm flex items-center justify-center text-3xl mb-5 border border-gray-100">
                {s.icon}
              </div>
              <h3 className="text-lg font-bold text-brand-black mb-3 leading-snug">{s.title}</h3>
              <p className="text-sm text-brand-black/75 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Testimonial strip */}
        <div className="mt-16 bg-purple rounded-sm p-10 text-white flex flex-col md:flex-row items-center gap-8">
          <div className="text-6xl shrink-0">
            <MdChatBubble fill="#f5f5f5" size={70} />
          </div>
          <div>
            <p className="text-xl font-semibold italic leading-relaxed mb-4">
              "Almas who came to our centre had never been to school. Within a year, they were reading, writing,
              and asking questions I had never expected from children so young. Education changes everything."
            </p>
            <p className="text-brand-white text-sm">— Muhammad Ali, Head Teacher</p>
          </div>
        </div>
      </div>
    </section>
  );
}
