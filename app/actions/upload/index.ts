'use server'
import { s3, Bucket } from '@/common/aws-s3'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getServerSession } from 'next-auth'
import prisma from '@/db'
import { authOptions } from '@/lib/auth'
export const uploadFiles = async (formdata: FormData) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return { error: 'You are not logged in.' }
  }
  const text = formdata.get('text')
  const type = formdata.get('type')
  const files: any[] = formdata.getAll('files[]')
  if (!text) {
    return { error: 'Invalid entry' }
  }
  try {
    let urls: string[] = []
    if (files.length) {
      const response = await Promise.all(
        files.map(async (file: File) => {
          const Body = (await file.arrayBuffer()) as Buffer
          const key = `${file.name}`

          // Upload the file to S3
          await s3.send(new PutObjectCommand({ Bucket, Key: key, Body }))

          // Construct the URL for the uploaded file
          const url = `https://d3e230op9b6du5.cloudfront.net/${key}`
          return url
        })
      )
      urls = response
    }
    await prisma.post.create({
      data: {
        caption: text as string,
        type: type == 'WORK' ? 'WORK' : 'REFERAL',
        media: urls,
        userId: session.user.id as string
      }
    })
    return { message: 'Posted successsfully 😁.' }
  } catch (err) {
    return {
      error: 'something went wrong while posting your work, please try again later 🥲.'
    }
  }
}

export const updateProfile = async (formdata: FormData) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return { error: 'You are not logged in.' }
  }
  const data: any = {}
  let willChange = false
  const file: any = formdata.get('file')
  const description = formdata.get('description')
  if (file) {
    const Body = (await file.arrayBuffer()) as Buffer
    const key = `${file.name}`
    await s3.send(new PutObjectCommand({ Bucket, Key: key, Body }))

    // Construct the URL for the uploaded file
    const url = `https://d3e230op9b6du5.cloudfront.net/${key}`
    data.profileImage = url
    willChange = true
  }
  if (description) {
    data.description = description
    willChange = true
  }
  const linkedin = formdata.get('linkedIn')
  const resume = formdata.get('resume')
  const twitter = formdata.get('twitter')
  const github = formdata.get('github')
  if (linkedin) {
    data.LinkedinLink = linkedin
    willChange = true
  }
  if (resume) {
    data.resumeLink = resume
    willChange = true
  }
  if (twitter) {
    data.twitterLink = twitter
    willChange = true
  }
  if (github) {
    data.githubLink = github
    willChange = true
  }
  try {
    if (willChange) {
      await prisma.user.update({
        where: {
          id: session.user.id
        },
        data: { ...data }
      })
    }
    return { message: 'successfully updated 😁.' }
  } catch (err) {
    return { error: '' }
  }
}
