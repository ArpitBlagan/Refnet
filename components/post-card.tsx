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
      <div className="flex-1 px-7h-40">
        related video or photos
        <div className="h-[400px] flex items-center justify-center overflow-hidden">
          <Image
            src="https://d3e230op9b6du5.cloudfront.net/bg1 (1).jpg"
            width={500}
            height={400}
            alt="Image"
            className="object-cover rounded-xl"
          />
        </div>
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
