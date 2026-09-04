import Link from "next/link";
import "./[locale]/globals.css";
import { FaArrowRightLong } from "react-icons/fa6";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-linear-to-br bg-white flex items-center justify-center p-6 md:p-12 relative overflow-hidden">


      <main className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 w-full max-w-340 mx-auto">
        {/* Left "4" */}
        <div className="hidden md:flex relative select-none items-center justify-center">
          <span className="font-body font-black text-purple text-[20rem] md:text-[40rem] leading-none">
            4
          </span>
        </div>

        {/* Middle Card */}
        <div className="bg-white rounded-sm p-8 md:p-10 shadow-2xl shadow-purple-dark/25 w-full max-w-100 flex flex-col text-center border border-white/10 select-none animate-fadeIn">
          <span className="text-xs font-extrabold tracking-wider text-purple uppercase">
            {"404 error"}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-brand-black mt-3 mb-2 leading-tight">
            {"Sorry, page not found"}
          </h1>
          <p className="text-sm text-brand-grey mb-8">
            {"Go to other sections to learn more about Human Relief Mission"}
          </p>

          {/* Options List */}
          <div className="flex flex-col gap-3 text-left">
            {/* About us */}
            <Link href="/about" className="group flex items-center justify-between p-5 rounded-sm bg-brand-white hover:bg-purple-faint border border-brand-lgrey hover:border-purple/10 transition-all duration-300">
              <div>
                <h3 className="font-bold text-base text-brand-black group-hover:text-purple transition-colors duration-200">
                  {"About us"}
                </h3>
                <p className="text-xs text-brand-grey mt-0.5">
                  {"Learn about our mission and vision"}
                </p>
              </div>
              <div className="text-brand-black group-hover:text-purple flex items-center justify-center transition-all duration-300">
                <FaArrowRightLong />
              </div>
            </Link>

            {/* Projects */}
            <Link href="/projects" className="group flex items-center justify-between p-5 rounded-sm bg-brand-white hover:bg-purple-faint border border-brand-lgrey hover:border-purple/10 transition-all duration-300">
              <div>
                <h3 className="font-bold text-base text-brand-black group-hover:text-purple transition-colors duration-200">
                  {"Projects"}
                </h3>
                <p className="text-xs text-brand-grey mt-0.5">
                  {"Explore our active projects"}
                </p>
              </div>
              <div className="text-brand-black group-hover:text-purple flex items-center justify-center transition-all duration-300">
                <FaArrowRightLong />
              </div>
            </Link>

            {/* Donate */}
            <Link href="/donate" className="group flex items-center justify-between p-5 rounded-sm bg-brand-white hover:bg-purple-faint border border-brand-lgrey hover:border-purple/10 transition-all duration-300">
              <div>
                <h3 className="font-bold text-base text-brand-black group-hover:text-purple transition-colors duration-200">
                  {"Donate"}
                </h3>
                <p className="text-xs text-brand-grey mt-0.5">
                  {"Support our lifesaving work in Afghanistan"}
                </p>
              </div>
              <div className="text-brand-black group-hover:text-purple flex items-center justify-center transition-all duration-300">
                <FaArrowRightLong />
              </div>
            </Link>
            <a href="/" className="text-purple font-semibold mx-auto text-sm hover:underline mt-2">
              Back to homepage
            </a>
          </div>
        </div>

        {/* Right "4" */}
        <div className="hidden md:flex relative select-none animate-fadeIn items-center justify-center" style={{ animationDelay: "0.3s" }}>
          <span className="font-body font-black text-purple text-[20rem] md:text-[40rem] leading-none">
            4
          </span>
        </div>
      </main>
    </div>
  );
}
