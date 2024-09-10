import { NextResponse } from "next/server";

import prisma from "@/helpers/prisma";

export const POST = async (req: Request) => {
  const { state } = await req.json();

  try {
    const orders = await prisma.order.aggregate({
      _count: {
        _all: true,
      },
      where: {
        customerAddress: state,
      },
    });

    if (!orders) {
      return NextResponse.json({ message: "orders do not exist" });
    }

    return NextResponse.json({
      message: "orders count fetched successfully",
      status: 200,
      orderCount: orders._count._all,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error, message: "in get state orders error" });
  }
};
