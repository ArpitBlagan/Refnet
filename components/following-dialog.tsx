'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import axios from 'axios'
import { Triangle } from 'react-loader-spinner'

const FollowingDialog = ({ id }: { id: string }) => {
  const [following, setFollowing] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const getFollowing = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`/api/user/${id}?type=following`)
        if (res.data.list.length >= 0) {
          setFollowing(res.data.list)
        }
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    getFollowing()
  }, [])
  return (
    <Dialog>
      <DialogTrigger>Following</DialogTrigger>
      <DialogContent className="bg-black">
        <DialogHeader>
          <DialogTitle>People Followed by you</DialogTitle>
          <DialogDescription>
            {loading ? (
              <div className="flex items-center jusitfy-center mt-10">
                <Triangle />
              </div>
            ) : (
              <div>
                {following.map((ele: any, index) => {
                  return (
                    <Link href="/" key={index}>
                      <div className="flex items-center gap-3">
                        <Image src="" alt="" width={60} height={60} className="rounded-full" />
                        <div>
                          <p>{ele.name}</p>
                          <p className="text-md text-gray-600">{ele.email}</p>
                        </div>
                      </div>
                      <div>
                        <Button variant="outline" className="bg-red-600">
                          Unfollow
                        </Button>
                      </div>
                    </Link>
                  )
                })}
                {following.length == 0 ? (
                  <p className="text-center text-gray-600 my-5">You are following no one.</p>
                ) : (
                  <p className="text-center text-gray-600 my-5">That's it.</p>
                )}
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
export default FollowingDialog
