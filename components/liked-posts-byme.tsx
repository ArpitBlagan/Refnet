"server component";
import { getLikedPosts } from "@/app/actions/post";
import PostCard from "./post-card";

const LikedPosts = async ({ userId }: { userId: string }) => {
  const likedPosts = await getLikedPosts(userId);
  if (likedPosts.error) {
    return (
      <div className="flex items-center my-10">
        <p>Something went wrong please try again later.</p>
      </div>
    );
  } else {
    return (
      <div>
        {likedPosts &&
          likedPosts.posts &&
          likedPosts?.posts.map((ele, index) => {
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
    );
  }
};

export default LikedPosts;
