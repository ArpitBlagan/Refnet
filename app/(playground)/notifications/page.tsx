import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Notification from "@/components/Notification";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div
      className="flex-1 ml-[50px] md:ml-[250px] w-full overflow-y-scroll 
  flex flex-col justify-start min-h-full  mt-7 mb-10 w-full"
    >
      <Notification postPerPage={40} userId={session.user.id} />
    </div>
  );
};

export default page;
