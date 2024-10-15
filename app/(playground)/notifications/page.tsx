import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Notification from '@/components/Notification'
import { getServerSession } from 'next-auth'

const page = async () => {
  const session = await getServerSession(authOptions)
  return (
    <div
      className="flex-1 mx-7 overflow-y-scroll 
  flex flex-col justify-start min-h-full  mt-7 mb-10 "
    >
      <Notification postPerPage={40} userId={session && session.user ? session.user.id : ''} />
    </div>
  )
}

export default page
