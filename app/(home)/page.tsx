'use client'
import Home from '@/components/Home'
import Second from '@/components/Second'
import {
  RiArrowRightSLine,
  RiLightbulbFlashFill,
  RiLineChartLine,
  RiLinkedinLine,
  RiTwitterXFill,
  RiWirelessChargingLine
} from '@remixicon/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import image from '@/app/images/github.webp'
import Card from '@/components/Card'
import { ContainerScroll } from '@/components/ui/container-scroll-animation'
import { HoverBorderGradient } from '@/components/ui/hover-background'
import { BorderBeam } from '@/components/ui/border-beam'

const featuers = [
  {
    label: 'Get Inspired',
    description: 'Take a look at others projects',
    linkText: 'See post',
    link: '/posts',
    icon: <RiWirelessChargingLine className=" w-10 h-10" />
  },
  {
    label: 'Easy to use',
    description: 'User friendly ui with ease of use',
    linkText: 'Get started',
    link: '/posts',
    icon: <RiLightbulbFlashFill className=" w-10 h-10" />
  },
  {
    label: 'Powerful real time Analytics',
    description: 'Get our analytics on posts realtime',
    linkText: 'Add post',
    link: '/upload/post',
    icon: <RiLineChartLine className=" w-10 h-10" />
  }
]
export default function Landing() {
  const refScrollContainer = useRef(null)
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
    <div
      ref={refScrollContainer}
      className="bg-gradient-to-b rounded-xl from-[#0a0a0a] via-slate-900 to-[[#0a0a0a]"
    >
      <div className="relative h-[60vh] md:h-[89vh]  px-7">
        <Home />
        <Second />
        {/* <Ripple /> */}
      </div>
      <div className="hidden md:block min-h-screen flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="font-black text-white uppercase">
                <span
                  style={{
                    backgroundSize: 'cover',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent'
                  }}
                  className="font-mono text-3xl font-bold md:text-[5vw] bg-[url('https://images.unsplash.com/photo-1524135961766-4a962e893da1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]"
                >
                  ..Unlock Referrals..
                </span>
                <br />
                <span className=" text-2xl md:text-5xl font-lg  text-slate-300  mt-1 leading-none">
                  with Refnet using it's out of box features.
                </span>
              </h1>
            </>
          }
        >
          <BorderBeam duration={50} />
          <Image
            src="https://d3e230op9b6du5.cloudfront.net/bg1 (1).jpg"
            alt="hero"
            width={1000}
            height={750}
            className="m-auto rounded-2xl h-full w-full"
            draggable={false}
          />
        </ContainerScroll>
      </div>
      <div className="flex flex-col gap-2  px-7 py-7 rounded-3xl mb-5">
        <div className="flex w-full items-center justify-center">
          <div className="flex items-start flex-col justify-center gap-10">
            <h1 className="text-3xl tracking-tighter sm:text-4xl md:text-5xl font-thin tracking-tighter sm:text-4xl md:text-5xl mt-5">
              What we offer
            </h1>
            <p className="text-2xl tracking-tighter sm:text-3xl md:text-3xl text-white/40">
              Enter in the world of Refent, explore out of box features and show case you work
              effortlessly.
            </p>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 py-10 px-7">
          {featuers.map((ele, index) => {
            return <Card ele={ele} index={index} key={index} />
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
      <div className="relative flex md:flex-row flex-col border items-center justify-between px-7 bg-[#f8f8fa] min-h-[500px] rounded-2xl xl:rounded-full mb-5">
        <BorderBeam size={450} duration={32} delay={9} />
        <div className="flex flex-col gap-10 md:items-center pt-10 h-full pl-4">
          <h1 className="text-3xl md:text-[3vw] font-semibold text-black/70 uppercase">
            Why you should
            <br />
            go with Refnet?
          </h1>
          <p className="text-slate-700 text-lg md:text-center">
            Before Refnet, developers used to showcase their work on various
            <br />
            platforms like{' '}
            {<RiTwitterXFill className="inline text-white h-[10] w-[10] bg-black " />} or{' '}
            {<RiLinkedinLine className="inline bg-blue-600 text-white h-[10] w-[10]" />} , making it
            difficult for recruiters to find <br /> talented individuals. Refnet solves this by
            providing a <br />
            <span className="text-black  py-2 px-2 bg-black/20 rounded-xl">
              centralized place
            </span>{' '}
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
          className="flex-1 h-[300px] w-[400px] "
        />
      </div>
      <div className=" w-full h-[470px] md:h-[670px] flex items-center mt-3 justify-center relative overflow-hidden">
        <Image src={image} alt="default" className="object-center" />
        <div className="absolute bottom-10 md:bottom-20  flex flex-col items-center gap-3 px-4">
          <h1 className="text-3xl font-semibold uppercase tracking tight text-center">
            We are <br />
            Opensource
          </h1>
          <p className="text-center text-slate-300 md:text-lg tracking-tight">
            Think you can improve <span className="text-blue-400">Refnet</span>? Create a pull
            request and let others enjoy the benefits!
          </p>
          <HoverBorderGradient containerClassName="rounded-full" className="">
            <Link
              href="https://github.com/ArpitBlagan/Refnet"
              target="_blank"
              className="flex uppercase items-center justify-center gap-2     hover:gap-4 duration-300 ease-in-out"
            >
              <p>contribute</p>
              <RiArrowRightSLine className="text-white" />
            </Link>
          </HoverBorderGradient>
        </div>
      </div>
    </div>
  )
}
