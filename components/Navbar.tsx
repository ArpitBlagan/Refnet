"use client";
import {
  RiArrowRightFill,
  RiCloseLine,
  RiGithubFill,
  RiMenu4Line,
  RiUserFill,
} from "@remixicon/react";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import Image from "next/image";
const midLinks = [
  { label: "About us", url: "/about" },
  { label: "Posts", url: "/posts" },
];

const Navbar = () => {
  const { data: session, status } = useSession();
  const [isVisible, setIsVisible] = useState(true);
  const [menuBar, setMenuBar] = useState(false);
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "circIn" }}
      className={`flex items-center pt-7 mx-7  border-b border-zinc-800 overflow-hidden 
        ${isVisible ? "translate-y-[0]" : "translate-y-[-100%]"}
         sticky  z-10 backdrop-blur-sm 
    lg:backdrop-blur-lg absolute top-0`}
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
      <div className="flex-grow items-center justify-center  gap-4 hidden lg:flex">
        <div className="flex items-center justify-center gap-10">
          {midLinks.map((ele, index) => {
            return (
              <Link
                href={ele.url}
                key={index}
                className="hover:bg-gray-700 py-1 px-2 rounded-xl  ease-in-out duration-100"
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
      <div className="lg:flex hidden gap-5 items-center   justify-end">
        {status == "authenticated" ? (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex gap-2 items-center cursor-pointer hover:bg-gray-700 duration-300 ease-in-out py-2 px-4 rounded-xl">
                  <RiUserFill />
                  <p>Profile</p>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  <Link href="/profile" className="flex items-center gap-3">
                    <Image
                      src={session.user?.image || ""}
                      alt="default"
                      height={50}
                      width={50}
                      className="rounded-full"
                    />
                    <p>{session.user?.name}</p>
                  </Link>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>{session.user?.email}</DropdownMenuItem>
                <DropdownMenuItem>
                  <Button
                    onClick={async (e) => {
                      e.preventDefault();
                      signOut();
                    }}
                  >
                    Logout
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/signin"
              className="hover:bg-gray-700 py-1 px-2 rounded-xl duration-1 ease-in-out duration-100"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className=" bg-gray-200 text-black hover:bg-gray-300 py-3 px-2 rounded-xl duration-1 ease-in-out duration-100"
            >
              Get started
            </Link>
          </div>
        )}
      </div>
      <div className="flex lg:hidden items-center justify-end flex-1">
        <RiMenu4Line
          onClick={() => {
            setMenuBar(true);
          }}
        />
      </div>
      <div
        className={`bg-zinc-200 z-99 text-black flex flex-col justify-center gap-3 px-3 py-2 items-center w-[300px] absolute top-10 right-0
        ${menuBar ? "translate-x-[0]" : "translate-x-[130%]"}
      `}
        style={{ transition: "transform .8s ease-in-out" }}
      >
        <div className="flex items-center justify-end w-full">
          <RiCloseLine
            onClick={() => {
              setMenuBar(false);
            }}
          />
        </div>
        {midLinks.map((ele, index) => {
          return (
            <Link
              href=""
              key={index}
              className="hover:bg-gray-300 py-1 px-2 rounded-xl w-full  ease-in-out duration-100"
            >
              {ele.label}
            </Link>
          );
        })}
        {status === "authenticated" ? (
          <div>{status}</div>
        ) : (
          <div className="hidden">
            <Link
              href="/signin"
              className="hover:bg-gray-300 py-1 px-2 rounded-xl w-full duration-1 ease-in-out duration-100"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className=" text-black w-full hover:bg-gray-300 py-3 px-2 rounded-xl duration-1 ease-in-out duration-100"
            >
              Get started
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Navbar;
