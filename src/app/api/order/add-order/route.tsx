import { NextResponse } from "next/server";

import prisma from "@/helpers/prisma";

export const POST = async (req: Request) => {
  const {
    userId,
    customerName,
    customerEmail,
    customerPhone,
    customerAddress,
    orders,
    subTotal,
    totalPurchasedPrice,
    totalQuantity,
    paidAmount,
  } = await req.json();

  if (
    !customerName ||
    !customerEmail ||
    !customerPhone ||
    !customerAddress ||
    !orders ||
    !paidAmount
  ) {
    return NextResponse.json({ message: "Invalid Data" });
  }

  try {
    await prisma.$connect();
    for (const item of orders) {
      const existingProduct = await prisma.product.findUnique({
        where: {
          id: item.product.id,
        },
      });

      if (existingProduct && +existingProduct?.totalStock <= 0) {
        return NextResponse.json({
          msg: `${existingProduct.productName}, ${existingProduct.category} is out of stock`,
        });
      } else if (
        existingProduct &&
        +existingProduct.totalStock < item.quantity
      ) {
        return NextResponse.json({
          msg: `We have limited stock. Please reduct your quantity for ${existingProduct.productName}, ${existingProduct.category}`,
        });
      }
    }

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
        subTotal: subTotal,
        totalPurchasedPrice: totalPurchasedPrice,
        totalQuantity,
      },
    });

    orders.map(async (item: any) => {
      const existingProduct = await prisma.product.findUnique({
        where: {
          id: item.product.id,
        },
      });

      if (existingProduct) {
        const updatedProduct = await prisma.product.update({
          where: {
            id: item.product.id,
          },
          data: {
            totalStock: existingProduct.totalStock - +item.quantity,
            soldQuantity: existingProduct.soldQuantity + +item.quantity,
          },
        });
      }
    });

    return NextResponse.json({
      message: "order has been added successfully",
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Invalid Data", status: 400 });
  }
};
