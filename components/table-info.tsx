import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import Link from 'next/link'
import { useState } from 'react'

const TableInfo = ({ data }: { data: any }) => {
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name and Email</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Github</TableHead>
            <TableHead className="text-right">Refnet</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((ele: any, index: number) => {
            return (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  <p>
                    {ele.name} <span>{ele.email}</span>
                  </p>
                </TableCell>
                <TableCell>
                  <Link href={ele.user.resumeLink}>link</Link>
                </TableCell>
                <TableCell>
                  <Link href={ele.user.githubLink}>link</Link>
                </TableCell>
                <TableCell className="text-right">
                  <Link href={`/profile/${ele.user.id}`}>link</Link>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default TableInfo
