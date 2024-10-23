'use client'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { toast } from 'sonner'
import axios from 'axios'
import { useSession } from 'next-auth/react'

const FollowUnFollow = ({
  followers,
  userPostId,
  following
}: {
  followers: any[]
  userPostId: string
  following: any[]
}) => {
  const [status, setStatus] = useState('Follow')
  const { data: session } = useSession()
  let userId = null
  if (session && session.user) {
    //@ts-ignore
    userId = session.user.id
  }
  useEffect(() => {
    console.log(followers, following)
    if (session && session.user) {
      let ok = followers.find(
        (ele) =>
          //@ts-ignore
          ele.followerId == session.user?.id
      )
      if (ok) {
        setStatus('Unfollow')
      } else {
        setStatus('Follow')
      }
    }
  }, [following, userPostId, following])
  const [loading, setLoading] = useState(false)
  const handleClick = async () => {
    if (!session || !session?.user) {
      return toast.error('You need to Sign in first.')
    }
    setLoading(true)
    try {
      //@ts-ignore
      let followerId = session.user.id
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
