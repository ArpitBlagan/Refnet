"use client";
import Posts from "@/components/Posts";
import { useState } from "react";
import React from "react";

const page = () => {
  const [sele, setSele] = useState("All");
  return (
    <div
      className="flex-1 ml-[50px] md:ml-[250px] lg:mr-[400px] overflow-y-scroll 
      flex flex-col justify-start min-h-full  my-7"
    >
      <div className="py-4 border-b border-zinc-800">
        <h1 className="font-semibold text-3xl">Feed</h1>
      </div>
      <div className="cursor-pointer flex item-center justify-between my-4">
        {["All", "Work", "Referals"].map((ele, index) => {
          return (
            <p
              key={index}
              onClick={() => {
                setSele(ele);
              }}
              className={`text-center w-full ${
                sele == ele
                  ? "font-bold text-blue-500 border-b-[2px] border-blue-600"
                  : ""
              }`}
            >
              {ele}
            </p>
          );
        })}
      </div>
      <Posts type={sele} />
    </div>
  );
};

export default page;
