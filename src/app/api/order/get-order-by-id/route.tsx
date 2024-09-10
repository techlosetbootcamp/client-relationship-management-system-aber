import { NextResponse } from "next/server";

import prisma from "@/helpers/prisma";

export const POST = async (req: Request) => {
  const { orderId } = await req.json();

  try {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!order) {
      return NextResponse.json({ message: "order do not exist" });
    }

    return NextResponse.json({
      message: "got order by id",
      order,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error, message: "in get order by id error" });
  }
};
