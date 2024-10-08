import prisma from '@/db'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  const searchText = req.nextUrl.searchParams.get('searchText')
  if (!searchText) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
  try {
    const results = await prisma.user.findMany({
      where: {
        OR: [
          {
            name: {
              startsWith: searchText,
              mode: 'insensitive' // Optional: Case-insensitive search
            }
          },
          {
            email: {
              startsWith: searchText,
              mode: 'insensitive' // Optional: Case-insensitive search
            }
          }
        ]
      }
    })
    return NextResponse.json({ results })
  } catch (err) {
    return NextResponse.json({ error: 'something went wrong' }, { status: 500 })
  }
}
