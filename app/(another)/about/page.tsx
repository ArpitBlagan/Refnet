"use client";
import Image from "next/image";
import bg from "@/app/images/greg-rakozy-oMpAz-DN-9I-unsplash.jpg";
import { StarsBackground } from "@/components/ui/star-background";
import { SparklesCore } from "@/components/ui/sparkles";
import { RiGithubFill, RiLinkedinFill, RiTwitterXFill } from "@remixicon/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HoverBorderGradient } from "@/components/ui/hover-background";

const page = () => {
  return (
    <div className="h-[100vh] bg-black relative">
      <StarsBackground />
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <div
        className=" absolute top-[50%] left-[50%] flex flex-col w-full gap-2 items-center justify-center"
        style={{ transform: "translate(-50%,-50%)", zIndex: "1" }}
      >
        <Image
          src={bg}
          alt="image"
          height={400}
          className="rounded-full"
          style={{ opacity: "0.5" }}
        />
        <div className="flex flex-col items-center justify-center gap-2">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              ease: "easeInOut",
            }}
            className="font-bold text-4xl uppercase text-gray-400"
          >
            Refnet
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.2 * 2,
              ease: "easeInOut",
            }}
            className="w-8/12 text-center text-lg font-semibold tracking-tigth text-gray-500 leading-none"
          >
            Refnet is all about help other developers to showcase their proof of
            work effortlessly and stand out in the eye of recruiters. As a
            central platform, it significantly reduces the effort recruiters
            spend searching for top talent, allowing them to dedicate more time
            to reviewing candidates.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.2 * 4,
              ease: "easeInOut",
            }}
            className="flex flex-col gap-1"
          >
            <p className="text-sm  font-bold text-gray-600">
              Developed by Arpit Blagan.
            </p>
            <div className="flex items-center justify-between">
              <Link href="https://github.com/ArpitBlagan" target="_blank">
                <RiGithubFill className="text-gray-600 hover:text-white duration-300 ease-in-out" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/arpit-blagan-79081b193/"
                target="_blank"
              >
                <RiLinkedinFill className="text-gray-600 hover:text-white duration-300 ease-in-out" />
              </Link>
              <Link href="https://x.com/arpit_blagan" target="_blank">
                <RiTwitterXFill className="text-gray-600 hover:text-white duration-300 ease-in-out" />
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.2 * 6,
              ease: "easeInOut",
            }}
            className="flex items-center justify-center mt-3"
          >
            <HoverBorderGradient
              containerClassName="rounded-md"
              className="flex items-center space-x-2"
            >
              <Link
                href="mailto:arpitblagan27@example.com"
                className="text-center text-gray-600 hover:text-white duration-300 ease-in-out"
                target="_blank"
              >
                Hire me.
              </Link>
            </HoverBorderGradient>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default page;
