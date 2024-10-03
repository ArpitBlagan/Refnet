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
  const [submitLoading, setSubmitLoading] = useState(false)
  const [likeStatus, setLikeStatus] = useState('notLiked')
  const [feedbackGiven, setFeedbackGiven] = useState(false)
  const [loading, setLoading] = useState(false)
  const submitFeedback = async (value: string) => {
    //logic to submti feedback
    setSubmitLoading(true)
    try {
      await axios.post('/api/opinion', {
        postId: postData,
        userId,
        response: value
      })
      setFeedbackGiven(true)
    } catch (err) {
      toast.error('something went wrong while storing you feedback 👀.')
    } finally {
      setSubmitLoading(false)
    }
  }
  useEffect(() => {
    if (postData.type !== 'WORK') {
      setFeedbackGiven(true)
    } else {
      //check weather is already given or not.
      // if(postData.opinion.include(userId)){
      //   setFeedbackGiven(true);
      // }
    }
  }, [postData, userId])
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
        className="text-gray-200 text-lg px-3"
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
      {postData.type == 'WORK' && (
        <div>
          {feedbackGiven == false ? (
            <div className="p-2 border border-zinc-800 rounded-xl">
              <p className="text-lg text-center font-semibold">
                Your impression about the project/work by considering everythink like its ui, idea,
                implementation etc.
              </p>
              <div className="flex items-center justify-around my-4">
                {['Normal', 'Impressive', 'Excellent'].map((ele, index) => {
                  return (
                    <Button
                      onClick={(e) => {
                        e.preventDefault()
                        setFeedbackGiven(true)
                        submitFeedback(ele.toUpperCase())
                      }}
                      disabled={submitLoading}
                      className="bg-green-600 hover:bg-green-700"
                      key={index}
                    >
                      {ele}
                    </Button>
                  )
                })}
              </div>
              <p className="text-gray-600 text-md text-center">
                Your feedback will help use to rate the user profile.
              </p>
            </div>
          ) : (
            <div className="p-2 rounded-xl border border-zinc-800 flex items-center justify-center flex-col">
              <RiCheckboxCircleLine className="text-green-600" />
              <p className="text-gray-600 text-md">
                Thank you for letting use know about your impression.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default PostCard
