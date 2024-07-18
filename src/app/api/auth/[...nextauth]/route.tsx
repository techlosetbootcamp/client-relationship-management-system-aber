import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("req in head", credentials);
        if (!credentials?.email || !credentials?.password) {
          return null;
        } 
        return null
        
          // try {
          //   await prisma.$connect();
          //   // return null
          //   const user = await prisma.user.findFirst({
          //     where: {
          //       email: credentials?.email,
          //     },
          //   });

          //   if (!user) {
          //     return NextResponse.json(
          //       { message: "User does not exist" },
          //       { status: 422 }
          //     );
          //   }

          //   const userPassword = await bcrypt.compare(
          //     credentials?.password,
          //     user.password
          //   );

          //   if (!userPassword) {
          //     return NextResponse.json(
          //       { message: "Invalid email or password" },
          //       { status: 422 }
          //     );
          //   }

          //   return NextResponse.json({ user }, { status: 201 });
          // } catch (error) {
          //   console.log("hey this is the error", error);
          // } finally {
          //   await prisma.$disconnect();
            
           
           
          // }

     
          
        
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
