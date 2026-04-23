import Link from 'next/link'
import YellowCTA from './YellowCTA'

export default function FinalCTA() {
  return (
    <section className="bg-purple-dark py-20 px-4 md:px-8 text-start">
      <div className="max-w-[1140px] mx-auto">
        <h2 className="font-body text-4xl md:text-5xl font-bold text-brand-white mb-4">
          Be the change you wish
          <br />
          to see in the world
        </h2>
        <p className="text-brand-white/65 text-[1.05rem] leading-[1.7] mb-8">
          Your donation, no matter how small, can transform a life.
          <br />
          Start today.
        </p>
        <YellowCTA text="Make a Donation" href="/donate" />
      </div>
    </section>
  )
}