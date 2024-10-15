'use client'
import { useSession } from 'next-auth/react'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

const SocketContext = createContext<Socket | null>(null)

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const { data: session } = useSession()
  useEffect(() => {
    console.log(session)
    const ff = io('http://localhost:8000', {
      query: {
        //@ts-ignore
        id: session?.user?.id
      }
    })
    setSocket(ff)
    return () => {
      ff.disconnect()
    }
  }, [])

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
}

export const useSocket = () => {
  return useContext(SocketContext)
}
