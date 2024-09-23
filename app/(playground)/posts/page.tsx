import Posts from "@/components/Posts";
import Rightbar from "@/components/Rightbar";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div
      className="flex-1 ml-[50px] md:ml-[250px] lg:mr-[400px] overflow-y-scroll 
      flex flex-col justify-start min-h-full  my-7"
    >
      <div className="py-4 border-b border-zinc-800">
        <h1 className="font-semibold text-3xl">Feed</h1>
      </div>
      <Posts />
    </div>
  );
};

export default page;
