'use client'

import { calculatePostRating } from '@/common'
import PieChartComponent from './pie-chart'
import { useEffect, useState } from 'react'
import { Triangle } from 'react-loader-spinner'
import axios from 'axios'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from './ui/button'

const Analytics = ({ postId }: { postId: string }) => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`/api/opinion?postId=${postId}`)
        setData(res.data)
        console.log(res.data)
      } catch (err) {
      } finally {
        setLoading(false)
      }
    }
    getData()
  }, [postId])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700">Analytics</Button>
      </DialogTrigger>
      <DialogContent className="bg-black w-[600px] max-w-full p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold border-b border-zinc-800 mb-1 pb-3">
            Post analytics
          </DialogTitle>
          <DialogDescription className="">
            {!loading ? (
              <div className=" w-full">
                <div className="">
                  <p className="text-lg text-gray-600  text-center">
                    Post rating based on other's feedback: <span>{calculatePostRating(data)}</span>
                  </p>
                </div>
                <PieChartComponent />
              </div>
            ) : (
              <div>
                <Triangle />
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default Analytics
