import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import prisma from "@/helpers/prisma";

export const POST = async (req: Request) => {
  const { password, confirmPassword, userId } = await req.json();

  if (!password || !confirmPassword) {
    return NextResponse.json({ message: "Invalid Data", status: 400 });
  }

  if (password != confirmPassword) {
    return NextResponse.json({
      message: "Passwords do not match. Please check your input and try again.",
      status: 400,
    });
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

    return NextResponse.json({
      message: "Your password has been successfully reset",
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
};
