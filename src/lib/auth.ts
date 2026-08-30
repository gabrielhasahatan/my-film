import { TokenResponse } from '@/modules/Login/types/response';
import { AuthOptions, DefaultSession, User } from 'next-auth'
import { JWT } from 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials'

declare module "next-auth" {
  interface Session {
    user: {
      username: string;
      accessToken: string
      refreshToken: string;
      id: string
      imageUrl: string
      accessTokenExpiry: number;
      error?: string;
    } & DefaultSession["user"]
  }

  interface User {
    username: string
    accessToken: string
    refreshToken: string;
    accessTokenExpiry: number;
    imageUrl: string
  }
}

// TODO :: OPTIMZE LATER
async function refreshAccessToken(token: JWT) {
  try {
    console.log("mulai refreshToken")
    const response = await fetch(`${process.env.AUTH_ENDPOINT}/api/users/tokens`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.accessToken}`,
        "Refresh-Token": token.refreshToken as string,
      },
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      return { ...token, error: "RefreshAccessTokenError" };
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      refreshToken: refreshedTokens.refresh_token,
      accessTokenExpiry: Date.now() + refreshedTokens.expires_in * 1000,
      error: undefined,
    };
  } catch (error) {
    return { ...token, error: "RefreshAccessTokenError" };
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
        const response = await fetch(`${process.env.AUTH_ENDPOINT}/api/users/sign_in`, {
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
            refreshToken: result.refresh_token,
            accessTokenExpiry: Date.now() + (result.expires_in as number) * 1000,
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
    maxAge: 60 * 60 * 24 * 2
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken,
          token.refreshToken = user.refreshToken;
        token.accessTokenExpiry = user.accessTokenExpiry;
        token.id = user.id
        token.username = user.username
        token.imageUrl = user.imageUrl
        return token
      }
      if (Date.now() < (token.accessTokenExpiry as number) - 120000) {
        return token;
      }

      return refreshAccessToken(token);
    },
    session({ session, token }) {
      if (token) {
        session.user.accessToken = token.accessToken as string;
        session.user.id = token.sub!
        session.user.username = token.username as string
        session.user.imageUrl = token.imageUrl as string
        session.user.accessTokenExpiry = token.accessTokenExpiry as number;
        (session as any).error = token.error;
      }
      return session
    }
  },
  pages: {
    signIn: "/login"
  }
}
