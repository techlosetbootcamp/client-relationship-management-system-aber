import { NextResponse } from "next/server";

import prisma from "@/helpers/prisma";

export const POST = async (req: Request) => {
  const { startDate, endDate } = await req.json();

  try {
    const orders = await prisma.order.findMany({
      where: {
        CreatedAt: {
          gte: new Date(startDate),
          lte: new Date(`${endDate}T23:59:59.999Z`),
        },
      },
    });

    const groupedOrders: any = [];
    let totalProfit: number = 0;
    let totalExpense: number = 0;
    let totalOrders: number = 0;
    let totalRevenue: number = 0;

    orders.forEach((order) => {
      totalProfit += order.subTotal - order.totalPurchasedPrice;
      totalExpense += order.totalPurchasedPrice;
      totalOrders += 1;
      totalRevenue += order.subTotal;
      const date =
        order.CreatedAt &&
        new Date(order?.CreatedAt)?.toISOString().split("T")[0];

      const existingGroup = groupedOrders.find(
        (group: { date: string }) => group.date === date
      );

      if (existingGroup) {
        existingGroup.subTotal += order.subTotal;
        existingGroup.totalPurchasedPrice += order.totalPurchasedPrice;
        existingGroup.orders.push(order);
        existingGroup.orderCount += 1;
      } else {
        groupedOrders.push({
          date,
          subTotal: order.subTotal,
          totalPurchasedPrice: order.totalPurchasedPrice,
          orders: [order],
          orderCount: 1,
        });
      }
    });

    if (!orders) {
      return NextResponse.json({
        message: "order by given date do not exist",
        status: 404,
      });
    }

    return NextResponse.json({
      message: "got order by date ranges",
      status: 200,
      order: groupedOrders,
      totalProfit,
      totalExpense,
      totalOrders,
      totalRevenue,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error,
      message: "in get order by date ranges error",
      status: 400,
    });
  }
};
