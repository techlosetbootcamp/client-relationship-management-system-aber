import { resetPasswordTemplate } from "@/constants/EmailTemplates";
import cloudinary from "@/helpers/cloudinary";
import { ImageUpload } from "@/helpers/ImageUpload";
import SendEmail from "@/helpers/SendEmail";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  const { id } = await req.json();

  try {
    const product = await prisma.product.delete({
      where: {
        id: id,
      },
    });


    if (product && product.public_id) {
      await cloudinary.uploader.destroy(product.public_id);
    }

    if (!product) {
      return NextResponse.json({ message: "Product do not exist" });
    }

    return NextResponse.json({
      message: "Product has been deleted from the list",
      product,
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error, message: "in delete product error" });
  }
};
