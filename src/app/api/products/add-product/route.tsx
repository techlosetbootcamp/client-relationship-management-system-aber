import { ImageUpload } from "@/helpers/ImageUpload";
import { NextResponse } from "next/server";


import prisma from "@/helpers/prisma";

export const POST = async (req: Request) => {
  const formdata = await req.formData();

  const productName = formdata.get("productName") as string;
  const price = parseInt(formdata.get("price") as string, 10);
  const purchasedPrice = parseInt(formdata.get("purchasedPrice") as string, 10);
  const totalStock = parseInt(formdata.get("totalStock") as string, 10);
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
      return NextResponse.json({ message: "Product already exists" , status : 409});
    }
    const response: any = await ImageUpload(image);

    const newProduct = await prisma.product.create({
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

    return NextResponse.json({
      message: "Product has been added successfully",
      newProduct,
      status: 201
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error, status : 400});
  }
};
