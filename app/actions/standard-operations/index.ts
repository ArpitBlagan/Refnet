import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/db";
import { getServerSession } from "next-auth";

export const follow = async (userId: string) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { error: "You should first sign in 👀." };
  }
  try {
    await prisma.follower.create({
      data: {
        followerId: session.user.id,
        followingId: userId,
      },
    });
    // sendNotification();
    return { message: "operation performed successfully" };
  } catch (err) {
    return { error: "Not able to perform the operation 🥲." };
  }
};

export const unFollow = async (userId: string) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { error: "You should first sign in 👀." };
  }
  try {
    await prisma.follower.deleteMany({
      where: {
        followerId: session.user.id,
        followingId: userId,
      },
    });
    return { message: "operation performed successfully" };
  } catch (err) {
    return { error: "Not able to perform the operation 🥲." };
  }
};

export const giveLike = async (postId: string) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { error: "You should first sign in 👀." };
  }
  try {
    await prisma.like.create({
      data: {
        postId,
        userId: session.user.id,
      },
    });
    // sendNotification();
    return { message: "operation performed successfully" };
  } catch (err) {
    return { error: "Not able to perform the operation 🥲." };
  }
};

export const unLike = async (postId: string) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { error: "You should first sign in 👀." };
  }
  try {
    await prisma.like.delete({
      where: {
        userId_postId: {
          userId: session.user.id,
          postId,
        },
      },
    });
    // sendNotification();
    return { message: "operation performed successfully" };
  } catch (err) {
    return { error: "Not able to perform the operation 🥲." };
  }
};

export const postComment = async (postId: string, comment: string) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { error: "You should first sign in 👀." };
  }
  try {
    await prisma.comment.create({
      data: {
        comment,
        postId,
        userId: session.user.id,
      },
    });
    // sendNotification();
    return { message: "operation performed successfully" };
  } catch (err) {
    return { error: "Not able to perform the operation 🥲." };
  }
};

export const deleteComment = async (commentId: string) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { error: "You should first sign in 👀." };
  }
  try {
    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
    return { message: "operation performed successfully" };
  } catch (err) {
    return { error: "Not able to perform the operation 🥲." };
  }
};

export const likeComment = async (commentId: string) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { error: "You should first sign in 👀." };
  }
  try {
    await prisma.like.create({
      data: {
        userId: session.user.id,
        commentId,
      },
    });
    //send notification
    return { message: "operation performed successfully." };
  } catch (err) {
    return { error: "Not able to perform the operation 🥲." };
  }
};

export const unlikeComment = async (commentId: string) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { error: "You should first sign in 👀." };
  }
  try {
    await prisma.like.delete({
      where: {
        userId_commentId: {
          commentId,
          userId: session.userId,
        },
      },
    });
    //send notification
  } catch (err) {
    return { error: "Not able to perform the operation 🥲." };
  }
};

export const repyToComment = async (
  commentId: string,
  comment: string,
  postId: string
) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { error: "You should first sign in 👀." };
  }
  try {
    await prisma.comment.create({
      data: {
        parentId: commentId,
        comment,
        postId: postId,
        userId: session.user.id,
      },
    });
  } catch (err) {
    return { error: "Not able to perform the operation 🥲." };
  }
};
