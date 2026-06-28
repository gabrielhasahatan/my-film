import { TokenResponse } from '@/modules/Login/types/response';
import { AuthOptions, DefaultSession, User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

declare module "next-auth" {
  interface Session {
    user: {
      username: string;
      accessToken: string
      id: string
      imageUrl: string
    } & DefaultSession["user"]
  }

  interface User {
    username: string
    accessToken: string
    imageUrl: string
  }
}

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      authorize: async (credentials) => {
        const authParams = {
          email: credentials?.email,
          password: credentials?.password,
        };
        const response = await fetch(`${process.env.AUTH_HOST}/api/users/sign_in`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(authParams),
        });
        if (response.ok) {
          const result: TokenResponse = await response.json();
          const { user } = result;
          return {
            id: user.id,
            username: user.username,
            email: user.email,
            accessToken: result.access_token,
            imageUrl: user.image_url
          } as User;
        } else {
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 1
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken,
          token.id = user.id
        token.username = user.username
        token.imageUrl = user.imageUrl
      }
      return token
    },
    session({ session, token }) {
      if (token) {
        session.user.accessToken = token.accessToken as string;
        session.user.id = token.sub!
        session.user.username = token.username as string
        session.user.imageUrl = token.imageUrl as string
      }
      return session
    }
  },
  pages: {
    signIn: "/login"
  }
}
