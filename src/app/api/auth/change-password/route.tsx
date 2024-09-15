import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { useSession } from "next-auth/react";

// const prisma = new PrismaClient();
import prisma from "@/helpers/prisma";

export const POST = async (req: Request) => {
  const { currentPassword, newPassword, confirmNewPassword, userId } =
    await req.json();

  if (!currentPassword || !newPassword || !confirmNewPassword) {
    return NextResponse.json({ message: "Invalid Data", status: 400 });
  }

  if (newPassword != confirmNewPassword) {
    return NextResponse.json({
      message: "Passwords do not match",
      status: 400,
    });
  }

  const updatedPassword = await bcrypt.hash(newPassword, 10);
  const password = await bcrypt.hash(currentPassword, 10);

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
      return NextResponse.json({ message: "Invalid User" , status:400});
    }

    const passwordCompare = await bcrypt.compare(
      currentPassword,
      existingUser.password
    );

    if (!passwordCompare) {
      return NextResponse.json(
        { message: "Old password is incorrect" ,status: 400},
     
      );
    }

    if (currentPassword === newPassword && newPassword === confirmNewPassword) {
      return NextResponse.json({
        message: "New Password cannot be same as old password",
        status: 400,
      });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: updatedPassword,
      },
    });

    return NextResponse.json({ message: "Passwords changed successfully! Please sign in again" , status:200});
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }
};
