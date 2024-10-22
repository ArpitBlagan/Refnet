import { authOptions } from '@/lib/auth'
import prisma from '@/db'
import { getServerSession } from 'next-auth'
export let getProfileInfo: (id: string) => any
getProfileInfo = async (id: string) => {
  try {
    const details = await prisma.user.findFirst({
      where: { id },
      include: {
        followers: true,
        following: true
      }
    })
    console.log(details)
    return { message: 'fetched', ...details }
  } catch (err) {
    console.log(err)
    return { error: 'something went wrong while fetching user info 🥲.' }
  }
}

export const getRecentRegisteredUser = async () => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        joinedAt: 'desc'
      },
      take: 6
    })
    return { message: 'recent registered user', users }
  } catch (err) {
    return { error: 'something went wrong.' }
  }
}

export const getUserInfoById = async (id: string) => {
  try {
    const userInfo = await prisma.user.findFirst({
      where: { id },
      include: { posts: true, followers: true, following: true }
    })
    return { messsage: 'fetched successfully', userInfo }
  } catch (err) {
    return { error: 'something went wrong.' }
  }
}
