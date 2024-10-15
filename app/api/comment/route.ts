import { readableFormat } from '@/common'
import { sendNotificationToOtherBackend } from '@/common/notification'
import prisma from '@/db'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  const id = req.nextUrl.searchParams.get('id')
  if (!id) {
    return NextResponse.json({
      error: 'we need post id to fetch the data',
      status: '400'
    })
  }
  try {
    const comments = await prisma.comment.findMany({
      where: { postId: id, parentId: null },
      include: {
        user: true,
        children: {
          include: {
            user: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return NextResponse.json(comments)
  } catch (err) {
    return NextResponse.json({ error: 'something went wrong' }, { status: 500 })
  }
}

export const POST = async (req: NextRequest) => {
  const { postId, comment, userId } = await req.json()
  try {
    const res = await prisma.comment.create({
      data: {
        postId,
        userId,
        comment
      }
    })
    const [postInfo, userFrom] = await prisma.$transaction([
      prisma.post.findFirst({ where: { id: postId } }),
      prisma.user.findFirst({ where: { id: userId } })
    ])
    if (postInfo && userFrom && postInfo.userId != userId) {
      const notification = await prisma.notification.create({
        data: {
          type: 'COMMENT',
          title: `${userFrom.name} commented on your post.`,
          message: `On your post which about ${
            postInfo.type
          } posted on ${readableFormat(postInfo.postedAt)} ${userFrom.name} add a comment`,
          userId: postInfo.userId,
          actorId: userId
        }
      })
      sendNotificationToOtherBackend(notification)
    }
    return NextResponse.json({ res }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: 'something went wrong' }, { status: 500 })
  }
}
