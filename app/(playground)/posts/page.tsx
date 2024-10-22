import { authOptions } from '@/lib/auth'
import Notification from '@/components/Notification'
import Posts from '@/components/Posts'
import { getServerSession } from 'next-auth'

import React from 'react'

const page = async () => {
  const session = await getServerSession(authOptions)
  let userId = ''
  if (session.user) {
    userId = session.user.id
  }
  return (
    <div className="mx-5 my-5 md:mr-[330px]">
      <div>
        <div className=" border-b border-zinc-800 pb-4">
          <h1 className="font-semibold text-3xl">Feed</h1>
        </div>

        <Posts header={true} userId={userId} />
      </div>
      <div className="absolute right-0 top-0 overflow-hidden hidden md:block flex items-center jusitfy-center pt-10">
        <Notification postPerPage={5} userId="" />
      </div>
    </div>
  )
}

export default page
