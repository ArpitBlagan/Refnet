"use server";
import prisma from "@/db";
import bcrypt from "bcryptjs";
import { sendNotificationTroughEmail } from "../notification";
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
  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hash,
      },
    });
    sendNotificationTroughEmail(
      {
        title: `Welcome to Refnet ${name}`,
        message:
          "Refnet welcomes you in Refnet's world where developer easy showcase their work and caught in the eyes of recruiters. Thank You & Regards",
      },
      email
    );
    return { message: "user signuped successfully :)" };
  } catch (err) {
    return { error: "not able to register user." };
  }
};
