'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import {
  RiChat3Fill,
  RiHandbagFill,
  RiThumbUpFill,
  RiUserFollowFill,
  RiUserUnfollowFill
} from '@remixicon/react'
import { useSocket } from '@/app/socket-context'
import { getTimeDiffOrDate, isSame } from '@/common'
import { Triangle } from 'react-loader-spinner'
const Notification = ({ postPerPage, userId }: { postPerPage: number; userId: string }) => {
  const socket = useSocket()
  useEffect(() => {
    if (socket) {
      socket.on('notification', (data) => {
        console.log(data)
        const firstEle = notifications[0]
        if (!isSame(firstEle, data)) {
          setNotification((prev) => {
            return [
              {
                title: data.title,
                createAt: data.createdAt,
                message: data.message,
                type: data.type
              },
              ...prev
            ]
          })
        }
      })
    }
    return () => {
      socket?.off('message')
    }
  }, [socket])
  const router = useRouter()
  const [notifications, setNotification] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const observer = useRef<IntersectionObserver | null>(null)

  const loadPosts = async (pageNumber: number) => {
    setLoading(true)
    try {
      const res = await axios.get(
        `/api/notification?pageNumber=${pageNumber}&postPerPage=${postPerPage}&userId=${userId}`
      )
      console.log(res.data)
      setNotification(res.data)
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (userId) {
      loadPosts(page)
    }
  }, [page])

  // useEffect(() => {
  //   const lastPostElement = document.querySelector("#last-post");
  //   if (!lastPostElement) return;

  //   const loadMore = (entries: IntersectionObserverEntry[]) => {
  //     if (entries[0].isIntersecting && !loading) {
  //       setPage((prev) => prev + 1);
  //     }
  //   };

  //   observer.current = new IntersectionObserver(loadMore);
  //   if (lastPostElement) {
  //     observer.current.observe(lastPostElement);
  //   }

  //   return () => {
  //     if (observer.current && lastPostElement) {
  //       observer.current.unobserve(lastPostElement);
  //     }
  //   };
  // }, [loading]);
  return (
    <div
      className={`px-3 py-7 border border-zinc-800 rounded-xl  flex flex-col gap-2 ${
        postPerPage == 5 ? 'h-[640px] w-[300px]' : ''
      }`}
    >
      <div>
        <h1 className="font-bold text-center mb-5">Notifications</h1>
      </div>
      <div className="h-full overflow-hidden overflow-y-scroll">
        {loading && (
          <div className="flex h-full items-center justify-center my-20">
            <Triangle height={50} width={50} />
          </div>
        )}
        {!loading &&
          notifications.map((ele, index) => {
            return (
              <div
                key={index}
                className="px-4 py-2 
              flex flex-col gap-4 cursor-pointer
              duration-300 ease-in-out hover:bg-gray-900 border-t border-b border-zinc-900 rounded-md"
                onClick={() => {
                  if (postPerPage == 5) {
                    router.push('/notifications')
                  }
                }}
              >
                <div className="flex items-center gap-2">
                  <p className="text-end">
                    {ele.type == 'LIKE' && <RiThumbUpFill />}
                    {ele.type == 'COMMENT' && <RiChat3Fill />}
                    {ele.type == 'FOLLOW' && <RiUserFollowFill />}
                    {ele.type == 'UNFOLLOW' && <RiUserUnfollowFill />}
                    {ele.type == 'APPLIED' && <RiHandbagFill />}
                  </p>
                  <p className="text-bold text-green-600">{ele.title}</p>
                </div>
                {postPerPage == 5 ? (
                  <p className="text-gray-600">{ele.message.substr(0, 50)}...</p>
                ) : (
                  <p className="text-gray-600">{ele.message}</p>
                )}
                <div>
                  <p className="text-end">{getTimeDiffOrDate(ele.createdAt)}</p>
                </div>
                {/* {postPerPage > 5 && index == notifications.length - 1 && (
                  <div id="last-post" style={{ height: "20px" }} />
                )} */}
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Notification
