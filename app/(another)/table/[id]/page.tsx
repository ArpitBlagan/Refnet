import { getReferalPostInfo } from '@/app/actions/post'
import TableInfo from '@/components/table-info'
import { useEffect } from 'react'

const page = async ({ params }: { params: any }) => {
  const id = params.id
  const res = await getReferalPostInfo(id)
  console.log(res)
  if (res.error) {
    return (
      <div className="min-h-screen">
        <p>Something went wrong pleae try again later 🥲.</p>
      </div>
    )
  } else {
    return (
      <div className="min-h-screen">
        <TableInfo data={res.data || []} />
      </div>
    )
  }
}

export default page
