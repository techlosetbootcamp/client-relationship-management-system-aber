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

  const id = formdata.get("id") as string;
  const productName = formdata.get("productName") as string;
  const price = formdata.get("price") as unknown as number;
  const purchasedPrice = formdata.get("purchasedPrice") as unknown as number;
  const totalStock = formdata.get("totalStock") as unknown as number;
  const category = formdata.get("category") as string;
  const image = formdata.get("image") as File;

  let updatedProduct;

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });

    if (!product) {
      return NextResponse.json({ message: "Product does not exists" });
    }

    if (image) {
      const response: any = await ImageUpload(image);
      console.log("response in change password", response);
      if (product && product.public_id) {
        await cloudinary.uploader.destroy(product.public_id);
      }
      updatedProduct = await prisma.product.update({
        where: {
          id: id,
        },
        data: {
          productName: productName,
          totalStock: totalStock,
          price: price,
          purchasedPrice: purchasedPrice,
          category: category,
          image: response?.secure_url,
          public_id: response?.public_id,
        },
      });
    } else {
      updatedProduct = await prisma.product.update({
        where: {
          id: id,
        },
        data: {
          productName: productName,
          totalStock: totalStock,
          price: price,
          category: category,
        },
      });
    }

    return NextResponse.json({
      message: "Product has been added successfully",
      updatedProduct,
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error, message: "in error" });
  }
};
