import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from './lib/auth'

const protectedPaths = ['/signin', '/signup']
const anotherPaths = ['/upload', '/profile', 'notifications']
const isAuthenticated = async () => {
  // const sessionToken = req.cookies.get("next-auth.session-token"); // Adjust based on your auth mechanism
  // return sessionToken !== undefined; // Return true if authenticated
  const session = await getServerSession(authOptions)
  if (session.user) {
    return true
  }
  return false
}
export default async function middlware(req: NextRequest) {
  const { pathname } = req.nextUrl
  console.log(pathname)
  const authenticated = await isAuthenticated()
  if (authenticated && protectedPaths.includes(pathname)) {
    // Redirect to home page or another desired route

    return NextResponse.redirect(new URL('/', req.url))
  } else if (!authenticated) {
    if (anotherPaths.includes(pathname)) {
      return NextResponse.redirect(new URL('/signin', req.url))
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/signin', '/signup', '/upload', '/notifications', '/profile'] // Apply only to these paths
}
