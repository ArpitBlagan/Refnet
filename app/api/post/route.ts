import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const pageNumber = req.nextUrl.searchParams.get("pageNumber");
  const postPerPage = req.nextUrl.searchParams.get("postPerPage");
  const id = req.nextUrl.searchParams.get("id");
  const userId = req.nextUrl.searchParams.get("userId");
  const type = req.nextUrl.searchParams.get("type");
  const skip = (Number(pageNumber) - 1) * Number(postPerPage);
  console.log("hehehe", postPerPage, skip, pageNumber, id);
  let whereClause: any = {};

  // Add the id to whereClause if it's defined and not "undefined"
  if (id && id !== "undefined") {
    whereClause.id = id;
  }
  if (userId && userId !== "undefined") {
    whereClause.userId = userId;
  }
  // Add type to whereClause if it's defined and not "All"
  if (type && type !== "ALL") {
    whereClause.type = type;
  }
  try {
    const posts = await prisma.post.findMany({
      where: whereClause,
      take: Number(postPerPage),
      skip,
      orderBy: { postedAt: "desc" },
      include: {
        likes: true,
        user: {
          include: { followers: true, following: true },
        },
      },
    });
    console.log("post", posts);

    return NextResponse.json(posts);
  } catch (err) {
    console.log("error", err);
    return NextResponse.json({
      error: "Not able to fetch posts try again later.",
      status: 500,
    });
  }
};

export const POST = async (req: NextRequest) => {
  const { postId, userId } = await req.json();
  try {
    await prisma.like.create({
      data: {
        postId,
        userId,
      },
    });
    return NextResponse.json({ message: "like added successfully" });
  } catch (err) {
    return NextResponse.json({
      error: "not able to add like to the post",
      stataus: 500,
    });
  }
};

export const DELETE = async (req: NextRequest) => {
  const postId = req.nextUrl.searchParams.get("postId");
  const userId = req.nextUrl.searchParams.get("userId");
  if (!postId || !userId) {
    return NextResponse.json({
      error: "not able to unlike to the post",
      stataus: 500,
    });
  }
  try {
    await prisma.like.delete({
      where: {
        userId_postId: { postId, userId },
      },
    });
    return NextResponse.json({ message: "like deleted successfully" });
  } catch (err) {
    return NextResponse.json({
      error: "not able to unlike to the post",
      stataus: 500,
    });
  }
};
