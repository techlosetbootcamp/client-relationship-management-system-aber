import { NextResponse } from "next/server";

import prisma from "@/helpers/prisma";

export const dynamic = "force-dynamic";

export const GET = async (req: Request) => {
  try {
    const orderList = await prisma.order.findMany();

    if (!orderList) {
      return NextResponse.json({ message: "orders do not exist" });
    }

    return NextResponse.json({
      message: "orders list fetched successfully",
      status: 200,
      orderList,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error, message: "in get orders error" });
  }
};
