import { authOptions } from '@/lib/auth'
import Notification from '@/components/Notification'
import { getServerSession } from 'next-auth'

const page = async () => {
  const session = await getServerSession(authOptions)
  let userId = null
  if (session && session.user) {
    userId = session.user.id
  }
  return (
    <div
      className="flex-1 mx-7 
  flex flex-col justify-start min-h-full  mt-7 mb-10 overflow-y-scroll"
    >
      <Notification postPerPage={40} userId={userId} />
    </div>
  )
}

export default page
