import { resetPasswordTemplate } from "@/constants/EmailTemplates";
import cloudinary from "@/helpers/cloudinary";
import { ImageUpload } from "@/helpers/ImageUpload";
import SendEmail from "@/helpers/SendEmail";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// const prisma = new PrismaClient();
import prisma from "@/helpers/prisma";

export const POST = async (req: Request) => {
  const { startDate, endDate } = await req.json();
  console.log(
    "thos os supposed to be date",
    startDate,
    endDate,
    `${endDate}T23:59:59.999Z`
  );

  try {
    const orders = await prisma.order.findMany({
      where: {
        CreatedAt: {
          gte: new Date(startDate), // Start of date range
          lte: new Date(`${endDate}T23:59:59.999Z`),
        },
      },
    });

    const groupedOrders: any = [];
    let totalProfit: number = 0;
    let totalExpense: number = 0;
    let totalOrders : number =0;
    let totalRevenue : number =0

    orders.forEach((order) => {
      totalProfit += order.subTotal - order.totalPurchasedPrice;
      totalExpense += order.totalPurchasedPrice;
      totalOrders +=1;
      totalRevenue +=order.subTotal
      const date =
        order.CreatedAt &&
        new Date(order?.CreatedAt)?.toISOString().split("T")[0]; // Extract the date part (YYYY-MM-DD)

      const existingGroup = groupedOrders.find(
        (group: { date: string }) => group.date === date
      );

      if (existingGroup) {
        existingGroup.subTotal += order.subTotal; // Add to the existing subTotal
        existingGroup.totalPurchasedPrice += order.totalPurchasedPrice;
        existingGroup.orders.push(order); // Add the order to the existing array
        existingGroup.orderCount += 1;
      } else {
        groupedOrders.push({
          date,
          subTotal: order.subTotal,
          totalPurchasedPrice: order.totalPurchasedPrice, // Initialize with the first order's subTotal
          orders: [order], // Initialize with the first order
          orderCount: 1,
        });
      }
    });
    console.log(groupedOrders);

    // const order = await prisma.order.groupBy({
    //     by: ['CreatedAt'], // Group by the CreatedAt field
    //     _sum: {
    //       subTotal: true, // Sum the subTotal field
    //     },
    //     where: {
    //       CreatedAt: {
    //         gte: new Date(startDate), // Start of date range
    //         lte: new Date(`${endDate}T23:59:59.999Z`), // End of date range, inclusive
    //       },
    //     },
    //     // Optional: You can sort the results by date if needed
    //     orderBy: {
    //       CreatedAt: 'asc',
    //     },
    //   });

    if (!orders) {
      return NextResponse.json({ message: "order by given date do not exist" });
    }

    console.log("filhal checking from backend", groupedOrders);

    return NextResponse.json({
      message: "got order by date ranges",
      order: groupedOrders,
      totalProfit,
      totalExpense,
      totalOrders,
      totalRevenue
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({
      error,
      message: "in get order by date ranges error",
    });
  }
};

// CreatedAt
// 2024-08-03T13:17:21.358+00:00
// updatedAt
// 2024-08-03T13:17:21.358+00:00

// CreatedAt
// 2024-08-03T13:17:51.669+00:00
// updatedAt
// 2024-08-03T13:17:51.669+00:00
