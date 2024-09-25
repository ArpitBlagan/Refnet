"use client";

import { useEffect, useRef, useState } from "react";
import PostCard from "./post-card";
import { getPosts } from "@/app/actions/post";
import { toast } from "sonner";
import { Triangle } from "react-loader-spinner";
const POSTS_PER_PAGE = 10;
const Posts = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const loadPosts = async (pageNumber: number) => {
    setLoading(true);
    ("use server");
    try {
      const data = await getPosts(POSTS_PER_PAGE, pageNumber);
      console.log(data);
      // setPosts((prev) => [
      //   ...prev,
      //   //@ts-ignore
      //   ...newPosts,
      // ]);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts(page);
  }, [page]);

  useEffect(() => {
    const lastPostElement = document.querySelector("#last-post");
    if (!lastPostElement) return;

    const loadMore = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && !loading) {
        setPage((prev) => prev + 1);
      }
    };

    observer.current = new IntersectionObserver(loadMore);
    if (lastPostElement) {
      observer.current.observe(lastPostElement);
    }

    return () => {
      if (observer.current && lastPostElement) {
        observer.current.unobserve(lastPostElement);
      }
    };
  }, [loading]);
  return (
    <div>
      {posts.map((ele, index) => {
        return <PostCard />;
      })}
      {/* <div id="last-post" style={{ height: "20px" }} /> */}
      {loading && (
        <div className="flex items-center justify-center">
          <Triangle />
        </div>
      )}
    </div>
  );
};

export default Posts;
