'use client'
import {
  RiChat3Line,
  RiCheckboxCircleLine,
  RiDeleteBinLine,
  RiHeart3Fill,
  RiHeart3Line,
  RiMore2Line,
  RiShareForwardLine
} from '@remixicon/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import RenderMedia from './render-media'
import { checkForUserId, highlightLinks, readableFormat } from '@/common'
import Image from 'next/image'
import { Button } from './ui/button'
import Link from 'next/link'
import FollowUnFollow from './follow-unfollow'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios'
import Feedback from './feedback'
import Apply from './apply'
import Analytics from './analytics'
const PostCard = ({
  postData,
  showToOther,
  userId
}: {
  postData: any
  showToOther: boolean
  userId: string
}) => {
  const deletePost = async (postId: any) => {
    setDeleteLoading(true)
    try {
      await axios.delete(`/api/post?postId=${postId}&userId=${userId}`)
    } catch (err) {
      toast.error('Not able to delete the post please try again later.')
    } finally {
      setDeleteLoading(false)
    }
  }
  const [deleteLoading, setDeleteLoading] = useState(false)

  const [likeStatus, setLikeStatus] = useState('notLiked')

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (checkForUserId(userId, postData.likes)) {
      setLikeStatus('liked')
    } else {
      setLikeStatus('notLiked')
    }
  }, [postData, userId])
  const handleLike = async () => {
    if (loading) {
      return
    }
    if (userId.length == 0 || !userId) {
      return toast.error('You need sign in to like/unlike any post.')
    }
    setLoading(true)
    try {
      if (likeStatus == 'notLiked') {
        setLikeStatus('liked')
        await axios.post('/api/post', {
          postId: postData.id,
          userId,
          postUserId: postData.user.id
        })
      } else {
        setLikeStatus('notLiked')
        await axios.delete(`/api/post?postId=${postData.id}&userId=${userId}`)
      }
    } catch (err) {
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="flex flex-col gap-4 border p-2 rounded-xl border-zinc-800 py-4 ">
      {!showToOther && (
        <div className="flex items-center gap-3 border-b border-zinc-800 py-2">
          <div className="w-12 h-12 rounded-full overflow-hidden relative">
            <Image
              src={postData.user.profileImage} // Replace with your image path
              alt="Circular Image"
              layout="fill" // Fills the container
              objectFit="cover" // Ensures the image maintains its aspect ratio and covers the container
              className="absolute inset-0"
            />
          </div>
          <div>
            <p className="font-bold">{postData.user.name}</p>
            <p className="text-gray-600">{postData.user.email}</p>
          </div>
          <FollowUnFollow
            userId={userId}
            userPostId={postData.user.id}
            following={postData.user.following}
          />
          <div className="flex-1 flex items-center justify-end">
            {postData.type == 'WORK' ? (
              <Analytics postId={postData.id} />
            ) : (
              <Link href={`/table/${postData.postId}`} className="bg-green-600 hover:bg-green-700">
                Applicants
              </Link>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-transparent">
                  <RiMore2Line className="cursor-pointer" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className=" font-semibold">
                {postData.userId == userId && (
                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                    <Button
                      disabled={deleteLoading}
                      onClick={(e) => {
                        e.preventDefault()
                        deletePost(postData.id)
                      }}
                      className="flex items-center gap-3"
                    >
                      Delete <RiDeleteBinLine />
                    </Button>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}
      <div className="flex items-center justify-end">
        <p className="text-gray-600">{readableFormat(postData.postedAt)}</p>
      </div>
      <div
        className="text-gray-300 text-lg px-3"
        dangerouslySetInnerHTML={{ __html: highlightLinks(postData.caption) }}
      />

      <RenderMedia media={postData.media} />

      <div className="px-7 flex items-center gap-10">
        <div className="flex items-center gap-1">
          {likeStatus == 'liked' ? (
            <RiHeart3Fill
              onClick={(e) => {
                e.preventDefault()
                handleLike()
              }}
              className={'text-red-700 cursor-pointer'}
            />
          ) : (
            <RiHeart3Line
              onClick={(e) => {
                e.preventDefault()
                handleLike()
              }}
              className="cursor-pointer"
            />
          )}
          {/* {postData.likes.length} */}
        </div>
        <Link href={`/posts/${postData.id}`}>
          <RiChat3Line className="cursor-pointer" />
        </Link>
        <RiShareForwardLine className="cursor-pointer" />
      </div>
      {postData.type == 'WORK' ? (
        <Feedback postData={postData} userId={userId} />
      ) : (
        <Apply postData={postData} userId={userId} />
      )}
    </div>
  )
}

export default PostCard
