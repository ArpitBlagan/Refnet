"use client";
import Home from "@/components/Home";
import Second from "@/components/Second";
import {
  RiArrowRightLine,
  RiArrowRightSLine,
  RiLightbulbFlashFill,
  RiLineChartLine,
  RiLinkedinLine,
  RiTwitterLine,
  RiWirelessChargingLine,
} from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import image from "@/app/images/github.webp";
import Card from "@/components/Card";
const featuers = [
  {
    label: "Get Inspired",
    description: "Take a look at others projects",
    linkText: "See post",
    link: "/posts",
    icon: <RiWirelessChargingLine className=" w-10 h-10" />,
  },
  {
    label: "Easy to use",
    description: "User friendly ui with ease of use",
    linkText: "Get started",
    link: "/posts",
    icon: <RiLightbulbFlashFill className=" w-10 h-10" />,
  },
  {
    label: "Powerful time Analytics",
    description: "Get our analytics on posts realtime",
    linkText: "Add post",
    link: "/upload/post",
    icon: <RiLineChartLine className=" w-10 h-10" />,
  },
];
export default function Landing() {
  const refScrollContainer = useRef(null);
  // useEffect(() => {
  //   async function getLocomotive() {
  //     const Locomotive = (await import("locomotive-scroll")).default;
  //     const scroll = new Locomotive({
  //       el: refScrollContainer.current || undefined,
  //       smooth: true,
  //     });
  //   }
  //   getLocomotive();
  // }, []);

  return (
    <div ref={refScrollContainer} className="">
      <div className="h-[60vh] md:h-[89vh] relative px-7">
        <Home />
        <Second />
      </div>
      <div className="flex flex-col gap-2 bg-zinc-900 px-7 py-7 ">
        <div className="flex w-full items-center justify-center">
          <div className="flex items-start flex-col justify-center gap-10">
            <h1 className="text-3xl tracking-tighter sm:text-4xl md:text-5xl font-thin tracking-tighter sm:text-4xl md:text-5xl mt-5">
              What we offer
            </h1>
            <p className="text-2xl tracking-tighter sm:text-3xl md:text-3xl text-slate-500">
              Enter in world of Refent, explore out of box features and best way
              to show case you work.
            </p>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 py-10 px-7">
          {featuers.map((ele, index) => {
            return <Card ele={ele} index={index} />;
          })}
        </div>
      </div>
      {/* <div className="flex flex-col gap-4 py-10">
        <div className="flex flex-col items-center jusityf-center">
          <h1 className="text-xl">Arpit Blagan</h1>

          <p className="leading-none text-gray-600">
            Developer who build this shit.
          </p>
          <Link
            href="/"
            target="_blank"
            className="py-2 px-4 flex items-center text-slate-600 hover:underline duration-500 ease-in-out"
          >
            More About Me{" "}
            <RiArrowRightLine className="text-slate-600 rotate-[-45deg]" />
          </Link>
        </div>
      </div> */}
      <div className="flex md:flex-row flex-col items-center justify-between px-7 bg-[#f8f8fa] min-h-[500px] rounded-xl">
        <div className="flex flex-col gap-10 items-start pt-10 h-full">
          <h1 className="text-3xl md:text-[3vw] font-semibold text-black/70 uppercase">
            Why you should
            <br />
            go with Refnet?
          </h1>
          <p className="text-slate-700 text-lg">
            Before Refnet, developers used to showcase their work on various
            <br />
            platforms like{" "}
            {
              <RiTwitterLine className="inline text-slate-700 h-[10] w-[10] rounded-full" />
            }{" "}
            or{" "}
            {
              <RiLinkedinLine className="inline bg-blue-600 text-white h-[10] w-[10]" />
            }{" "}
            , making it difficult for recruiters to find <br /> talented
            individuals. Refnet solves this by providing a <br />
            <span className="text-black  py-2 px-2 bg-black/20 rounded-xl">
              centralized place
            </span>{" "}
            where developers can easily display their projects, making it
            <br />
            simpler for recruiters to discover skilled developers
          </p>
        </div>
        <video
          src="https://cdn.prod.website-files.com/64ae816c96c759847a5045b2/64ede95a1c3d386f2787e975_Final%20Globe%20with%20Banners%203-transcode.mp4"
          autoPlay
          loop
          muted
          className="md:h-[400px] h-[300px] w-[400px] md:w-[500px]"
        />
      </div>
      <div className="bg-zinc-900 w-full h-[470px] flex items-center mt-3 justify-center relative overflow-hidden">
        <Image src={image} alt="default" className="object-center" />
        <div className="absolute bottom-10 md:bottom-20  flex flex-col items-center gap-3 px-4">
          <h1 className="text-3xl font-semibold uppercase tracking tight text-center">
            We are <br />
            Opensource
          </h1>
          <p className="text-center text-slate-600 md:text-lg">
            Think you can improve Refnet? Create a pull request and let others
            enjoy the benefits!
          </p>
          <Link
            href="https://github.com/ArpitBlagan/Refnet"
            target="_blank"
            className="flex uppercase items-center justify-center gap-2 border border-slate-800 w-1/2 py-2 rounded-xl hover:gap-4 duration-300 hover:bg-gray-700 ease-in-out"
          >
            contribute
            <RiArrowRightSLine />
          </Link>
        </div>
      </div>
    </div>
  );
}
