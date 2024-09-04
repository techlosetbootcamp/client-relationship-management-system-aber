import { resetPasswordTemplate } from "@/constants/EmailTemplates";
import cloudinary from "@/helpers/cloudinary";
import { ImageUpload } from "@/helpers/ImageUpload";
import SendEmail from "@/helpers/SendEmail";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (req: Request) => {

  try {
    const orderList = await prisma.order.findMany();

    if (!orderList) {
      return NextResponse.json({ message: "orders do not exist" });
    }
    

    return NextResponse.json({
      message: "orders list fetched successfully", status :200,
      orderList,
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error, message: "in get orders error" });
  }
};
