"use client";
import { RiSearchLine } from "@remixicon/react";
import React, { useState } from "react";
import { Input } from "./ui/input";

const SearchSection = () => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="flex items-center justify-center">
      <div
        className={`relative ${
          isFocused ? "w-8/12" : "w-1/2"
        } transition-all duration-300 ease-in-out`}
      >
        <Input
          type="text"
          placeholder="Search..."
          className="w-full py-5 font-semibold pl-10 pr-4 text-gray-900 bg-white border-2 border-gray-300 rounded-full focus:outline-none  transition-all duration-300 ease-in-out"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <RiSearchLine
            className={`h-5 w-5 ${
              isFocused ? "text-black" : "text-gray-400"
            } transition-all duration-300 ease-in-out`}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
