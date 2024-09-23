import { getRecentRegisteredUser } from "@/actions/get-profile";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const RecentRegisteredUser = async () => {
  const data = await getRecentRegisteredUser();
  if (data.error) {
    return (
      <div className="h-[40vh] flex items-center justify-center">
        <p>something went wrong.</p>
      </div>
    );
  }
  return (
    <div className="grid md:grid-cols-2 gap-2">
      {data.users &&
        data?.users.map((ele, index) => {
          return (
            <Link
              href={`/profile/${ele.id}`}
              key={index}
              className="flex flex-col gap-1 border py-2 px-4 rounded-xl border-zinc-800"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={ele.profileImage || ""}
                  alt="image"
                  width={80}
                  height={80}
                  className="rounded-xl"
                />
                <h1 className="text-md font-semibold">{ele.name}</h1>
              </div>
              <p className="text-sm text-gray-700">{ele.email}</p>
            </Link>
          );
        })}
    </div>
  );
};

export default RecentRegisteredUser;