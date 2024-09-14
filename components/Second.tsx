import { RiArrowRightLine, RiInfinityLine } from "@remixicon/react";
import Link from "next/link";
import Line from "./line";

const Second = () => {
  return (
    <div className="h-[30vh] relative flex flex-col gap-3">
      <div className="text-gray-300 flex flex-col items-center">
        <h1 className="text-[3vw] leading-[1]">
          Showcase Your Skills, Unlock Referrals.
        </h1>
        <p className="text-center text-slate-600">
          Stand out from the crowd and catch the eye of recruiters 👀.
        </p>
      </div>
      <div className="flex items-center justify-center gap-5">
        <Link
          href="/"
          className="flex items-center py-2 px-4 border hover:gap-3 duration-300 ease-in-out border-zinc-700 rounded-xl hover:bg-gray-800"
        >
          Demo <RiArrowRightLine className="rotate-[-45deg]" />
        </Link>
        <Link
          className="flex items-center px-4 py-2 bg-white hover:gap-3 duration-300 ease-in-out text-black rounded-xl "
          href="/"
        >
          Get Started <RiInfinityLine className="rotate-[-45deg]" />
        </Link>
      </div>
    </div>
  );
};

export default Second;
