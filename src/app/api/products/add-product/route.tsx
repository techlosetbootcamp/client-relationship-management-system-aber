import { resetPasswordTemplate } from "@/constants/EmailTemplates";
import cloudinary from "@/helpers/cloudinary";
import { ImageUpload } from "@/helpers/ImageUpload";
import SendEmail from "@/helpers/SendEmail";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  const formdata = await req.formData();

  console.log("in add product api", formdata);

  const productName = formdata.get("productName") as string;
  const price = formdata.get("price") as string;
  const quantity = formdata.get("quantity") as string;
  const category = formdata.get("category") as string;
  const image = formdata.get("image") as File;

  try {
    const product = await prisma.product.findFirst({
      where: {
        productName: productName,
        category: category,
      },
    });

    if (product) {
      return NextResponse.json({ message: "Product already exists" });
    }
    const response: any = await ImageUpload(image);
    console.log("response in change password", response);

    const newProduct = await prisma.product.create({
      data: {
        productName: productName,
        quantity: quantity,
        price: price,
        category: category,
        image: response?.secure_url,
        public_id: response?.public_id,
      },
    });

    return NextResponse.json({
      message: "Product has been added successfully",
      newProduct,
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error, message: "in error" });
  }
};
