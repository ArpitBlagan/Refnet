"use client";

import { useState } from "react";
import PostCard from "./post-card";

const Posts = () => {
  const [posts, setPosts] = useState<any[]>([{}]);
  return (
    <div>
      {posts.map((ele, index) => {
        return <PostCard />;
      })}
    </div>
  );
};

export default Posts;
