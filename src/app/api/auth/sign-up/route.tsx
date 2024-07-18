import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"


const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  const { email, name, password } = await req.json();

  if (!email || !name || !password) {
    return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);


  try {
    await prisma.$connect();
    
    const newUser =await prisma.user.create({
      data: {
        email,
        password:hashedPassword,
        name,
      },
    });

    return NextResponse.json({ newUser }, { status: 201 });
  } catch (error) {
    console.log("in sign-up", error);
  } finally {
    prisma.$disconnect();
  }
};
