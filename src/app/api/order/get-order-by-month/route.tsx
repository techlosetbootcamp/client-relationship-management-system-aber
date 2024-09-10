import { NextResponse } from "next/server";

import prisma from "@/helpers/prisma";
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const GET = async (req: Request) => {
  const now = new Date();
  const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, 1);

  try {
    const orders = await prisma.order.findMany({
      where: {
        CreatedAt: {
          gte: threeMonthsAgo,
        },
      },
      orderBy: {
        CreatedAt: "desc",
      },
    });

    if (!orders) {
      return NextResponse.json({
        message: "No income was made during this period",
      });
    }

    const groupedOrdersByMonth: any = [];

    orders.forEach((order) => {
      if (order.CreatedAt) {
        const createdAt = new Date(order?.CreatedAt);
        const year = createdAt.getFullYear();
        const month = createdAt.getMonth();

        const key = monthNames[month];

        if (!groupedOrdersByMonth[key]) {
          groupedOrdersByMonth[key] = {
            month: key,
            totalIncome: 0,
          };
        }

        groupedOrdersByMonth[key].totalIncome += order.subTotal;
      }
    });

    const monthlyOrdersArray = Object.values(groupedOrdersByMonth);

    return NextResponse.json({
      message: "Check monthly  income",

      monthlyOrders: monthlyOrdersArray,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: error,
    });
  }
};
