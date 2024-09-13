"use client";
import {
  RiArrowRightFill,
  RiGithubFill,
  RiMenu4Line,
  RiNavigationLine,
} from "@remixicon/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const midLinks = [
  { label: "About us", url: "/about" },
  { label: "Features", url: "/features" },
  { label: "Pricing", url: "" },
];

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    // If scrolling down, hide the navbar; if scrolling up, show the navbar
    if (currentScrollY > lastScrollY) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);
  return (
    <div
      className={`flex items-center pt-7 mx-7  border-b border-zinc-800 overflow-hidden
        ${isVisible ? "translate-y-[0]" : "translate-y-[-100%]"}
         sticky  z-10 backdrop-blur-sm 
    md:backdrop-blur-lg absolute top-0 overflow-hidden`}
      style={{ transition: "transform 0.3s ease-in-out" }}
    >
      <Link href="/" className="flex items-center gap-2">
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="h-[70px] w-[100px]"
        >
          <path
            fill="#F2F4F8"
            d="M23.4,-9.7C30.9,15.6,38.1,39,31.9,43.3C25.8,47.6,6.2,32.9,-5.5,21.2C-17.2,9.4,-21.2,0.6,-19,-17.4C-16.8,-35.4,-8.4,-62.6,-0.2,-62.6C7.9,-62.5,15.8,-35.1,23.4,-9.7Z"
            transform="translate(100 100)"
          />
        </svg>
        <p>Refnet</p>
      </Link>
      <div className="flex-grow items-center justify-center  gap-4 hidden md:flex">
        <div className="flex items-center justify-center gap-10">
          {midLinks.map((ele, index) => {
            return (
              <Link
                href=""
                key={index}
                className="hover:bg-gray-700 py-1 px-2 rounded-xl duration-1 ease-in-out duration-100"
              >
                {ele.label}
              </Link>
            );
          })}
          <Link
            href=""
            className="flex items-center gap-1 hover:bg-gray-700 py-1 px-2 rounded-xl duration-1 ease-in-out duration-100"
          >
            <RiGithubFill />{" "}
            <RiArrowRightFill className="rotate-[-45deg] text-gray-600" />
          </Link>
        </div>
      </div>
      <div className="md:flex hidden gap-5 items-center   justify-end">
        <Link
          href="/signin"
          className="hover:bg-gray-700 py-1 px-2 rounded-xl duration-1 ease-in-out duration-100"
        >
          Signin
        </Link>
        <Link
          href="/sigup"
          className=" bg-gray-200 text-black hover:bg-gray-300 py-3 px-2 rounded-xl duration-1 ease-in-out duration-100"
        >
          Get started
        </Link>
      </div>
      <div className="flex md:hidden items-center justify-end flex-1">
        <RiMenu4Line />
      </div>
    </div>
  );
};

export default Navbar;
