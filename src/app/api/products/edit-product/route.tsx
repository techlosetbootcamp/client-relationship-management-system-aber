import cloudinary from "@/helpers/cloudinary";
import { ImageUpload } from "@/helpers/ImageUpload";

import { NextResponse } from "next/server";

import prisma from "@/helpers/prisma";

export const POST = async (req: Request) => {
  const formdata = await req.formData();

  const id = formdata.get("id") as string;
  const productName = formdata.get("productName") as string;
  const price = parseInt(formdata.get("price") as string, 10);
  const purchasedPrice = parseInt(formdata.get("purchasedPrice") as string, 10);
  const totalStock = parseInt(formdata.get("totalStock") as string, 10);
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
          purchasedPrice: purchasedPrice,
          price: price,
          category: category,
        },
      });
    }

    return NextResponse.json({
      message: "Product has been updated successfully",
      updatedProduct,
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error, message: "in error" });
  }
};
