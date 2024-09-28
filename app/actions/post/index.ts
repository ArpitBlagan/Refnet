import prisma from "@/db";

export const getPostById = async (id: string) => {
  try {
    const postData = await prisma.post.findFirst({
      where: { id },
      include: {
        comments: {
          include: {
            user: true,
          },
        },
      },
    });
    return { message: "", postData };
  } catch (err) {
    return { error: "not able to fetch post data" };
  }
};
