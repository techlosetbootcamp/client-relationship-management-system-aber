import cloudinary from "@/helpers/cloudinary";

import { NextResponse } from "next/server";

import prisma from "@/helpers/prisma";

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
      return NextResponse.json({
        message: "Product do not exist",
        status: 400,
      });
    }

    return NextResponse.json({
      message: "Product has been deleted from the list",
      product,
      status: 200,
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ message: error, status: 400 });
  }
};
