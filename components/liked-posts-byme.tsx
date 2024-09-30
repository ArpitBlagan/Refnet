"use client";
import axios from "axios";
import PostCard from "./post-card";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const LikedPosts = async ({ userId }: { userId: string }) => {
  const [likedPosts, setLikedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getLikedPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/likedPost?userId=${userId}`);
        setLikedPosts(res.data);
      } catch (err) {
        toast.error(
          "Somehting went wrong while fetching the liked posts by you."
        );
      } finally {
        setLoading(false);
      }
    };
    getLikedPosts();
  }, [userId]);
  return (
    <div>
      {!loading ? (
        <div>
          {likedPosts.map((ele, index) => {
            return (
              <PostCard
                postData={ele}
                showToOther={false}
                userId={userId}
                key={index}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex items-center jusityf-center">
          <p>Not able to fetch liked posts. please try again later</p>
        </div>
      )}
    </div>
  );
};

export default LikedPosts;
