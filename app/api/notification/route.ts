import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export const getNotifications = async (req: NextRequest) => {
  const pageNumber = req.nextUrl.searchParams.get("pageNumber");
  const postPerPage = req.nextUrl.searchParams.get("pagePerPage");
  const id = req.nextUrl.searchParams.get("id");
  const skip = (Number(pageNumber) - 1) * Number(postPerPage);
  const whereClause = id ? { id } : {};
  try {
    const notifications = await prisma.notification.findMany({
      where: whereClause,
      take: Number(postPerPage),
      skip,
      orderBy: { createdAt: "desc" },
    });
    console.log(notifications);
    return NextResponse.json({ notifications });
  } catch (err) {
    return NextResponse.json({
      error: "Not able to fetch posts try again later.",
      status: 500,
    });
  }
};
