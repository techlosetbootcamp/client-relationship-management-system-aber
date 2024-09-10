import { NextResponse } from "next/server";

// const prisma = new PrismaClient();
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

export const POST = async (req: Request) => {
  const {
    firstDayOfCurrentWeek,
    lastDayOfCurrentWeek,
    firstDayOfPreviousWeek,
    lastDayOfPreviousWeek,
  } = await req.json();


  try {
    const currentWeekOrders = await prisma.order.findMany({
      where: {
        CreatedAt: {
          gte: new Date(firstDayOfCurrentWeek), 
          lte: new Date(`${lastDayOfCurrentWeek}`),
        },
      },
    });

    const previousWeekOrders = await prisma.order.findMany({
      where: {
        CreatedAt: {
          gte: new Date(firstDayOfPreviousWeek), // Start of date range
          lte: new Date(`${lastDayOfPreviousWeek}T23:59:59.999Z`),
        },
      },
    });

    if (!currentWeekOrders && !previousWeekOrders) {
      return NextResponse.json({
        message: "No sales were made during this or previous week",
      });
    }

    const currentWeekGroupedOrders: any = [];
    const previousWeekGroupedOrders: any = [];
    let totalSale : number = 0;

    currentWeekOrders?.forEach((order) => {
        totalSale +=order.subTotal;
      const date =
        order.CreatedAt &&
        new Date(order?.CreatedAt)?.toISOString().split("T")[0]; // Extract the date part (YYYY-MM-DD)

      const existingGroup = currentWeekGroupedOrders.find(
        (group: { date: string }) => group.date === date
      );

      if (existingGroup) {
        existingGroup.subTotal += order.subTotal; // Add to the existing subTotal
      } else {
        currentWeekGroupedOrders.push({
          date,
          subTotal: order.subTotal,
        });
      }
    });

    

    previousWeekOrders?.forEach((order) => {
        totalSale +=order.subTotal;
      const date =
        order.CreatedAt &&
        new Date(order?.CreatedAt)?.toISOString().split("T")[0]; // Extract the date part (YYYY-MM-DD)

      const existingGroup = previousWeekGroupedOrders.find(
        (group: { date: string }) => group.date === date
      );

      if (existingGroup) {
        existingGroup.subTotal += order.subTotal;
      } else {
        previousWeekGroupedOrders.push({
          date,
          subTotal: order.subTotal,
        });
      }
    });

    

    return NextResponse.json({
      message: "current and previous week sales data",
      currentWeek: currentWeekGroupedOrders,
      lastWeek: previousWeekGroupedOrders,
      totalSale
    });
  } catch (error) {
    console.log( error);
    return NextResponse.json({
      error,
      message: "in get weekly order sales",
    });
  }


};
