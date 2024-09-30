"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import axios from "axios";
import { toast } from "sonner";
import { Triangle } from "react-loader-spinner";
import { getTimeDiffOrDate, readableFormat, trimText } from "@/common";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  RiClipboardLine,
  RiMore2Fill,
  RiReplyLine,
  RiThumbUpLine,
} from "@remixicon/react";

const CommentSection = ({ postId, userId }: any) => {
  const [comments, setComments] = useState<any[]>([]);
  const [initialLoading, setInitialLoading] = useState(false);
  const [otherLoading, setOtherLoading] = useState(false);
  const [comment, setComment] = useState("");
  const router = useRouter();
  useEffect(() => {
    const getComment = async () => {
      if (comments.length == 0) {
        setInitialLoading(true);
      }
      try {
        const res = await axios.get(`/api/comment?id=${postId}`);
        console.log(res.data);
        setComments(res.data);
      } catch (err) {
        toast.error("not able to fetch comments for this post 🥲.");
      } finally {
        setInitialLoading(false);
      }
    };
    getComment();
  }, [postId]);
  const handleSubmit = async () => {
    const trimComment = trimText(comment);
    if (trimComment.length == 0) {
      return toast.error("Please enter valid comment 😁.");
    }
    console.log(trimComment);
    setOtherLoading(true);
    toast.promise(
      async () => {
        setOtherLoading(true);
        const res = await axios.post(`/api/comment`, {
          postId,
          userId,
          comment: trimComment,
        });
        console.log(res);
        if (res.data.error) {
          throw new Error("something went wron");
        }
        return res;
      },
      {
        loading: "Loading...",
        success: () => {
          setOtherLoading(false);
          setComment("");
          return "New comment added successfully 😁.";
        },
        error: () => {
          setOtherLoading(false);
          return "Not able to add comment right now please try again later ❌.";
        },
      }
    );
  };
  return (
    <div>
      <div className="flex flex-col gap-3 border-t border-zinc-700 py-4">
        {userId && (
          <form className="flex items-center gap-2">
            <Input
              placeholder="comment your thoughts..."
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              className="flex-1 py-2 pl-3 h-[50px] font-semibold resize-none bg-slate-900 border border-zinc-900"
            />
            <Button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="bg-green-600 hover:bg-green-700 py-2"
              disabled={otherLoading}
            >
              comment
            </Button>
          </form>
        )}
        <div className="">
          <h1 className="text-2xl font-semibold pb-3 border-b border-zinc-800">
            Comments
          </h1>
          {initialLoading ? (
            <div className="flex items-center justify-center">
              <Triangle />
            </div>
          ) : (
            <div className="">
              {comments.map((ele, index) => {
                return (
                  <div className="flex" key={index}>
                    <div className="flex-1 px-5 flex flex-col gap-2">
                      <div className=" flex items-center gap-2   py-2">
                        <Image
                          src={ele.user.profileImage}
                          alt="image"
                          width={50}
                          height={50}
                          className="rounded-full"
                        />
                        <p className="text-md font-bold">{ele.user.name}</p>
                        <p className="text-gray-400 text-sm font-semibold">
                          {getTimeDiffOrDate(ele.createdAt)}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 ">
                        <p className="text-lg p-2 pl-3 bg-gray-700 rounded-3xl">
                          {ele.comment}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div>
                          <RiThumbUpLine className="text-gray-600" />
                        </div>
                        <RiClipboardLine className="text-gray-600" />
                        <div className="flex items-center gap-1">
                          <RiReplyLine className="text-gray-600" />
                          <p className="text-gray-600">Reply</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <RiMore2Fill />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
