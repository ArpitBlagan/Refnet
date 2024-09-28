import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const pageNumber = req.nextUrl.searchParams.get("pageNumber");
  const postPerPage = req.nextUrl.searchParams.get("pagePerPage");
  const id = req.nextUrl.searchParams.get("id");
  const type = req.nextUrl.searchParams.get("type");
  const skip = (Number(pageNumber) - 1) * Number(postPerPage);
  console.log("hehehe", postPerPage, skip, pageNumber);
  let whereClause: any = id ? { id } : {};
  if (type && type != "All") {
    whereClause.type = type;
  }
  try {
    const posts = await prisma.post.findMany({
      where: whereClause,
      take: Number(postPerPage),
      skip,
      orderBy: { postedAt: "desc" },
    });
    console.log("post", posts);
    if (id) {
      return { message: "successfully fetched posts", post: posts[0] };
    }
    return NextResponse.json({ posts });
  } catch (err) {
    console.log("error", err);
    return NextResponse.json({
      error: "Not able to fetch posts try again later.",
      status: 500,
    });
  }
};
