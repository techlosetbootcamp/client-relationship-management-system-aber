import { resetPasswordTemplate } from "@/constants/EmailTemplates";
import cloudinary from "@/helpers/cloudinary";
import { ImageUpload } from "@/helpers/ImageUpload";
import SendEmail from "@/helpers/SendEmail";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// const prisma = new PrismaClient();
import prisma from "@/helpers/prisma";

export const POST = async (req: Request) => {
  const { orderId } = await req.json();
  console.log("thos os supposed to be id", orderId)

  try {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!order) {
      return NextResponse.json({ message: "order do not exist" });
    }

    console.log("filhal checking from backend", order)

    return NextResponse.json({
      message: "got order by id",
      order,
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error, message: "in get order by id error" });
  }
};
