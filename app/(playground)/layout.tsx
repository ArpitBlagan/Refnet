import React from 'react'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import '../globals.css'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Provider from '../Provider'
import Sidebar from '@/components/Sidebar'
// import Rightbar from "@/components/Rightbar";
import { Toaster } from 'sonner'
import { SocketProvider } from '../socket-context'
import Mobilebar from '@/components/mobile-bar'
const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
})
const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
})

export const metadata: Metadata = {
  title: 'Refnet',
  description: 'Showcase you work ⚡️.'
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  // Add routes where you don't want to display nav/footer
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider session={session}>
          <SocketProvider>
            <Toaster richColors />
            <div>
              <div className="flex h-screen">
                <Sidebar />
                <div className="flex-1 overflow-y-auto ">{children}</div>
              </div>
              <Mobilebar />
            </div>
          </SocketProvider>
        </Provider>
      </body>
    </html>
  )
}
