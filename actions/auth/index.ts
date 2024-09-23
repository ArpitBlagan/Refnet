"use server";
import prisma from "@/db";
import bcrypt from "bcryptjs";
export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const user = await prisma.user.findFirst({ where: { email } });
  if (user) {
    return { error: "This email is already registered:(" };
  }
  const hash = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      name,
      email,
      password: hash,
    },
  });
  return { message: "user signuped successfully :)" };
};
