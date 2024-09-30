import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { postId, userId, response } = await req.json();
  try {
    await prisma.opinion.create({
      data: {
        postId,
        userId,
        response,
      },
    });
    return NextResponse.json({
      status: "202",
      message: "Successfully added you opinion",
    });
  } catch (err) {
    return NextResponse.json({
      status: "500",
      error: "Not able to add your opinion",
    });
  }
};
