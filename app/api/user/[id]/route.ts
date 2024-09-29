import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, { params }: any) => {
  const id = params.id;
  try {
    await prisma.user.update({
      where: { id },
      data: {
        profileView: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({
      message: "Profile view count incremented by 1. ",
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      error: "Not able to increment profile view",
      status: 500,
    });
  }
};
