import Image from "next/image";
import React from "react";
import Notification from "./Notification";
import { RiMore2Fill } from "@remixicon/react";

const Rightbar = () => {
  return (
    <div className="lg:w-[400px] hidden right-0  fixed lg:flex flex-col items-start gap-7 px-3 my-7 h-full border-l border-zinc-800">
      <div className="px-7 w-full">
        <Notification />
      </div>
    </div>
  );
};

export default Rightbar;
