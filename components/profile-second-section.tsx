'use client'
import { useState } from 'react'
import Posts from './Posts'
import LikedPosts from './liked-posts-byme'

const SecondSection = (info: any) => {
  const [sele, setSele] = useState('Posts')

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-4 w-full">
        {['Posts', 'Likes'].map((ele, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                setSele(ele)
              }}
              className={` h-full flex items-center justify-center cursor-pointer ${
                ele == sele ? 'border-b-[3px] border-blue-400' : ''
              }`}
            >
              {ele}
            </div>
          )
        })}
      </div>
      {sele == 'Posts' ? (
        <Posts userId={info.id} myPosts={true} />
      ) : (
        <LikedPosts userId={info.id} />
      )}
    </div>
  )
}
export default SecondSection
