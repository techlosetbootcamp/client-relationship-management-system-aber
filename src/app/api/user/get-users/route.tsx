import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async () => {
  try {
    await prisma.$connect();
    const users = await prisma.user.findMany();
    if (!users) {
      return NextResponse.json({ message: "No user Found" }, { status: 404 });
    }

    return NextResponse.json({ users });
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
};
