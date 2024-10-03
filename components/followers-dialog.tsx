'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Triangle } from 'react-loader-spinner'

const FollowersDialog = ({ id }: { id: string }) => {
  const [followers, setFollowers] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const getFollowers = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`/api/user/${id}?type=follower`)
        if (res.data.list.length >= 0) {
          setFollowers(res.data.list)
        }
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    getFollowers()
  }, [])
  return (
    <Dialog>
      <DialogTrigger>Followers</DialogTrigger>
      <DialogContent className="bg-black">
        <DialogHeader>
          <DialogTitle>People who follow you.</DialogTitle>
          <DialogDescription>
            {loading ? (
              <div className="mt-10 flex items-center justify-center">
                <Triangle />
              </div>
            ) : (
              <div>
                {followers.map((ele, index) => {
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
                        <Button variant="outline" className="bg-green-600">
                          Follow
                        </Button>
                      </div>
                    </Link>
                  )
                })}
                {followers.length == 0 ? (
                  <p className="text-center text-gray-600 my-5">You have no one who follows you.</p>
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
export default FollowersDialog
