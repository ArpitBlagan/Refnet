import { getPostById } from "@/app/actions/post";
import CommentSection from "@/components/comment-section";
import PostCard from "@/components/post-card";

const page = async ({ params }: { params: any }) => {
  const id = params.id;
  const res = await getPostById(id);
  if (res.error) {
  } else {
    return (
      <div
        className="flex-1 ml-[50px] md:ml-[250px] lg:mr-[400px] overflow-y-scroll 
    flex flex-col justify-start min-h-full  my-7"
      >
        <div>
          <h1 className="text-2xl font-semibold">Post</h1>
        </div>
        <PostCard />
        <CommentSection />
        <div className="flex items-center justify-center">
          <p className="text-gray-600">No comments left</p>
        </div>
      </div>
    );
  }
};

export default page;
