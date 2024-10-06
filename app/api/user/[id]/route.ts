import prisma from '@/db'
import { NextRequest, NextResponse } from 'next/server'

export const PATCH = async (req: NextRequest, { params }: any) => {
  const id = params.id
  try {
    await prisma.user.update({
      where: { id },
      data: {
        profileView: {
          increment: 1
        }
      }
    })

    return NextResponse.json({
      message: 'Profile view count incremented by 1. '
    })
  } catch (err) {
    return NextResponse.json({ error: 'something went wrong' }, { status: 500 })
  }
}
export const GET = async (req: NextRequest, { params }: any) => {
  const id = params.id
  const type = req.nextUrl.searchParams.get('type')
  let whereClause: any = {}
  if (type == 'following') {
    whereClause.followerId = id
  } else {
    whereClause.followingId = id
  }
  try {
    const list = await prisma.follower.findMany({
      where: whereClause,
      include: {
        follower: true,
        following: true
      }
    })
    return NextResponse.json({ message: '', status: 200, list })
  } catch (err) {
    return NextResponse.json({ error: 'something went wrong' }, { status: 500 })
  }
}
