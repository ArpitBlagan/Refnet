import { readableFormat } from '@/common'
import { sendNotificationToOtherBackend } from '@/common/notification'
import prisma from '@/db'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
  const { followerId, followingId } = await req.json()
  try {
    const [follower, userFrom] = await prisma.$transaction([
      prisma.follower.create({
        data: {
          followerId,
          followingId
        }
      }),
      prisma.user.findFirst({
        where: { id: followerId }
      })
    ])
    if (userFrom) {
      const notification = await prisma.notification.create({
        data: {
          type: 'FOLLOW',
          message: `${userFrom.name} who registered on Refnet on ${readableFormat(
            userFrom.joinedAt
          )} started following you 👀.`,
          title: `${userFrom.name} started follow you`,
          userId: followingId,
          actorId: followerId
        }
      })
      await sendNotificationToOtherBackend(notification)
    }
    return NextResponse.json({ message: 'Operation performed' })
  } catch (err) {
    return NextResponse.json({ error: 'something went wrong' }, { status: 500 })
  }
}

export const DELETE = async (req: NextRequest) => {
  const followerId = req.nextUrl.searchParams.get('followerId')
  const followingId = req.nextUrl.searchParams.get('followingId')
  if (!followerId || !followingId) {
    return NextResponse.json({})
  }
  try {
    await prisma.follower.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId
        }
      }
    })
    return NextResponse.json({ message: 'Operation performed' })
  } catch (err) {
    return NextResponse.json({ error: 'something went wrong' }, { status: 500 })
  }
}
