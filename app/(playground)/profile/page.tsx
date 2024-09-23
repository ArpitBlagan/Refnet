import { getProfileInfo } from "@/actions/get-profile";
import { isMissing, readableFormat } from "@/common";
import EditProfile from "@/components/edit-profile";
import PostCard from "@/components/post-card";

import {
  RiCalendarTodoFill,
  RiGithubFill,
  RiLinkedinBoxFill,
  RiLinkM,
  RiTwitterXFill,
} from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";

async function page() {
  const res = await getProfileInfo();
  console.log(res);
  if (res.error || !res) {
    return (
      <div
        className="flex-1 ml-[50px] md:ml-[250px] lg:mr-[400px] overflow-y-scroll 
    flex flex-col justify-start min-h-full  mt-7 mb-10 w-full"
      >
        Something went wrong 🥲.
      </div>
    );
  } else {
    return (
      <div
        className="flex-1 ml-[50px] md:ml-[250px] lg:mr-[400px] overflow-y-scroll 
      flex flex-col justify-start min-h-full  mt-7 mb-10 w-full"
      >
        <div className="h-full flex flex-col gap-10 py-7 px-7 w-full">
          <div className="flex items-center gap-4 py-7 border-b border-white ">
            <div>
              <h1 className="text-4xl font-bold">{res.name}</h1>
              <p className="text-gray-500">{res.email}</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="">
              {isMissing(res) && (
                <p className="py-2 bg-red-500 px-4 rounded-md text-md font-semibold">
                  Your Profile is complete 🥲 click on Edit profile and complete
                  it.
                </p>
              )}
            </div>

            <EditProfile />
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex md:flex-row flex-col items-center gap-3 ">
              <div className="border rounded-full">
                <Image
                  src={res.profileImage || ""}
                  alt="image"
                  width={100}
                  height={100}
                  className="rounded-full"
                />
              </div>
              <p className="flex-1 text-start font-semibold text-md">
                {res.description}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <p className="flex items-center gap-1 text-gray-500 text-sm font-semibold">
                  {" "}
                  <RiCalendarTodoFill /> Joined at{" "}
                  {readableFormat(res.joinedAt)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold flex items-center gap-1">
                  <span>{res.following.length}</span>
                  <span className="text-gray-500">Following</span>
                </p>
                <p className="text-sm font-semibold flex items-center gap-1">
                  <span>{res.followers.length}</span>
                  <span className="text-gray-500">Followers</span>
                </p>
              </div>
            </div>
            {res.resumeLink && (
              <Link
                href={res.resumeLink}
                className="flex items-center hover:underline duration-300 ease-in-out font-bold"
              >
                Resume
                <RiLinkM size={20} />
              </Link>
            )}
            <div className="grid grid-cols-3 gap-3 ">
              {res.LinkedinLink && (
                <Link
                  href={res.LinkedinLink}
                  className="flex items-center justify-center"
                >
                  <RiLinkedinBoxFill
                    size={30}
                    className="hover:text-white text-gray-500"
                  />
                </Link>
              )}
              {res.twitterLink && (
                <Link
                  href={res.twitterLink}
                  className="flex items-center justify-center"
                >
                  <RiTwitterXFill
                    size={30}
                    className="hover:text-white text-gray-500"
                  />
                </Link>
              )}
              {res.githubLink && (
                <Link
                  href={res.githubLink}
                  className="flex items-center justify-center"
                >
                  <RiGithubFill
                    size={30}
                    className="hover:text-white text-gray-500"
                  />
                </Link>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 ">
            {["Posts", "Likes"].map((ele, index) => {
              return (
                <div
                  key={index}
                  className="border-b-[3px] border-blue-400 h-full flex items-center justify-center"
                >
                  {ele}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default page;