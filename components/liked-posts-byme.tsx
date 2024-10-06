'use client'
import axios from 'axios'
import PostCard from './post-card'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Triangle } from 'react-loader-spinner'

const LikedPosts = ({ userId }: { userId: string }) => {
  const [likedPosts, setLikedPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const getLikedPosts = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`/api/likedPost?userId=${userId}`)
        setLikedPosts(res.data)
      } catch (err) {
        toast.error('Somehting went wrong while fetching the liked posts by you.')
      } finally {
        setLoading(false)
      }
    }
    getLikedPosts()
  }, [userId])
  return (
    <div className="my-10 overflow-hidden overflow-y-scroll ">
      {!loading ? (
        <div>
          {likedPosts.map((ele, index) => {
            return <PostCard postData={ele} showToOther={false} userId={userId} key={index} />
          })}
          {likedPosts.length == 0 && (
            <p className="text-center mt-5 text-gray-600">No post avaliable 👀.</p>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center h-40">
          <Triangle />
        </div>
      )}
    </div>
  )
}

export default LikedPosts
