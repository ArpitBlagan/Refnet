import prisma from '@/db'
import { NextRequest, NextResponse } from 'next/server'

export const DELETE = async (req: NextRequest, { params }: { params: any }) => {
  const id = params.id
  try {
    await prisma.comment.delete({
      where: {
        id
      }
    })
    return NextResponse.json({
      message: 'comment deleted successfully.',
      status: 202
    })
  } catch (err) {
    return NextResponse.json({ error: 'something went wrong' }, { status: 500 })
  }
}

export const POST = async (req: NextRequest, { params }: { params: any }) => {
  const id = params.id
  const { userId, comment, parentCommentId, postId } = await req.json()
  try {
    await prisma.comment.create({
      data: {
        parentId: parentCommentId,
        userId,
        comment,
        postId
      }
    })
    return NextResponse.json({ message: 'posted successfully' }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: 'something went wrong' }, { status: 500 })
  }
}
