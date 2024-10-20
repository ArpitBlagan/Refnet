'use client'

import { useEffect, useState } from 'react'

import { toast } from 'sonner'
import { Triangle } from 'react-loader-spinner'
import axios from 'axios'

import PostCard from './post-card'
const POSTS_PER_PAGE = 10
const Posts = ({
  id,
  userId,
  showToOther,
  myPosts,
  header
}: {
  id?: string
  userId?: string
  showToOther?: boolean
  myPosts?: boolean
  header?: boolean
}) => {
  const [type, setType] = useState('ALL')
  const [posts, setPosts] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const loadPosts = async (pageNumber: number) => {
    setLoading(true)
    try {
      const res = await axios.get(
        `/api/post?id=${id}&pageNumber=${pageNumber}&postPerPage=${POSTS_PER_PAGE}&type=${type}&userId=${myPosts && userId}`
      )
      console.log(res.data)
      if (res.data.length >= 0) {
        setPosts(res.data)
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
      toast.error('Something is wrong not able to fetch post 🥲.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPosts(page)
  }, [page, type])

  return (
    <div className="my-10">
      {header && (
        <div className="cursor-pointer flex item-center justify-between my-4">
          {['All', 'Work', 'Referrals'].map((ele, index) => {
            return (
              <p
                key={index}
                onClick={() => {
                  setType(ele.toUpperCase())
                }}
                className={`text-center w-full ${
                  type == ele.toUpperCase()
                    ? 'font-bold text-blue-500 border-b-[2px] border-blue-600'
                    : ''
                }`}
              >
                {ele}
              </p>
            )
          })}
        </div>
      )}
      {!loading &&
        posts.map((postData, index) => {
          return (
            <PostCard
              postData={postData}
              key={index}
              showToOther={showToOther || false}
              userId={userId || ''}
            />
          )
        })}
      {loading && (
        <div className="flex items-center h-screen justify-center">
          <Triangle />
        </div>
      )}
      {!loading && posts.length == 0 && (
        <p className="text-center text-gray-600 font-bold ">No Posts avaliable 🥲.</p>
      )}
    </div>
  )
}

export default Posts
