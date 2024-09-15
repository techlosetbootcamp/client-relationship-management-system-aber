import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  if (globalThis.prisma) {
    prisma = globalThis.prisma;
  } else {
    prisma = new PrismaClient();
    globalThis.prisma = prisma;
  }
} else {
  prisma = new PrismaClient();
}

export default prisma;
