import NextAuth, { type DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's role. */
      role: string
      phone: string | null
    } & DefaultSession["user"]
  }

  interface User {
    role: string
    phone?: string | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string
    phone?: string | null
  }
}
