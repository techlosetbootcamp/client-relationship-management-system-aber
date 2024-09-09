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

  console.log("inside oversales",  firstDayOfCurrentWeek,
    lastDayOfCurrentWeek,
    firstDayOfPreviousWeek,
    lastDayOfPreviousWeek,)

  try {
    const currentWeekOrders = await prisma.order.findMany({
      where: {
        CreatedAt: {
          gte: new Date(firstDayOfCurrentWeek), // Start of date range
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
        existingGroup.subTotal += order.subTotal; // Add to the existing subTotal
      } else {
        previousWeekGroupedOrders.push({
          date,
          subTotal: order.subTotal,
        });
      }
    });

    console.log(currentWeekGroupedOrders, previousWeekGroupedOrders);

    return NextResponse.json({
      message: "current and previous week sales data",
      currentWeek: currentWeekGroupedOrders,
      lastWeek: previousWeekGroupedOrders,
      totalSale
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({
      error,
      message: "in get weekly order sales",
    });
  }

  //   try {
  //     const orders = await prisma.order.findMany({
  //       where: {
  //         CreatedAt: {
  //           gte: threeMonthsAgo, // Greater than or equal to 3 months ago
  //         },
  //       },
  //       orderBy: {
  //         CreatedAt: "desc",
  //       },
  //     });

  //     if (!orders) {
  //       return NextResponse.json({
  //         message: "No income was made during this period",
  //       });
  //     }

  //     const groupedOrdersByMonth: any = [];

  //     orders.forEach((order) => {
  //       if (order.CreatedAt) {
  //         const createdAt = new Date(order?.CreatedAt);
  //         const year = createdAt.getFullYear();
  //         const month = createdAt.getMonth(); // JavaScript months are 0-indexed

  //         const key = monthNames[month]; // Format as "2024-08" for example
  //         // const key = `July`;

  //         if (!groupedOrdersByMonth[key]) {
  //           groupedOrdersByMonth[key] = {
  //             month : key,
  //             totalIncome: 0,
  //           };
  //         }

  //         groupedOrdersByMonth[key].totalIncome += order.subTotal; // Sum the order amount
  //       }
  //     });

  //     console.log(groupedOrdersByMonth);
  //     const monthlyOrdersArray = Object.values(groupedOrdersByMonth);
  //     console.log(monthlyOrdersArray)

  //       return NextResponse.json({
  //         message: "Check monthly  income",

  //         monthlyOrders:monthlyOrdersArray,
  //       });

  //   } catch (error) {
  //     console.log(error);
  //     return NextResponse.json({
  //       message: error,
  //     });
  //   }
};
