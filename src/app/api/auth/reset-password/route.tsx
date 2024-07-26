import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  const { password, confirmPassword, userId } = await req.json();

  console.log("in reset-password api", password, confirmPassword, userId);

  if (!password || !confirmPassword) {
    return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
  }

  if (password != confirmPassword) {
    return NextResponse.json({ message: "Passwords does not match" });
  }

  const newPassword = await bcrypt.hash(password, 10);

  try {
    const existingUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: newPassword,
      },
    });

    return NextResponse.json({ message: "Passwords changed successfully" });
  } catch (error) {
    console.log(error);
  }
};
