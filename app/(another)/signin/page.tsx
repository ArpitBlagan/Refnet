"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RiGithubFill } from "@remixicon/react";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const signinSchema = z.object({
  email: z.string().email("Please provide valid email address."),
  password: z.string().min(6, "Password should be atleast 6 characters long."),
});
import { useRouter } from "next/navigation";
type signin = z.infer<typeof signinSchema>;
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
const page = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signin>({ resolver: zodResolver(signinSchema) });
  const onSubmit: SubmitHandler<signin> = (data) => {
    const res = toast.promise(
      async () => {
        setLoading(true);
        const res = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });

        return res;
      },
      {
        loading: "Loading...",
        success: () => {
          setLoading(false);
          router.push("/profile");
          return "Signin successfully 😁.";
        },
        error: () => {
          setLoading(false);
          return "Signin falied pleaes check your email & password combination and try again later ❌.";
        },
      }
    );
  };
  return (
    <div className="flex flex-col items-center justify-center h-[100vh] mx-2 gap-4 ">
      <div className="w-full md:w-1/2 min:h-1/2 flex flex-col items-center justify-center gap-4 bg-zinc-800 rounded-xl py-5 px-7">
        <div className="flex flex-col items-center justify-center gap-3">
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
          <p className="text-lg">Welcome back to Refnet</p>
        </div>
        <form
          className="flex flex-col gap-4 w-full items-center justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            {...register("email")}
            className="w-full lg:w-1/2 border-zinc-800 bg-black  h-[40px]"
            placeholder="arpitblagan27@gmail.com"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
          <div className="relative w-full lg:w-1/2 flex items-center justify-center bg-black rounded-md">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password")}
              className=" w-full py-3  h-[40px] border-zinc-800"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute hover-bg-none right-0 top-0 h-full px-3 py-2  text-gray-400 hover:text-gray-600"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </Button>
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
          <Button
            type="submit"
            disabled={loading}
            className="py-5 hover:bg-gray-700 duration-300 ease-in-out mb-3 w-1/2"
          >
            Sign in
          </Button>
        </form>
        <hr className="border border-zinc-700 w-full" />
        <Button
          onClick={async (e) => {
            e.preventDefault();
            await signIn("github", { callbackUrl: "/profile" });
          }}
          className="flex items-center gap-3 mt-3 hover:bg-gray-700 duration-300 ease-in-out"
        >
          Sign with Github <RiGithubFill />
        </Button>
        <p>
          Don't have an Account?{"  "}
          <a href="/signup" className="text-slate-600 underline">
            Sign up
          </a>
        </p>
      </div>
      <div>
        <p className="text-md text-slate-600">
          By using Refnet, you agree to our Privacy Policy and Terms of Service.
        </p>
      </div>
    </div>
  );
};

export default page;
