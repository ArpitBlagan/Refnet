'use client'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import axios from 'axios'
import { toast } from 'sonner'
import { Triangle } from 'react-loader-spinner'
import { getTimeDiffOrDate, trimText } from '@/common'

import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { RiDeleteBinLine, RiMore2Line } from '@remixicon/react'
import ReplyToComment from './reply-to-comment'
import { useSession } from 'next-auth/react'

const CommentSection = ({ postId, userId }: any) => {
  const { data: session } = useSession()
  const [comments, setComments] = useState<any[]>([])
  const [initialLoading, setInitialLoading] = useState(false)
  const [otherLoading, setOtherLoading] = useState(false)
  const [comment, setComment] = useState('')
  const [deleteLoading, setDeleteLoading] = useState(false)
  const deleteComment = async (id: string) => {
    setDeleteLoading(true)
    try {
      await axios.delete(`/api/comment/${id}`)
    } catch (err) {
      toast.error('Not able to delete the comment 👀.')
    } finally {
      setDeleteLoading(false)
    }
  }
  useEffect(() => {
    const getComment = async () => {
      if (comments.length == 0) {
        setInitialLoading(true)
      }
      try {
        const res = await axios.get(`/api/comment?id=${postId}`)
        console.log(res.data)
        setComments(res.data)
      } catch (err) {
        toast.error('not able to fetch comments for this post 🥲.')
      } finally {
        setInitialLoading(false)
      }
    }
    getComment()
  }, [postId])
  const handleSubmit = async () => {
    const trimComment = trimText(comment)
    if (trimComment.length == 0) {
      return toast.error('Please enter valid comment 😁.')
    }
    console.log(trimComment)
    setOtherLoading(true)
    toast.promise(
      async () => {
        setOtherLoading(true)
        const res = await axios.post(`/api/comment`, {
          postId,
          userId,
          comment: trimComment
        })
        console.log(res)
        setComments((prev) => {
          return [
            {
              user: {
                //@ts-ignore
                profileImage: session?.user.image,
                //@ts-ignore
                name: session?.user.name
              },
              comment: trimComment,
              createdAt: Date.now(),
              children: []
            },
            ...prev
          ]
        })
        if (res.data.error) {
          throw new Error('something went wron')
        }
        return res
      },
      {
        loading: 'Loading...',
        success: () => {
          setOtherLoading(false)
          setComment('')
          return 'New comment added successfully 😁.'
        },
        error: () => {
          setOtherLoading(false)
          return 'Not able to add comment right now please try again later ❌.'
        }
      }
    )
  }
  return (
    <div>
      <div className="flex flex-col gap-3 border-t border-zinc-700 py-4">
        {userId && (
          <form className="flex items-center gap-2 pb-4 ">
            <Input
              placeholder="comment your thoughts..."
              value={comment}
              onChange={(e) => {
                setComment(e.target.value)
              }}
              className="flex-1 py-2 pl-3 h-[50px] font-semibold resize-none bg-slate-900 border border-zinc-900"
            />
            <Button
              type="submit"
              onClick={(e) => {
                e.preventDefault()
                handleSubmit()
              }}
              className="bg-green-600 hover:bg-green-700 py-2"
              disabled={otherLoading}
            >
              Comment
            </Button>
          </form>
        )}
        <div className="">
          <h1 className="md:text-xl font-medium pl-3 pb-3 border-b border-zinc-800 my-3">
            {comments.length} Total comments
          </h1>
          {initialLoading ? (
            <div className="flex items-center justify-center">
              <Triangle />
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {comments.map((ele, index) => {
                return (
                  <div className="flex border-b border-zinc-800 bp-2" key={index}>
                    <div className="flex-1 px-5 flex flex-col gap-1">
                      <div className=" flex items-center gap-2   py-2">
                        <Image
                          src={
                            ele.user.profileImage
                              ? ele.user.profileImage
                              : 'https://avatar.vercel.sh/jane'
                          }
                          alt="image"
                          width={50}
                          height={50}
                          className="rounded-full"
                        />
                        <p className="text-[13px] md:text-md font-medium">{ele.user.name}</p>
                        <p className="text-gray-400 text-[10px] md:text-sm font-semibold">
                          {getTimeDiffOrDate(ele.createdAt)}
                        </p>
                      </div>
                      <div className="flex">
                        <p className="text-[15px] md:text-md p-2 pl-3 w-full">{ele.comment}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <ReplyToComment
                            ele={ele}
                            userId={userId}
                            postId={postId}
                            user={session?.user}
                          />{' '}
                          <p className="text-gray-600 font-medium">{ele.children.length}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button className="bg-transparent">
                            <RiMore2Line className="cursor-pointer" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className=" font-semibold">
                          {ele.userId == userId && (
                            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                              <Button
                                disabled={deleteLoading}
                                className="flex items-center gap-3"
                                onClick={(e) => {
                                  e.preventDefault()
                                  deleteComment(ele.id)
                                }}
                              >
                                Delete <RiDeleteBinLine />
                              </Button>
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CommentSection
