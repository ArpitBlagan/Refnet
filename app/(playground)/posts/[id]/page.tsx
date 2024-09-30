import { getPostById } from "@/app/actions/post";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CommentSection from "@/components/comment-section";
import PostCard from "@/components/post-card";
import { getServerSession } from "next-auth";

const page = async ({ params }: { params: any }) => {
  const session = await getServerSession(authOptions);

  const id = params.id;
  const res = await getPostById(id);
  if (res.error) {
  } else {
    return (
      <div
        className="flex-1 ml-[50px] md:ml-[250px] w-full overflow-y-scroll 
    flex flex-col justify-start min-h-full  my-7"
      >
        <div>
          <h1 className="text-2xl font-semibold">Post</h1>
        </div>

        <PostCard
          postData={res.postData}
          showToOther={false}
          userId={session.user.id}
        />
        <CommentSection postId={id} userId={session.user.id} />
        <div className="flex items-center justify-center mb-10">
          <p className="text-gray-600">No comments left</p>
        </div>
      </div>
    );
  }
};

export default page;
