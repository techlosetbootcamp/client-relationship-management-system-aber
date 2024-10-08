import NextAuth, { Awaitable, RequestInternal, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/helpers/prisma";

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

          if (!userPassword) {
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
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7,
  },
  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (user) {
        return {
          ...token,
          id: user?.id,
        };
      }
      if (trigger === "update" && session) {
        if (session?.name) {
          token.name = session?.name;
        }

        if (session?.email) {
          token.email = session?.email;
        }

        if (session?.image) {
          token.picture = session?.image;
        }
      }
      return token;
    },
    async session({ token, user, session }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
          email: token.email,
          image: token.picture,
          public_id: token.public_id,
        },
      };
    },
  },

  debug: true,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
