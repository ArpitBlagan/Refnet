import { readableFormat } from '@/common'
import { sendNotificationToOtherBackend } from '@/common/notification'
import prisma from '@/db'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
  const { postId, userId } = await req.json()
  try {
    await prisma.application.create({
      data: {
        postId,
        userId
      }
    })
    const [postInfo, userFrom] = await prisma.$transaction([
      prisma.post.findFirst({ where: { id: postId } }),
      prisma.user.findFirst({ where: { id: userId } })
    ])
    if (postInfo && userFrom && postInfo.userId != userId) {
      const notification = await prisma.notification.create({
        data: {
          type: 'APPLIED',
          title: `${userFrom.name} applied on your referal post.`,
          message: `On your post about referal posted on 
                ${readableFormat(postInfo.postedAt)} ${userFrom.name} applied for it`,
          userId: postInfo.userId,
          actorId: userId
        }
      })
      sendNotificationToOtherBackend(notification)
    }
    return NextResponse.json({ message: 'Successfully applied .' }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: 'something went wrong' }, { status: 500 })
  }
}

export const GET = async (req: NextRequest) => {
  const postId = req.nextUrl.searchParams.get('postId')
  try {
    const data = await prisma.application.findMany({
      where: {
        postId
      },
      inclued: {
        user: true
      }
    })
    return NextResponse.json({ data }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: 'something went wrong' }, { status: 500 })
  }
}
