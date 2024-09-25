"use client";
import {
  RiChat3Line,
  RiDeleteBinLine,
  RiHeart3Fill,
  RiMore2Line,
  RiShareFill,
  RiShareForwardLine,
} from "@remixicon/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useSession } from "next-auth/react";
import RenderMedia from "./render-media";
const PostCard = () => {
  const { data: session, status } = useSession();
  return (
    <div className="flex flex-col gap-3 border-b border-zinc-800 py-4 ">
      <div className="flex items-center gap-3 border-b border-zinc-800 py-2">
        <img
          src={session?.user?.image || ""}
          width={50}
          height={50}
          className="rounded-full"
        />
        <p className="font-bold">Arpit Blagan</p>
        <div className="flex-1 ">
          <p>Date</p>
        </div>
        <div className="z-99">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <RiMore2Line className="cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" font-semibold">
              <DropdownMenuItem className="flex items-center gap-2 ">
                Share <RiShareFill />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2 ">
                Delete <RiDeleteBinLine />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div>
        <p className="font-semibold">caption</p>
      </div>
      <div className="flex-1 px-7h-40 w-full flex items-center justify-center">
        <RenderMedia
          media={["https://pirooo.s3.ap-southeast-2.amazonaws.com/back.mp4"]}
        />
      </div>
      <div className="px-7 flex items-center gap-10">
        <RiHeart3Fill className="text-red-700" />
        <RiChat3Line />
        <RiShareForwardLine />
      </div>
    </div>
  );
};

export default PostCard;
