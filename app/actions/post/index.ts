import prisma from '@/db'

export const getPostById = async (id: string) => {
  try {
    const postData = await prisma.post.findFirst({
      where: { id },
      include: {
        applications: true,
        likes: true,
        user: {
          include: {
            followers: true,
            following: true
          }
        }
      }
    })
    return { message: '', postData }
  } catch (err) {
    return { error: 'not able to fetch post data' }
  }
}

export const deletePost = async (postId: string) => {
  try {
    await prisma.post.delete({
      where: { id: postId }
    })
    return { message: 'post deleted successfully' }
  } catch (err) {
    return { error: 'not able to delete the post' }
  }
}

export const getReferalPostInfo = async (postId: string) => {
  try {
    const data = await prisma.application.findMany({
      where: {
        postId
      },
      include: {
        user: true
      }
    })
    return { message: 'info fetched successffully', data }
  } catch (err) {
    return { error: 'not able to get post info.' }
  }
}
