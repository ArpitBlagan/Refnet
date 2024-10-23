import { readableFormat } from '@/common'
import { sendNotificationToOtherBackend } from '@/common/notification'
import prisma from '@/db'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
  const { postId, userId, response } = await req.json()
  try {
    await prisma.opinion.create({
      data: {
        postId,
        userId,
        response
      }
    })
    const [postInfo, userFrom] = await prisma.$transaction([
      prisma.post.findFirst({ where: { id: postId } }),
      prisma.user.findFirst({ where: { id: userId } })
    ])
    if (postInfo && userFrom && postInfo.userId != userId) {
      const notification = await prisma.notification.create({
        data: {
          type: 'FEEDBACK',
          title: `${userFrom.name} gave feedback about work post.`,
          message: `On your post which about ${
            postInfo.type
          } posted on ${readableFormat(postInfo.postedAt)} ${userFrom.name} give their feedback`,
          userId: postInfo.userId,
          actorId: userId
        }
      })
      sendNotificationToOtherBackend(notification)
    }
    return NextResponse.json({
      status: '202',
      message: 'Successfully added you opinion'
    })
  } catch (err) {
    console.log('err', err)
    return NextResponse.json(
      {
        error: 'Not able to add your opinion'
      },
      { status: 500 }
    )
  }
}

export const GET = async (req: NextRequest) => {
  const postId = req.nextUrl.searchParams.get('postId')
  if (!postId) {
    return NextResponse.json({ error: 'something went wrong' }, { status: 500 })
  }
  try {
    const data = await prisma.opinion.groupBy({
      by: ['response'],
      where: { postId },
      _count: {
        response: true
      }
    })
    return NextResponse.json({ data }, { status: 200 })
  } catch (err) {
    return NextResponse.json(
      {
        error: 'Not able to add your opinion'
      },
      { status: 500 }
    )
  }
}
