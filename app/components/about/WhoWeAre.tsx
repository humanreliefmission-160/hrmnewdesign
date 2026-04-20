import YellowCTA from '../YellowCTA'
import Image from 'next/image'

export default function WhoWeAre() {
  return (
    <section className="py-20 md:px-8 bg-purple p-4">
      <div className="max-w-[1140px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-white/10 text-brand-white font-bold text-[0.75rem] tracking-widest uppercase px-4 py-1.5 mb-4">Our Story</div>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-white mb-6 leading-tight">Who We Are</h2>
            <p className="text-[1.05rem] text-brand-white leading-[1.8] mb-6">
              Founded in 2003, Human Relief Mission has grown into a trusted international charity operating in over 45 countries. We respond to emergencies with speed and care, while also investing in long term development programmes that build sustainable futures.
            </p>
            <YellowCTA
              text='Support our Mission'
              href='/projects'
            />
          </div>
          <div className="bg-brand-lgrey rounded-sm flex items-center justify-center text-[5rem] aspect-square">
            <Image src="/img-placeholder.JPG" className='w-full h-full object-cover object-center rounded-sm' alt="Kids in School" width={500} height={500} />
          </div>
        </div>
      </div>
    </section>
  )
}
