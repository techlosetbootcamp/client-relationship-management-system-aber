import { NextResponse } from "next/server";

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
