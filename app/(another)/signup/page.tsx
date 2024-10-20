'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RiGithubFill } from '@remixicon/react'
import { signIn } from 'next-auth/react'
import { Eye, EyeOff } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
const signupSchema = z.object({
  name: z.string().min(5, 'Name should atleast have 5 character'),
  email: z.string().email('Please provide valid and active email address.'),
  password: z.string().min(6, 'Password should be atleast 6 characters long.')
})
type signup = z.infer<typeof signupSchema>
import { SubmitHandler, useForm } from 'react-hook-form'

import { registerUser } from '@/app/actions/auth'
import { useState } from 'react'
import { toast } from 'sonner'
import Link from 'next/link'
import { BorderBeam } from '@/components/ui/border-beam'
const Page = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const callbackurl = useSearchParams() || '/'
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<signup>({ resolver: zodResolver(signupSchema) })
  const onSubmit: SubmitHandler<signup> = (data) => {
    toast.promise(
      async () => {
        setLoading(true)
        const res = await registerUser(data.name, data.email, data.password)
        if (res.message) {
          return res
        }
        throw new Error(res.error)
      },
      {
        loading: 'Loading...',
        success: (res) => {
          setLoading(false)
          router.push('/signin')
          return `${res.message}`
        },
        error: (error) => {
          setLoading(false)
          return `${error}`
        }
      }
    )
  }

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] mx-2 gap-4 ">
      <div className="relative w-full md:w-1/2 min:h-1/2 flex flex-col items-center justify-center gap-4 bg-zinc-800 rounded-xl py-5 px-7">
        <BorderBeam className="hidden md:block" size={250} duration={32} delay={9} />
        <div className="flex flex-col items-center justify-center gap-3 mb-7">
          <Link href="/">
            <svg
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              className="h-[70px] w-[100px] mb-2"
            >
              <path
                fill="#F2F4F8"
                d="M23.4,-9.7C30.9,15.6,38.1,39,31.9,43.3C25.8,47.6,6.2,32.9,-5.5,21.2C-17.2,9.4,-21.2,0.6,-19,-17.4C-16.8,-35.4,-8.4,-62.6,-0.2,-62.6C7.9,-62.5,15.8,-35.1,23.4,-9.7Z"
                transform="translate(100 100)"
              />
            </svg>
          </Link>
          <p className="text-lg">Welcome to Refnet</p>
          <p className="hidden md:block text-sm text-slate-300 text-center">
            Get started with Refnet and unlock great opportunites waiting for you.
          </p>
        </div>
        <form
          className="flex flex-col w-full gap-3 items-center justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            className="w-full lg:w-1/2 py-3 bg-black  h-[40px] border-zinc-800"
            placeholder="Enter your name"
            {...register('name')}
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}

          <Input
            className="w-full lg:w-1/2 py-3 bg-black  h-[40px] border-zinc-800"
            placeholder="Enter your email address"
            {...register('email')}
          />

          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

          <div className="relative w-full lg:w-1/2 flex items-center justify-center bg-black rounded-md">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              {...register('password')}
              className=" w-full py-3  h-[40px] border-zinc-800"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute hover-bg-none right-0 top-0 h-full px-3 py-2  text-gray-400 hover:text-gray-600"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </Button>
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password.message}</span>
          )}
          <Button
            type="submit"
            disabled={loading}
            className="py-5 hover:bg-gray-700 duration-300 ease-in-out mb-3 w-1/2"
          >
            Get started 🪄
          </Button>
        </form>
        <hr className="border border-zinc-700 w-full" />
        <Button
          onClick={async (e) => {
            e.preventDefault()
            try {
              await signIn('github', {
                redirect: false,
                callbackUrl: '/profile'
              })
              console.log('successfull :)')
            } catch (err) {
              console.log(err)
            }
          }}
          className="flex items-center gap-3 mt-3 hover:bg-gray-700 duration-300 ease-in-out"
        >
          Get started with <RiGithubFill />
        </Button>
        <p>
          Already have an Account?{'  '}
          <a href="/signin" className="text-blue-400 underline">
            Sign in
          </a>
        </p>
      </div>
      <div>
        <p className="text-sm text-slate-600 text-center">
          By using Refnet, you agree to our Privacy Policy and Terms of Service.
        </p>
      </div>
    </div>
  )
}

export default Page
