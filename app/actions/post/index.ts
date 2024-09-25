import prisma from "@/db";

export const getPosts = async (postPerPage: number, pageNumber: number) => {
  const skip = (pageNumber - 1) * postPerPage;
  console.log("hehehe", postPerPage, skip, pageNumber);
  try {
    const posts = await prisma.post.findMany({
      take: postPerPage,
      skip,
      orderBy: { postedAt: "desc" },
    });
    console.log("post", posts);
    return posts;
  } catch (err) {
    console.log("error", err);
    return { error: "Not able to fetch posts try again later." };
  }
};
