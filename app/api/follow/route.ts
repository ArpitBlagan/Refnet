import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { followerId, followingId } = await req.json();
  try {
    await prisma.follower.create({
      data: {
        followerId,
        followingId,
      },
    });
    return NextResponse.json({ message: "Operation performed" });
  } catch (err) {
    return NextResponse.json({
      error: "Not able to perform the operation",
      status: "500",
    });
  }
};

export const DELETE = async (req: NextRequest) => {
  const followerId = req.nextUrl.searchParams.get("followerId");
  const followingId = req.nextUrl.searchParams.get("followingId");
  if (!followerId || !followingId) {
    return NextResponse.json({});
  }
  try {
    await prisma.follower.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });
    return NextResponse.json({ message: "Operation performed" });
  } catch (err) {
    return NextResponse.json({
      error: "Not able to perform the operation",
      status: "500",
    });
  }
};
