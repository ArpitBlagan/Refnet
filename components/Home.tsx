import { BackgroundBeams } from "@/components/ui/background-beams";
import { motion } from "framer-motion";
import { TextHoverEffect } from "./ui/text-hover-effect";
import Link from "next/link";
import { RiGithubFill } from "@remixicon/react";

const Home = () => {
  return (
    <div className=" h-[40vh] md:h-[50vh] flex items-center justify-center bg-opcaity-10">
      <BackgroundBeams />
      <div className=" flex flex-col gap-4">
        <div className="flex flex-col gap-2 justify-center">
          <div className="flex items-center flex-col font-mono uppercase relative">
            <div className="mb-10 md:mb-5">
              <Link
                href="/"
                className="flex md:text-sm hover:bg-gray-800  font-semibold items-center tracking-tighter gap-2 border border-zinc-700 py-2 px-4 rounded-xl"
              >
                <RiGithubFill />
                Give a ⭐️
              </Link>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: "easeInOut",
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
                ease: "easeInOut",
              }}
              className="text-[5vw] tracking-tight"
            >
              to showcase your Work.
            </motion.h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
