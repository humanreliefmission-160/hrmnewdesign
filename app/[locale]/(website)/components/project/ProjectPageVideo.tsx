import { YouTubeEmbed } from '@next/third-parties/google'

export default function ProjectPageVideo() {
  return (
    <>
      <div className="flex flex-col justify-center items-center px-5 pt-10 pb-10 mt-10">

        <h2 className="text-center text-4xl font-bold text-brand-black mb-3">
          These are our projects
        </h2>

        <p className="text-center text-brand-black mb-5">
          See the video below
        </p>

        <div className="w-full md:w-[700px] overflow-hidden h-auto">
          <YouTubeEmbed videoid='JY5hX_Dgy-s' params="controls=0" />
        </div>

      </div>

      <hr className="my-12 h-px border-t-0 bg-transparent bg-linear-to-r from-transparent via-purple/30 to-transparent" />
    </>
  )
}