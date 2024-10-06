import { getUserInfoById } from '@/app/actions/get-profile'
import { isMissing, readableFormat } from '@/common'
import FollowUnFollow from '@/components/follow-unfollow'
import FollowersDialog from '@/components/followers-dialog'
import FollowingDialog from '@/components/following-dialog'
import FollowOrUnfollow from '@/components/FollowOrUnfollow'
import Posts from '@/components/Posts'
import { Button } from '@/components/ui/button'
import UpdateProfileCount from '@/components/update-profile-count'
import {
  RiCalendarTodoFill,
  RiGithubFill,
  RiLinkedinBoxFill,
  RiLinkM,
  RiTwitterXFill
} from '@remixicon/react'
import Image from 'next/image'
import Link from 'next/link'

const page = async ({ params }: { params: any }) => {
  const id = params.id
  if (!id) {
    return (
      <div
        className="flex-1 ml-[50px] md:ml-[250px] w-full overflow-y-scroll 
flex flex-col justify-start min-h-full  mt-7 mb-10 w-full"
      >
        Something went wrong 🥲.
      </div>
    )
  }
  const res = await getUserInfoById(id)
  console.log(res)
  if (!res && res?.error) {
    return (
      <div
        className="flex-1 ml-[50px] md:ml-[250px] lg:mr-[400px] overflow-y-scroll 
flex flex-col justify-start min-h-full  mt-7 mb-10 w-full"
      >
        Something went wrong 🥲.
      </div>
    )
  } else {
    return (
      <div
        className="flex-1 ml-[50px] md:ml-[250px] w-full overflow-y-scroll 
  flex flex-col justify-start min-h-full  mt-7 mb-10 w-full"
      >
        <UpdateProfileCount userId={id} />
        <div className=" flex flex-col gap-10 py-7 px-7 w-full mb-8">
          <div className="flex items-center gap-4 py-7 border-b border-white ">
            <div>
              <h1 className="text-4xl font-bold">{res.userInfo.name}</h1>
              <p className="text-gray-500">{res.userInfo.email}</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="">
              {isMissing(res.userInfo) && (
                <p className="py-2 bg-red-500 px-4 rounded-md text-md font-semibold">
                  Your Profile is complete 🥲 click on Edit profile and complete it.
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex md:flex-row flex-col items-center gap-3 ">
              <div className="w-32 h-32 rounded-full overflow-hidden relative">
                <Image
                  src={res.userInfo.profileImage || ''} // Replace with your image path
                  alt="Circular Image"
                  layout="fill" // Fills the container
                  objectFit="cover" // Ensures the image maintains its aspect ratio and covers the container
                  className="absolute inset-0"
                />
              </div>
              <p className="flex-1 text-start font-semibold text-md">{res.userInfo.description}</p>
            </div>
            <FollowUnFollow
              userId={''}
              userPostId={id}
              following={res.userInfo.following}
              followers={res.userInfo?.followers}
            />
            {res.userInfo.resumeLink && (
              <Link
                href={res.userInfo.resumeLink}
                className="flex items-center hover:underline duration-300 ease-in-out font-bold"
              >
                Resume
                <RiLinkM size={20} />
              </Link>
            )}

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-end">
                <p className="flex   items-center gap-1 text-gray-500 text-sm font-semibold">
                  {' '}
                  <RiCalendarTodoFill /> Joined at {readableFormat(res.userInfo.joinedAt)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <p className=" font-semibold flex items-center gap-1">
                  <span>{res.userInfo.following.length}</span>
                  <FollowingDialog id={id} />
                </p>
                <p className=" font-semibold flex items-center gap-1">
                  <span>{res.userInfo.followers.length}</span>
                  <FollowersDialog id={id} />
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 ">
              {res.userInfo.LinkedinLink && (
                <Link href={res.userInfo.LinkedinLink} className="flex items-center justify-center">
                  <RiLinkedinBoxFill size={30} className="hover:text-white text-gray-500" />
                </Link>
              )}
              {res.userInfo.twitterLink && (
                <Link href={res.userInfo.twitterLink} className="flex items-center justify-center">
                  <RiTwitterXFill size={30} className="hover:text-white text-gray-500" />
                </Link>
              )}
              {res.userInfo.githubLink && (
                <Link href={res.userInfo.githubLink} className="flex items-center justify-center">
                  <RiGithubFill size={30} className="hover:text-white text-gray-500" />
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="font-semibold text-2xl pb-3 border-b border-zinc-800">Projects</h1>
          <Posts userId={id} showToOther={true} myPosts={true} />
        </div>
      </div>
    )
  }
}

export default page
