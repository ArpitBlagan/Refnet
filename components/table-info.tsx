'use client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { RiArrowLeftFill } from '@remixicon/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const TableInfo = ({ data }: { data: any }) => {
  const router = useRouter()
  return (
    <div className="px-7 mt-10 flex flex-col gap-6">
      <div>
        <p className="text-lg font-semibold flex items-center gap-2">
          <RiArrowLeftFill
            className="cursor-pointer"
            onClick={() => {
              router.back()
            }}
          />
          Applications for you Referal Post
        </p>
      </div>
      <div className="py-2 px-4 border border-zinc-800 rounded-md">
        <Table className="">
          <TableCaption>A list of users that are interested.</TableCaption>
          <TableHeader>
            <TableRow className="bg-transparent hover:bg-transparent">
              <TableHead>Name and Email</TableHead>

              <TableHead>Resume</TableHead>

              <TableHead>Github</TableHead>

              <TableHead>Refnet</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="my-4 border-transparent">
            {data.map((ele: any, index: number) => {
              return (
                <TableRow
                  key={index}
                  className="bg-black hover:bg-gray-900 rounded-xl  font-semibold"
                >
                  <TableCell className="font-medium">
                    <p className="font-semibold">
                      {ele.user.name}{' '}
                      <span className="text-gray-600 font-lg">({ele.user.email})</span>
                    </p>
                  </TableCell>
                  <TableCell>
                    <Link href={ele.user.resumeLink || ''} target="_blank">
                      link
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={ele.user.githubLink || ''} target="_blank">
                      link
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={`/profile/${ele.user.id}`} target="_blank">
                      link
                    </Link>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
          <TableFooter className="mt-5">
            <TableRow className="bg-black hover:bg-gray-900 rounded-xl text-gray-500">
              <TableCell className="" colSpan={3}>
                Total applications
              </TableCell>
              <TableCell className="text-right font-semibold">{data.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  )
}

export default TableInfo
