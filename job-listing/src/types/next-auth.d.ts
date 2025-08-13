import NextAuth, { DefaultSession } from "next-auth";

// Extend Session type
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    error?: string;
    user: {
      id: string;
      email: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
  }
}

// Extend JWT type
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    accessToken?: string | null;
    refreshToken?: string;
    accessTokenExpires?: number;
    error?: string;
  }
}
