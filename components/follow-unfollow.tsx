"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "sonner";
import axios from "axios";

const FollowUnFollow = ({
  userId,
  following,
  userPostId,
}: {
  userId: string;
  following: string[];
  userPostId: string;
}) => {
  const [status, setStatus] = useState("");
  useEffect(() => {
    console.log(userId, userPostId);
    if (following.includes(userId)) {
      setStatus("Unfollow");
    } else {
      setStatus("Follow");
    }
  }, [userId, following, userPostId]);
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    if (!userId) {
      return toast.error("You need to Sign in first.");
    }
    setLoading(true);
    try {
      if (status == "Unfollow") {
        setStatus("Follow");
        await axios.delete(
          `/api/follow?followerId=${userId}&followingId=${userPostId}`
        );
      } else {
        setStatus("Unfollow");
        await axios.post("/api/follow", {
          followerId: userId,
          followingId: userPostId,
        });
      }
    } catch (err) {
      toast.error(
        "Not able to perform the specific operation please try again later 🥲."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {userId != userPostId && (
        <Button
          onClick={(e) => {
            e.preventDefault();
            handleClick();
          }}
          disabled={loading}
          className="border text-semibold p-1 px-3 border-blue-800 text-blue-400 hover:bg-blue-100 duration-300 ease-in-out"
        >
          {loading == false && <p>{status}</p>}
        </Button>
      )}
    </div>
  );
};
export default FollowUnFollow;
