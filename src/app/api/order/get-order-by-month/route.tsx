import { NextResponse } from "next/server";

// const prisma = new PrismaClient();
import prisma from "@/helpers/prisma";
const monthNames = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

export const GET = async (req: Request) => {
  const now = new Date();
  const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, 1);
  console.log("three months ago", threeMonthsAgo);

  try {
    const orders = await prisma.order.findMany({
      where: {
        CreatedAt: {
          gte: threeMonthsAgo, // Greater than or equal to 3 months ago
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
        const month = createdAt.getMonth(); // JavaScript months are 0-indexed

        const key = monthNames[month]; // Format as "2024-08" for example
        // const key = `July`;

        if (!groupedOrdersByMonth[key]) {
          groupedOrdersByMonth[key] = {
            month : key,
            totalIncome: 0,
          };
        }

        groupedOrdersByMonth[key].totalIncome += order.subTotal; // Sum the order amount
      }
    });

    console.log(groupedOrdersByMonth);
    const monthlyOrdersArray = Object.values(groupedOrdersByMonth);
    console.log(monthlyOrdersArray)
 
      return NextResponse.json({
        message: "Check monthly  income",

        monthlyOrders:monthlyOrdersArray,
      });
    
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: error,
    });
  }
};
