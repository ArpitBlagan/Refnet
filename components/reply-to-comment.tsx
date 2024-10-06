import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { RiReplyLine } from '@remixicon/react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { toast } from 'sonner'
import { getTimeDiffOrDate, trimText } from '@/common'
import { Triangle } from 'react-loader-spinner'
const ReplyToComment = ({
  ele,
  userId,
  postId,
  user
}: {
  ele: any
  userId: string
  postId: string
  user: any
}) => {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [postLoading, setPostLoading] = useState(false)
  const handlePostComment = async () => {
    const val = trimText(comment)
    if (val.length == 0 || !val) {
      toast.error('Please enter valid reply first..')
      return
    }
    setPostLoading(true)
    try {
      await axios.post(`/api/comment/${ele.id}`, {
        postId,
        parentCommentId: ele.id,
        userId,
        comment: val
      })

      setComments((prev) => {
        return [
          {
            createdAt: Date.now(),
            comment: val,
            user: { profileImage: user.image, name: user.name }
          },
          ...prev
        ]
      })
      setComment('')
    } catch (err) {
      toast.error('Not able to reply to the comment')
    } finally {
      setPostLoading(false)
    }
  }

  useEffect(() => {
    console.log(user)
    setComments(ele.children)
  }, [ele])
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex items-center gap-1 cursor-pointer">
            <RiReplyLine className="text-gray-600" />
            <p className="text-gray-600">Reply</p>
          </div>
        </DialogTrigger>
        <DialogContent className="h-[90vh] bg-black overflow-hidden overflow-y-scroll ">
          <DialogHeader>
            <DialogTitle className="mb-5">
              <div className="flex flex-col gap-3">
                <p>
                  Reply to Comment:{' '}
                  <span className="text-gray-400">{ele.comment.substr(0, 50)}</span>
                </p>
                <p className="text-gray-600 font-md text-sm text-end">By {ele.user.name}</p>
              </div>
            </DialogTitle>
            <DialogDescription>
              <div className="flex flex-col gap-3 ">
                {userId && (
                  <form className="flex items-center gap-2">
                    <Input
                      placeholder="reply to the comment..."
                      value={comment}
                      onChange={(e) => {
                        setComment(e.target.value)
                      }}
                      className="flex-1 py-2 pl-3 h-[50px] font-semibold text-white resize-none bg-slate-900 border border-zinc-900"
                    />
                    <Button
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault()
                        handlePostComment()
                      }}
                      disabled={postLoading}
                      className="bg-green-600 hover:bg-green-700 py-2"
                    >
                      {postLoading ? 'Commenting..' : 'Reply'}
                    </Button>
                  </form>
                )}
                {loading ? (
                  <div className="h-full flex items-center justify-center">
                    <Triangle />
                  </div>
                ) : (
                  <div className="h-full  flex flex-col gap-2">
                    <p>Comments</p>
                    {comments.map((ele, index) => {
                      return (
                        <div className="flex border-b border-zinc-800 p-2 gap-2" key={index}>
                          <div className=" flex items-center gap-2   py-2">
                            <Image
                              src={ele.user.profileImage || ''}
                              alt="image"
                              width={50}
                              height={50}
                              className="rounded-full"
                            />
                          </div>
                          <div className="flex-1 flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <p className="text-md font-bold">{ele.user.name}</p>
                              <p className="text-gray-400 text-sm font-semibold">
                                {getTimeDiffOrDate(ele.createdAt)}
                              </p>
                            </div>
                            <div className="flex flex-col gap-2 bg-gray-700 rounded-3xl  w-full">
                              <p className="text-lg p-2 pl-3 text-white w-full">{ele.comment}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ReplyToComment
