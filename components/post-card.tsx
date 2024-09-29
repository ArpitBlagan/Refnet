"use client";
import {
  RiChat3Line,
  RiDeleteBinLine,
  RiHeart3Fill,
  RiHeart3Line,
  RiMore2Line,
  RiShareFill,
  RiShareForwardLine,
} from "@remixicon/react";
import ReactMarkdown from "react-markdown";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import RenderMedia from "./render-media";
import { checkForUserId, readableFormat } from "@/common";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import FollowUnFollow from "./follow-unfollow";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
const PostCard = ({
  postData,
  showToOther,
  userId,
}: {
  postData: any;
  showToOther: boolean;
  userId: string;
}) => {
  // const deletePost = async (postId: any) => {
  //   "use server";
  //   const res: any = await deletePost(postId);
  //   if (res?.error) {
  //     toast.error("Not able to delete the post please try again later.");
  //   } else {
  //     toast.success("Post deleted successfully.");
  //   }
  // };
  const [likeStatus, setLikeStatus] = useState("notLiked");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (checkForUserId(userId, postData.likes)) {
      setLikeStatus("liked");
    } else {
      setLikeStatus("notLiked");
    }
  }, [postData, userId]);
  const handleLike = async () => {
    if (loading) {
      return;
    }
    if (userId.length == 0 || !userId) {
      return toast.error("You need sign in to like/unlike any post.");
    }
    setLoading(true);
    try {
      if (likeStatus == "notLiked") {
        setLikeStatus("liked");
        await axios.post("/api/post", { postId: postData.id, userId });
      } else {
        setLikeStatus("notLiked");
        await axios.delete(`/api/post?postId=${postData.id}&userId=${userId}`);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-4 border-b border-zinc-800 py-4 ">
      {!showToOther && (
        <div className="flex items-center gap-3 border-b border-zinc-800 py-2">
          <Image
            src={postData.user.profileImage || ""}
            alt="image"
            width={70}
            height={70}
            className="rounded-full"
          />
          <div>
            <p className="font-bold">{postData.user.name}</p>
            <p className="text-gray-600">{postData.user.email}</p>
          </div>
          <FollowUnFollow
            userId={userId}
            userPostId={postData.user.id}
            following={postData.user.following}
          />
          <div className="flex-1 flex items-center justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-transparent">
                  <RiMore2Line className="cursor-pointer" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className=" font-semibold">
                <DropdownMenuItem className="flex items-center gap-2 ">
                  Share <RiShareFill />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {postData.userId == userId && (
                  <DropdownMenuItem
                    className="flex items-center gap-2"
                    onClick={() => {
                      // deletePost(postData.id);
                    }}
                  >
                    Delete <RiDeleteBinLine />
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}
      <div className="flex items-center justify-end">
        <p className="text-gray-600">{readableFormat(postData.postedAt)}</p>
      </div>
      <div>
        {/* <p className="font-semibold text-gray-300 text-md"> */}
        <ReactMarkdown>{postData.caption}</ReactMarkdown>
        {/* </p> */}
      </div>
      <RenderMedia media={postData.media} />

      <div className="px-7 flex items-center gap-10">
        <div className="flex items-center gap-1">
          {likeStatus == "liked" ? (
            <RiHeart3Fill
              onClick={(e) => {
                e.preventDefault();
                handleLike();
              }}
              className={`text-red-700 cursor-pointer`}
            />
          ) : (
            <RiHeart3Line
              onClick={(e) => {
                e.preventDefault();
                handleLike();
              }}
              className="cursor-pointer"
            />
          )}
          {/* {postData.likes.length} */}
        </div>
        <Link href={`/posts/${postData.id}`}>
          <RiChat3Line className="cursor-pointer" />
        </Link>
        <RiShareForwardLine className="cursor-pointer" />
      </div>
    </div>
  );
};

export default PostCard;
