import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({
      error: "we need post id to fetch the data",
      status: "400",
    });
  }
  try {
    const comments = await prisma.comment.findMany({
      where: { postId: id },
      include: {
        user: true,
        children: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(comments);
  } catch (err) {
    return NextResponse.json({
      error: "Something went wrong 👀.",
      status: "500",
    });
  }
};

export const POST = async (req: NextRequest) => {
  const { postId, comment, userId } = await req.json();
  try {
    const res = await prisma.comment.create({
      data: {
        postId,
        userId,
        comment,
      },
    });
    return NextResponse.json({ message: "comment added successfully." });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      error: "Not able to add comment",
      status: "500",
    });
  }
};
