import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions" // wherever your config is

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
console.log("NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET);
