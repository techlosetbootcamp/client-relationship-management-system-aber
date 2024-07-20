import NextAuth, { Awaitable, RequestInternal, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

// const users = [
//   {
//     id: "1",
//     email: "test1@test.com",
//     password: 123456,
//   },
//   {
//     id: "2",
//     email: "test2@test.com",
//     password: 123456,
//   },
// ];

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      authorize: async function (credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }
        try {
          await prisma.$connect();

          const user = await prisma.user.findUnique({
            where: {
              email: credentials?.email,
            },
          });

          if (!user) {
            return null;
          }
          const userPassword = await bcrypt.compare(
            credentials?.password,
            user.password
          );

          console.log("userpassword here", userPassword);
          if (!userPassword) {
            console.log("inside userpassword");
            return null;
          }
          return user;
        } catch (error) {
          console.log(error);
          return null;
        } finally {
          await prisma.$disconnect();
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ||""
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7,
  },
  debug: true,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
