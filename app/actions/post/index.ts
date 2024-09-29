import prisma from "@/db";

export const getPostById = async (id: string) => {
  try {
    const postData = await prisma.post.findFirst({
      where: { id },
      include: {
        likes: true,
        user: {
          include: {
            followers: true,
            following: true,
          },
        },
      },
    });
    return { message: "", postData };
  } catch (err) {
    return { error: "not able to fetch post data" };
  }
};

export const deletePost = async (postId: string) => {
  try {
    await prisma.post.delete({
      where: { id: postId },
    });
    return { message: "post deleted successfully" };
  } catch (err) {
    return { error: "not able to delete the post" };
  }
};

export const getLikedPosts = async (userId: string) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        userId,
        likes: {
          some: { userId },
        },
      },
      orderBy: { postedAt: "desc" },
      include: {
        likes: true,
        user: true,
      },
    });
    return { message: "fetched successfully", posts };
  } catch (err) {
    return { error: "not able to fetch liked to the posts" };
  }
};

// Todo == >
// handle where to create notification and create ex like on user register some like and follow
// create some pool feature about the pooling for project levels simple medium brilliant
// infinite scrolling
