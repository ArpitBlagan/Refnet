import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Posts from '@/components/Posts'
import { getServerSession } from 'next-auth'

import React from 'react'

const page = async () => {
  const session = await getServerSession(authOptions)

  return (
    <div
      className="flex-1 ml-[50px] md:ml-[250px] w-full overflow-y-scroll 
      flex flex-col justify-start min-h-full  my-7"
    >
      <div className="py-4 border-b border-zinc-800">
        <h1 className="font-semibold text-3xl">Feed</h1>
      </div>

      <Posts userId={session.user.id} header={true} />
    </div>
  )
}

export default page
