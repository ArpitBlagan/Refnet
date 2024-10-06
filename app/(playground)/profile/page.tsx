import { getProfileInfo } from '@/app/actions/get-profile'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { isMissing, readableFormat } from '@/common'
import EditProfile from '@/components/edit-profile'
import FollowersDialog from '@/components/followers-dialog'
import FollowingDialog from '@/components/following-dialog'
import SecondSection from '@/components/profile-second-section'

import {
  RiCalendarTodoFill,
  RiGithubFill,
  RiLinkedinBoxFill,
  RiLinkM,
  RiTwitterXFill
} from '@remixicon/react'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'

async function page() {
  const session = await getServerSession(authOptions)
  console.log(session)
  const res = await getProfileInfo(session.user.id)
  console.log(res)
  if (!res || res.error) {
    return (
      <div
        className="flex-1 ml-[50px] md:ml-[250px] w-full overflow-y-scroll 
    flex flex-col justify-start min-h-full  mt-7 mb-10 w-full"
      >
        Something went wrong 🥲 please try again later.
      </div>
    )
  } else {
    return (
      <div
        className="flex-1 ml-[50px] md:ml-[250px] w-full overflow-y-scroll 
      flex flex-col justify-start min-h-full  mt-7 mb-10 w-full"
      >
        <div className="mb-8 flex flex-col gap-10 py-7 px-7 w-full">
          <div className="flex items-center gap-4 py-7 border-b border-white ">
            <div>
              <h1 className="text-4xl font-bold">{res.name}</h1>
              <p className="text-gray-500">{res.email}</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="">
              {isMissing(res) && (
                <p className="py-2 bg-red-500 px-4 rounded-md text-md font-semibold">
                  Your Profile is complete 🥲 click on Edit profile and complete it.
                </p>
              )}
            </div>

            <EditProfile />
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex md:flex-row flex-col items-center gap-3 ">
              <div className="w-32 h-32 rounded-full overflow-hidden relative">
                <Image
                  src={res.profileImage || ''} // Replace with your image path
                  alt="Circular Image"
                  layout="fill" // Fills the container
                  objectFit="cover" // Ensures the image maintains its aspect ratio and covers the container
                  className="absolute inset-0"
                />
              </div>
              <p className="flex-1 text-start font-semibold text-md">{res.description}</p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-end">
                <p className="flex  items-center gap-1 text-gray-500 text-sm font-semibold">
                  {' '}
                  <RiCalendarTodoFill /> Joined at {readableFormat(res.joinedAt)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold flex items-center gap-1">
                  <span>{res.following.length}</span>
                  <FollowingDialog id={session.user.id} />
                </p>
                <p className="text-sm font-semibold flex items-center gap-1">
                  <span>{res.followers.length}</span>
                  <FollowersDialog id={session.user.id} />
                </p>
                {res.resumeLink && (
                  <Link
                    href={res.resumeLink}
                    className="text-sm font-semibold flex items-center gap-1"
                  >
                    <p className="">Resume</p>
                    <RiLinkM size={20} />
                  </Link>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 ">
              {res.LinkedinLink && (
                <Link href={res.LinkedinLink} className="flex items-center justify-center">
                  <RiLinkedinBoxFill size={30} className="hover:text-white text-gray-500" />
                </Link>
              )}
              {res.twitterLink && (
                <Link href={res.twitterLink} className="flex items-center justify-center">
                  <RiTwitterXFill size={30} className="hover:text-white text-gray-500" />
                </Link>
              )}
              {res.githubLink && (
                <Link href={res.githubLink} className="flex items-center justify-center">
                  <RiGithubFill size={30} className="hover:text-white text-gray-500" />
                </Link>
              )}
            </div>
          </div>
        </div>
        <SecondSection id={session.user.id} />
      </div>
    )
  }
}

export default page
