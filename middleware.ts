import { NextRequest, NextResponse } from 'next/server'

const protectedPaths = ['/signin', '/signup']
const anotherPaths = ['/upload', '/profile', '/notifications']

const isAuthenticated = (req: NextRequest) => {
  // Check for the presence of the NextAuth.js session token
  const sessionToken =
    req.cookies.get('next-auth.session-token') ||
    req.cookies.get('__Secure-next-auth.session-token')

  // Return true if the token exists
  return sessionToken !== undefined
}

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  console.log(pathname)

  const userAuthenticated = isAuthenticated(req)

  if (userAuthenticated && protectedPaths.includes(pathname)) {
    // Redirect authenticated users trying to access signin/signup
    return NextResponse.redirect(new URL('/', req.url))
  }

  if (!userAuthenticated && anotherPaths.includes(pathname)) {
    // Redirect unauthenticated users trying to access protected paths
    return NextResponse.redirect(new URL('/signin', req.url))
  }

  // Continue to the next middleware/route if no redirects are necessary
  return NextResponse.next()
}

export const config = {
  matcher: ['/signin', '/signup', '/upload', '/notifications', '/profile'] // Apply only to these paths
}
