import { RiArrowRightLine, RiInfinityLine } from '@remixicon/react'
import Link from 'next/link'

const Second = () => {
  return (
    <div className="h-[30vh] relative flex flex-col gap-3">
      <div className="text-gray-300 flex flex-col items-center">
        <h1 className="md:text-3xl text-center leading-[1] text-semibold">
          Showcase Your Skills, Unlock Referrals
        </h1>
        <p className="text-center text-slate-600">
          Stand out from the crowd and catch the eye of recruiters 👀
        </p>
      </div>
      <div className="flex items-center justify-center gap-5">
        <Link
          href="/posts"
          target="_blank"
          className="flex items-center py-2 px-4 border  duration-300 ease-in-out border-zinc-700 rounded-xl hover:bg-gray-800"
        >
          Posts <RiArrowRightLine className="rotate-[-45deg]" />
        </Link>
        <Link
          className="flex items-center px-4 py-2 bg-white hover:bg-gray-500 duration-300 ease-in-out text-black rounded-xl "
          href="/signup"
        >
          Get Started <RiInfinityLine className="rotate-[-45deg]" />
        </Link>
      </div>
    </div>
  )
}

export default Second
