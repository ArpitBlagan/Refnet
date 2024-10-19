// import { BackgroundBeams } from '@/components/ui/background-beams'
import { motion } from 'framer-motion'
import { TextHoverEffect } from './ui/text-hover-effect'
import Link from 'next/link'
import { RiGithubFill } from '@remixicon/react'
import { HoverBorderGradient } from './ui/hover-background'
import { Spotlight } from './ui/spotlight'

const Home = () => {
  return (
    <div className="h-[40vh] relative md:h-[50vh] flex items-center justify-center bg-opcaity-10">
      <Spotlight />
      {/* <BackgroundBeams /> */}
      <div className=" flex flex-col gap-4">
        <div className="flex flex-col gap-2 justify-center">
          <div className="flex items-center flex-col font-mono uppercase relative">
            <div className="mb-10 md:mb-5">
              <div className=" flex justify-center text-center">
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  className="flex items-center space-x-2"
                >
                  <Link
                    href="https://github.com/ArpitBlagan/Refnet"
                    target="_blank"
                    className="flex md:text-sm   font-semibold items-center tracking-tighter gap-2 "
                  >
                    <RiGithubFill />
                    Give a ⭐️
                  </Link>
                </HoverBorderGradient>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: 'easeInOut'
              }}
              className="w-full h-[10vw] md:h-[10.5vw]"
            >
              <TextHoverEffect text="The #1 website" duration={3} />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 3 * 0.2,
                ease: 'easeInOut'
              }}
              className="text-[5vw] tracking-tight font-medium text-white"
            >
              to show-case your Work
            </motion.h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
