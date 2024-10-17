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
      <div className="main_wrapper">
        <div className="main">
          <div className="antenna">
            <div className="antenna_shadow"></div>
            <div className="a1"></div>
            <div className="a1d"></div>
            <div className="a2"></div>
            <div className="a2d"></div>
            <div className="a_base"></div>
          </div>
          <div className="tv">
            <div className="cruve">
              <svg
                viewBox="0 0 189.929 189.929"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                className="curve_svg"
              >
                <path
                  d="M70.343,70.343c-30.554,30.553-44.806,72.7-39.102,115.635l-29.738,3.951C-5.442,137.659,11.917,86.34,49.129,49.13
    C86.34,11.918,137.664-5.445,189.928,1.502l-3.95,29.738C143.041,25.54,100.895,39.789,70.343,70.343z"
                />
              </svg>
            </div>
            <div className="display_div">
              <div className="screen_out">
                <div className="screen_out1">
                  <div className="screen">
                    <span className="notfound_text"> NOT FOUND</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="lines">
              <div className="line1"></div>
              <div className="line2"></div>
              <div className="line3"></div>
            </div>
            <div className="buttons_div">
              <div className="b1">
                <div></div>
              </div>
              <div className="b2"></div>
              <div className="speakers">
                <div className="g1">
                  <div className="g11"></div>
                  <div className="g12"></div>
                  <div className="g13"></div>
                </div>
                <div className="g"></div>
                <div className="g"></div>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="base1"></div>
            <div className="base2"></div>
            <div className="base3"></div>
          </div>
        </div>
        <div className="text_404">
          <div className="text_4041">4</div>
          <div className="text_4042">0</div>
          <div className="text_4043">4</div>
        </div>
      </div>
    )
  } else {
    return (
      <div
        className="flex-1  overflow-y-scroll 
      flex flex-col justify-start min-h-full  mt-7 mb-10 "
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
