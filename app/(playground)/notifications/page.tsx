import { authOptions } from '@/lib/auth'
import Notification from '@/components/Notification'
import { getServerSession } from 'next-auth'

const page = async () => {
  const session = await getServerSession(authOptions)
  let userId = null
  if (session.user) {
    userId = session.user.id
  }
  return (
    <div
      className="flex-1 mx-7 overflow-y-scroll 
  flex flex-col justify-start min-h-full  mt-7 mb-10 "
    >
      <Notification postPerPage={40} userId={userId} />
    </div>
  )
}

export default page
