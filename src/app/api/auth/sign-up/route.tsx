import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"


const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  const { email,  username, password, confirmPassword } = await req.json();
  console.log(req)

  console.log("in sign-up api", username,email,password, confirmPassword )

  if (!email || !username || !password || !confirmPassword) {
    return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
  }

  if(password!=confirmPassword){
    return NextResponse.json({message:"Passwords does not match"})
  }

  const hashedPassword = await bcrypt.hash(password, 10);


  try {
    await prisma.$connect();
    
    const newUser =await prisma.user.create({
      data: {
        email,
        password:hashedPassword,
        username,
      },
    });

    return NextResponse.json({ newUser }, { status: 201 });
  } catch (error) {
    console.log("in sign-up", error);
  } finally {
    prisma.$disconnect();
  }
};
