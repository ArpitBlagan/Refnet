"use client";

import { useEffect, useRef, useState } from "react";
import PostCard from "./post-card";
import { toast } from "sonner";
import { Triangle } from "react-loader-spinner";
import axios from "axios";
const POSTS_PER_PAGE = 10;
const Posts = ({ id }: { id?: string }) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const loadPosts = async (pageNumber: number) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `/api/posts?id=${id}&pageNumber=${pageNumber}&postPerPage=${POSTS_PER_PAGE}`
      );
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
    <div className="my-10">
      {posts.length == 0 && (
        <p className="text-center text-gray-600 font-bold ">
          No Posts avaliable 🥲.
        </p>
      )}

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
