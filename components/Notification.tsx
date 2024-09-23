"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
const Notification = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState<any[]>([
    {
      title: "New follow request",
      description: "Arpit Blagan started following you.",
      date: new Date(Date.now()),
    },
  ]);
  return (
    <div className="px-3 py-7 border border-zinc-800 rounded-xl h-[540px] flex flex-col gap-2">
      <div>
        <h1 className="font-bold text-center">Notifications</h1>
      </div>
      <div>
        {notifications.map((ele, index) => {
          return (
            <div
              key={index}
              className="px-4 py-2 
              flex-flex-col gap-1 cursor-pointer
              duration-300 ease-in-out hover:bg-gray-900 border-t border-b border-zinc-900 rounded-md"
              onClick={() => {
                router.push("/notifications");
              }}
            >
              <p className="text-bold text-green-600">{ele.title}</p>
              <p className="text-gray-600">
                {ele.description.substr(0, 50)}...
              </p>
              <p className="text-end"> </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notification;
