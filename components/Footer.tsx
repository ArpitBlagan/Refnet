'use client'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="flex flex-col gap-2  py-6 w-full  px-4 md:px-6 border-t">
      <div className="flex flex-col gap-2">
        <div className="flex md:flex-row flex-col items-center gap-10">
          <div className="flex md:flex-row flex-col items-center">
            <svg
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              className="h-[70px] w-[50px]"
            >
              <path
                fill="#F2F4F8"
                d="M23.4,-9.7C30.9,15.6,38.1,39,31.9,43.3C25.8,47.6,6.2,32.9,-5.5,21.2C-17.2,9.4,-21.2,0.6,-19,-17.4C-16.8,-35.4,-8.4,-62.6,-0.2,-62.6C7.9,-62.5,15.8,-35.1,23.4,-9.7Z"
                transform="translate(100 100)"
              />
            </svg>
            <h1 className="text-2xl md:text-3xl">Refnet </h1>
          </div>
          <div className="flex-1 flex flex-col items-center justify-end py-10 gap-4">
            {/* <div className="md:w-1/2 flex items-center justify-start w-full">
              <p className="md:text-xl font-semibold text-white/40 text-start">
                Don't miss a beat
                <br />
                Subscribe to out newsletter
              </p>
            </div>
            <div className="flex md:flex-row flex-col items-center gap-3 md:w-1/2 w-full">
              <Input
                placeholder="arpitblagan27@gmail.com"
                className="md:w-full w-full border-slate-800"
              />
              <Button
                onClick={(e) => {
                  e.preventDefault();
                }}
                className="py-2 px-4 hover:bg-gray-700 duration-300 ease-in-out"
              >
                Submit
              </Button>
            </div> */}
          </div>
        </div>
        <p className="text-slate-600 text-center text-lg px-4 py-2">
          We build Refnet to help developers to showcase their proof of work effortlessly and stand
          out in the eye of recruiters.
        </p>
        <p className="text-slate-500 text-center">Made by Arpit Blagan with ❤️.</p>
        <div className="flex items-center justify-between">
          <div className="flex gap-4 items-center">
            <Link
              href="https://github.com/ArpitBlagan/Refnet"
              target="_blank"
              className="text-sm underline text-slate-600"
            >
              Github
            </Link>
            <Link href="/signup" className="text-sm underline text-slate-600">
              Signin/Signup
            </Link>
          </div>
          <div className="flex gap-4 items-center">
            <Link href="/posts" className="text-sm underline text-slate-600">
              Posts
            </Link>
            <Link href="/about" className="text-sm underline text-slate-600">
              About
            </Link>
          </div>
        </div>
      </div>
      <hr className="border border-zinc-900" />
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024-present Inc. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
