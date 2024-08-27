import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  const {
    userId,
    customerName,
    customerEmail,
    customerPhone,
    customerAddress,
    orders,
    subTotal,
    totalQuantity,
  } = await req.json();
  console.log(req);

  // userId,
  //     customerEmail: userEmail,
  //     customerName: userName,
  //     customerPhone: "23456",
  //     customerAddress: "abc",
  //     orders: cartData,

  console.log(
    "in add order api",
    customerName,
    customerEmail,
    customerPhone,
    customerAddress,
    orders
  );

  if (
    !customerName ||
    !customerEmail ||
    !customerPhone ||
    !customerAddress ||
    !orders
  ) {
    return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
  }

  try {
    await prisma.$connect();

    const newOrder = await prisma.order.create({
      data: {
        user: {
          connect: { id: userId },
        },
        customerName,
        customerEmail,
        customerPhone,
        customerAddress,
        orders,
        subTotal: `$${subTotal}`,
        totalQuantity,
      },
    });

    return NextResponse.json({ newOrder }, { status: 201 });
  } catch (error) {
    console.log("in add order", error);
    return NextResponse.json({ message: error });
  }
};
