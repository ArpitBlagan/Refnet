"use client";
import {
  RiHomeLine,
  RiHomeFill,
  RiSearchLine,
  RiSearchFill,
  RiNotificationLine,
  RiNotificationFill,
  RiUserLine,
  RiUserFill,
  RiUploadLine,
  RiUploadFill,
} from "@remixicon/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    text: "Refnet",
    icon: (
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="h-[25px] w-[30px]"
      >
        <path
          fill="#F2F4F8"
          d="M23.4,-9.7C30.9,15.6,38.1,39,31.9,43.3C25.8,47.6,6.2,32.9,-5.5,21.2C-17.2,9.4,-21.2,0.6,-19,-17.4C-16.8,-35.4,-8.4,-62.6,-0.2,-62.6C7.9,-62.5,15.8,-35.1,23.4,-9.7Z"
          transform="translate(100 100)"
        />
      </svg>
    ),
    path: "/",
  },
  {
    text: "Home",
    icon: <RiHomeLine />,
    selectedIcon: <RiHomeFill />,
    path: "/posts",
  },
  {
    text: "Explore",
    icon: <RiSearchLine />,
    selectedIcon: <RiSearchFill />,
    path: "/explorer",
  },
  {
    text: "Notifications",
    icon: <RiNotificationLine />,
    selectedIcon: <RiNotificationFill />,
    path: "/notifications",
  },
  {
    text: "Upload",
    icon: <RiUploadLine />,
    selectedIcon: <RiUploadFill />,
    path: "/upload",
  },
  {
    text: "Profile",
    icon: <RiUserLine />,
    selectedIcon: <RiUserFill />,
    path: "/profile",
  },
];
function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="md:w-[235px] overflow-hidden fixed left-0  border-r border-zinc-800 w-[50px] flex flex-col gap-7 items-center h-full px-7 my-7 ">
      {items.map((ele, index) => {
        return (
          <Link
            href={ele.path}
            key={index}
            className={`flex items-center font-semibold justify-center gap-3 py-2 px-3 rounded-xl hover:bg-gray-700 duration-300 ease-in-out ${
              ele.path == pathname ? " bg-gray-800 text-blue-400" : ""
            }`}
          >
            {ele.path == pathname ? ele.selectedIcon : ele.icon}
            <span className="hidden md:inline">{ele.text}</span>
          </Link>
        );
      })}
    </div>
  );
}

export default Sidebar;
