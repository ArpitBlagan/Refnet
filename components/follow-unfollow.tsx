'use client'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { toast } from 'sonner'
import axios from 'axios'
import { useSession } from 'next-auth/react'

const FollowUnFollow = ({
  userId,
  followers,
  userPostId,
  following
}: {
  userId: string
  followers: any[]
  userPostId: string
  following: any[]
}) => {
  const [status, setStatus] = useState('')
  const { data: session } = useSession()
  useEffect(() => {
    console.log(followers, following)
    let ok = followers.find((ele) => ele.followerId == userId || ele.followerId == session?.user.id)
    if (ok) {
      setStatus('Unfollow')
    } else {
      setStatus('Follow')
    }
  }, [userId, following, userPostId, following])
  const [loading, setLoading] = useState(false)
  const handleClick = async () => {
    if (!userId && !session?.user) {
      return toast.error('You need to Sign in first.')
    }
    setLoading(true)
    try {
      let followerId
      if (userId.length) {
        followerId = userId
      } else {
        //@ts-ignore
        followerId = session?.user.id
      }
      if (status == 'Unfollow') {
        await axios.delete(`/api/follow?followerId=${followerId}&followingId=${userPostId}`)
      } else {
        await axios.post('/api/follow', {
          followerId,
          followingId: userPostId
        })
      }
      if (status == 'Unfollow') {
        setStatus('Follow')
      } else {
        setStatus('Unfollow')
      }
    } catch (err) {
      console.log(err)
      toast.error('Not able to perform the specific operation please try again later 🥲.')
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="flex items-center justify-end">
      {userId != userPostId && (
        <Button
          onClick={(e) => {
            e.preventDefault()
            handleClick()
          }}
          disabled={loading}
          className="border text-semibold p-1 px-3 border-blue-800 text-blue-400 hover:bg-blue-100 duration-300 ease-in-out"
        >
          {loading == false && <p>{status}</p>}
        </Button>
      )}
    </div>
  )
}
export default FollowUnFollow
