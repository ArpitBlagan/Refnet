import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/db";
import { getServerSession } from "next-auth";
export let getProfileInfo: () => any;
getProfileInfo = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { error: "user is not signed in." };
  }
  try {
    const details = await prisma.user.findFirst({
      where: { id: session?.user.id },
      include: {
        followers: true,
        following: true,
      },
    });
    return { message: "fetched", ...details };
  } catch (err) {
    return { error: "something went wrong while fetching user info 🥲." };
  }
};
