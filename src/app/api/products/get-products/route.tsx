import { resetPasswordTemplate } from "@/constants/EmailTemplates";
import cloudinary from "@/helpers/cloudinary";
import { ImageUpload } from "@/helpers/ImageUpload";
import SendEmail from "@/helpers/SendEmail";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// const prisma = new PrismaClient();
import prisma from "@/helpers/prisma";

export const GET = async (req: Request) => {

  try {
    const product = await prisma.product.findMany();

    if (!product) {
      return NextResponse.json({ message: "Products do not exist" });
    }
    

    return NextResponse.json({
      message: "Product list",
      product,
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error, message: "in get product error" });
  }
};
