import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/helpers/prisma";

export const POST = async (req: Request) => {
  const { email, username, password, confirmPassword } = await req.json();

  if (!email || !username || !password || !confirmPassword) {
    return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
  }

  if (password != confirmPassword) {
    return NextResponse.json({ message: "Passwords does not match" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.$connect();

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: username,
      },
    });

    return NextResponse.json({
      newUser,
      status: 201,
      message: "User has been created",
    });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
};
