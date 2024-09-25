import prisma from "@/db";

export const getPosts = async (
  postPerPage: number,
  pageNumber: number,
  id?: string
) => {
  const skip = (pageNumber - 1) * postPerPage;
  console.log("hehehe", postPerPage, skip, pageNumber);
  const whereClause = id ? { id } : {};
  try {
    const posts = await prisma.post.findMany({
      where: whereClause,
      take: postPerPage,
      skip,
      orderBy: { postedAt: "desc" },
    });
    console.log("post", posts);
    if (id) {
      return { message: "successfully fetched posts", post: posts[0] };
    }
    return { message: "successfully fetched posts", posts };
  } catch (err) {
    console.log("error", err);
    return { error: "Not able to fetch posts try again later." };
  }
};
