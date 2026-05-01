import { AiFillThunderbolt } from "react-icons/ai";
import { FaGlobeAsia, FaSeedling } from "react-icons/fa";
import { IoMdTrophy } from "react-icons/io";
import { RiSearchFill, RiShakeHandsFill } from "react-icons/ri";

export default function Values() {
  return (
    <section className="py-20 px-4 md:px-8 bg-purple-faint">
      <div className="max-w-[1140px] mx-auto">
        <div className="bg-purple inline-block text-brand-white font-bold text-[0.75rem] tracking-widest uppercase px-4 py-1.5 mb-4">What Drives Us</div>
        <h2 className="text-3xl md:text-5xl font-bold text-brand-black mb-4 leading-tight">Our Core Values</h2>
        <p className="text-[1.05rem] text-brand-black leading-[1.7] max-w-[600px] mb-12">
          Every action we take is guided by these principles.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-brand-white p-8 rounded-sm shadow-card transition-all hover:shadow-card-hover border border-brand-lgrey/50">
            <div className="text-3xl mb-4">
              <RiShakeHandsFill />
            </div>
            <div className="font-bold text-lg mb-2 text-brand-black">Compassion</div>
            <p className="text-brand-black/75 ">
              We approach every beneficiary with empathy and dignity, recognising their humanity above all else.
            </p>
          </div>
          <div className="bg-brand-white p-8 rounded-sm shadow-card transition-all hover:shadow-card-hover border border-brand-lgrey/50">
            <div className="text-3xl mb-4">
              <RiSearchFill />
            </div>
            <div className="font-bold text-lg mb-2 text-brand-black">Transparency</div>
            <p className="text-brand-black/75 ">
              We publish detailed annual reports and maintain full accountability to our donors and the communities we serve.
            </p>
          </div>
          <div className="bg-brand-white p-8 rounded-sm shadow-card transition-all hover:shadow-card-hover border border-brand-lgrey/50">
            <div className="text-3xl mb-4">
              <AiFillThunderbolt />
            </div>
            <div className="font-bold text-lg mb-2 text-brand-black">Rapid Response</div>
            <p className="text-brand-black/75 ">
              When disasters strike, we mobilise quickly. Speed saves lives and our teams are always ready to deploy.
            </p>
          </div>
          <div className="bg-brand-white p-8 rounded-sm shadow-card transition-all hover:shadow-card-hover border border-brand-lgrey/50">
            <div className="text-3xl mb-4">
              <FaSeedling />
            </div>
            <div className="font-bold text-lg mb-2 text-brand-black">Sustainability</div>
            <p className="text-brand-black/75">
              Beyond emergency relief, we build lasting infrastructure and skills that empower communities for generations.
            </p>
          </div>
          <div className="bg-brand-white p-8 rounded-sm shadow-card transition-all hover:shadow-card-hover border border-brand-lgrey/50">
            <div className="text-3xl mb-4">
              <FaGlobeAsia />
            </div>
            <div className="font-bold text-lg mb-2 text-brand-black">Inclusivity</div>
            <p className="text-brand-black/75 ">
              We serve all people regardless of religion, ethnicity, gender or nationality. Humanity is our only criterion.
            </p>
          </div>
          <div className="bg-brand-white p-8 rounded-sm shadow-card transition-all hover:shadow-card-hover border border-brand-lgrey/50">
            <div className="text-3xl mb-4">
              <IoMdTrophy />
            </div>
            <div className="font-bold text-lg mb-2 text-brand-black">Excellence</div>
            <p className="text-brand-black/75 ">
              We hold ourselves to the highest professional standards because the people we serve deserve nothing less.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
