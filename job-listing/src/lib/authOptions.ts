import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { jwtDecode } from "jwt-decode";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const res = await fetch("https://akil-backend.onrender.com/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const result = await res.json();

        if (!res.ok) throw new Error(result.message || "Login failed");

        const { id, accessToken, refreshToken } = result.data;

        const decoded = jwtDecode<{ exp: number }>(accessToken);
        const accessTokenExpires = decoded.exp * 1000; // ms

        return {
          id,
          email: credentials.email,
          accessToken,
          refreshToken,
          accessTokenExpires,
        };
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign-in
      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: user.accessTokenExpires,
        };
      }

      // Access token expired
      if (token.accessTokenExpires && Date.now() > token.accessTokenExpires) {
        return {
          ...token,
          accessToken: null,
          error: "AccessTokenExpired",
        };
      }

      // Still valid
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.accessToken = token.accessToken ?? undefined;
      session.refreshToken = token.refreshToken ?? undefined;
      session.error = token.error;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
