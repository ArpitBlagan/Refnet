import prisma from '@/db'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  const pageNumber = req.nextUrl.searchParams.get('pageNumber')
  const postPerPage = req.nextUrl.searchParams.get('postPerPage')
  const userId = req.nextUrl.searchParams.get('userId')
  const skip = (Number(pageNumber) - 1) * Number(postPerPage)
  console.log(pageNumber, postPerPage, userId, skip)
  const whereClause: any = {}
  if (userId && userId != undefined) {
    whereClause.userId = userId
  }
  try {
    const notifications = await prisma.notification.findMany({
      where: whereClause,
      take: Number(postPerPage),
      skip,
      orderBy: { createdAt: 'desc' }
    })
    console.log(notifications)
    return NextResponse.json(notifications)
  } catch (err) {
    return NextResponse.json({ error: 'something went wrong' }, { status: 500 })
  }
}
