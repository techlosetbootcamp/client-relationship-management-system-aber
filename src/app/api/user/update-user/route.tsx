import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// const prisma = new PrismaClient();
import prisma from "@/helpers/prisma";

export const POST = async (req: Request) => {
  const { id, currentEmail, newEmail, name } = await req.json();

  console.log("in update-user api", id, currentEmail, newEmail, name);

  if (!newEmail || !name) {
    return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
  }

  try {
    if (currentEmail != newEmail) {
      const existingUser = await prisma.user.findUnique({
        where: {
          email: newEmail,
        },
      });

      if (existingUser) {
        return NextResponse.json({ message: "Email Already Exists" });
      }
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        email: newEmail,
      },
    });

    return NextResponse.json(
      {
        message: "Updated User successfully",
        updatedUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
  }
};
