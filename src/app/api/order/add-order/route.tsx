import { PrismaClient } from "@prisma/client";
import next from "next";
import { NextResponse } from "next/server";

// const prisma = new PrismaClient();
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
    orders,
    subTotal,
    totalPurchasedPrice,
    totalQuantity,
    paidAmount,
    typeof paidAmount
  );

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
      console.log("item.product", item.product);
      const existingProduct = await prisma.product.findUnique({
        where: {
          id: item.product.id,
        },
      });

      console.log("before if else", item.quantity);

      if (existingProduct && +existingProduct?.totalStock <= 0) {
        console.log("in if section");
        return NextResponse.json({
          msg: `${existingProduct.productName}, ${existingProduct.category} is out of stock`,
        });
      } else if (
        existingProduct &&
        +existingProduct.totalStock < item.quantity
      ) {
        console.log("in else section");
        return NextResponse.json({
          msg: `We have limited stock. Please reduct your quantity for ${existingProduct.productName}, ${existingProduct.category}`,
        });
      }
    }

    console.log("mapped over order to check for stock");

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
        totalPurchasedPrice : totalPurchasedPrice,
        totalQuantity,
      },
    });

    console.log("Created Order");
    orders.map(async (item: any) => {
      console.log(
        "item.product",
        item.product,
        item.quantity,
        typeof item.quantity
      );
      const existingProduct = await prisma.product.findUnique({
        where: {
          id: item.product.id,
        },
      });

      console.log(
        "in existing product",
        existingProduct?.totalStock,
        typeof existingProduct?.totalStock,
        existingProduct?.soldQuantity,
        typeof existingProduct?.soldQuantity
      );

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

        console.log("updated product", updatedProduct);
      }
    });

    console.log("deduct value from stock after creating the order");

    return NextResponse.json({ newOrder }, { status: 201 });
  } catch (error) {
    console.log("in add order", error);
    return NextResponse.json({ message: error });
  }
};
