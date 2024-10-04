import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from '@/db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Email',
          type: 'text',
          placeholder: 'arpitblagan27@gmail.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        //@ts-ignore
        const email = credentials?.email
        const password = credentials?.password
        const user = await prisma.user.findUnique({ where: { email } })
        if (user && password && (await bcrypt.compare(password, user.password || ''))) {
          const token = jwt.sign(
            { user: { id: user.id, email: user.email, name: user.name } },
            process.env.NEXTAUTH_SECRET as string
          )
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            profileImage: user.profileImage,
            token
          }
        }
        return null
      }
    }),
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }: any) {
      if (account.provider == 'github') {
        const uu = await prisma.user.findUnique({
          where: { email: user.email }
        })
        if (uu) {
          const token = jwt.sign(
            { user: { id: uu.id, email: user.email, name: user.name } },
            process.env.NEXTAUTH_SECRET as string
          )
          return {
            id: uu.id,
            name: user.name,
            email: user.email,
            profileImage: user.image,
            token
          }
        }
        const nuu = await prisma.user.create({
          data: {
            id: user.id,
            name: user.name,
            email: user.email,
            profileImage: user.image,
            githubLink: profile.html_url,
            githubId: user.id,
            accessTokem: account.access_token
          }
        })
        const token = jwt.sign(
          { user: { id: nuu.id, email: user.email, name: user.name } },
          process.env.NEXTAUTH_SECRET as string
        )
        return {
          id: nuu.id,
          name: user.name,
          email: user.email,
          profileImage: user.image,
          token
        }
      } else {
        return user
      }
    },
    jwt: async ({ user, token }: any) => {
      if (user) {
        token.uid = user.id
        token.jwtToken = user.token
        token.image = user.profileImage
      }
      return token
    },
    session: async ({ session, token }: any) => {
      if (session?.user) {
        session.user.id = token.uid
        session.user.jwtToken = token.jwtToken
        session.user.image = token.image || token.picture
      }

      return session
    }
  },
  pages: {
    signIn: '/signup'
  }
}

//@ts-ignore
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
