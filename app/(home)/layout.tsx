import React from 'react'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import '../globals.css'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import Provider from '../Provider'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Toaster } from 'sonner'
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
          <Toaster richColors />
          <Navbar />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
