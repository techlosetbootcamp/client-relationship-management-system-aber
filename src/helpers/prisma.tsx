// // prisma.ts

// import { PrismaClient } from "@prisma/client";

// declare global {
//   var prisma: PrismaClient;
// }

// const prisma: PrismaClient = global.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") {
//   if (!global.prisma) {
//     global.prisma = new PrismaClient();
//   }
// }

// // let prisma: PrismaClient;

// // if (process.env.NODE_ENV === 'production') {
// //   prisma = global.prisma || new PrismaClient();
// //   global.prisma = prisma;
// // } else {
// //   prisma = new PrismaClient();
// // }

// export default prisma;

import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  // @ts-ignore: Ignore the first initialization check
  prisma = global.prisma || new PrismaClient();
  // @ts-ignore: Assigning the client to the global object
  global.prisma = prisma;
} else {
  prisma = new PrismaClient();
}

export default prisma;
