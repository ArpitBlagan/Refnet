import prisma from '@/db'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  const userId = req.nextUrl.searchParams.get('userId')
  if (!userId) {
    return NextResponse.json({ error: 'userId is undefined' }, { status: 500 })
  }
  try {
    const posts = await prisma.post.findMany({
      where: {
        likes: {
          some: { userId }
        }
      },
      orderBy: { postedAt: 'desc' },
      include: {
        likes: true,
        applications: true,
        user: {
          include: { followers: true, following: true }
        }
      }
    })
    return NextResponse.json(posts)
  } catch (err) {
    return NextResponse.json({ error: 'something went wrong' }, { status: 500 })
  }
}
