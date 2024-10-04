import { readableFormat } from '@/common'
import { sendNotificationToOtherBackend } from '@/common/notification'
import prisma from '@/db'

import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  const pageNumber = req.nextUrl.searchParams.get('pageNumber')
  const postPerPage = req.nextUrl.searchParams.get('postPerPage')
  const id = req.nextUrl.searchParams.get('id')
  const userId = req.nextUrl.searchParams.get('userId')
  const type = req.nextUrl.searchParams.get('type')
  const skip = (Number(pageNumber) - 1) * Number(postPerPage)
  let whereClause: any = {}

  // Add the id to whereClause if it's defined and not "undefined"
  if (id && id !== 'undefined') {
    whereClause.id = id
  }
  if (userId && userId !== 'undefined') {
    whereClause.userId = userId
  }
  // Add type to whereClause if it's defined and not "All"
  if (type && type !== 'undefined' && type !== 'ALL') {
    whereClause.type = type
  }
  try {
    const posts = await prisma.post.findMany({
      where: whereClause,
      take: Number(postPerPage),
      skip,
      orderBy: { postedAt: 'desc' },
      include: {
        likes: true,
        user: {
          include: { followers: true, following: true }
        }
      }
    })

    return NextResponse.json(posts)
  } catch (err) {
    console.log(err)
    return NextResponse.json({ error: 'something went wrong' }, { status: 500 })
  }
}

//About
export const POST = async (req: NextRequest) => {
  const { postId, userId, postUserId } = await req.json()
  try {
    await prisma.like.create({
      data: {
        postId,
        userId
      }
    })
    const [userFrom, postInfo] = await prisma.$transaction([
      prisma.user.findFirst({
        where: { id: userId }
      }),
      prisma.post.findFirst({
        where: { id: postId }
      })
    ])
    if (userId != postUserId && userFrom && postInfo) {
      const notification = await prisma.notification.create({
        data: {
          type: 'LIKE',
          message: `Your post about your ${postInfo.type} which is posted on ${readableFormat(
            postInfo.postedAt
          )} is liked by ${userFrom.name}.`,
          title: `${userFrom.name} liked your post`,
          userId: postUserId,
          actorId: userId
        }
      })
      await sendNotificationToOtherBackend(notification)
    }
    return NextResponse.json({ message: 'like added successfully' })
  } catch (err) {
    return NextResponse.json({ error: 'something went wrong' }, { status: 500 })
  }
}

export const DELETE = async (req: NextRequest) => {
  const postId = req.nextUrl.searchParams.get('postId')
  const userId = req.nextUrl.searchParams.get('userId')
  if (!postId || !userId) {
    return NextResponse.json({ error: 'something went wrong' }, { status: 500 })
  }
  try {
    await prisma.like.delete({
      where: {
        userId_postId: { postId, userId }
      }
    })
    return NextResponse.json({ message: 'like deleted successfully' })
  } catch (err) {
    return NextResponse.json({ error: 'something went wrong' }, { status: 500 })
  }
}
