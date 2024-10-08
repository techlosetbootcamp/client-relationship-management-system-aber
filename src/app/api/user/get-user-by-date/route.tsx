import prisma from "@/helpers/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { startDate, endDate } = await req.json();

  try {
    const users = await prisma.user.findMany({
      where: {
        CreatedAt: {
          gte: new Date(startDate),
          lte: new Date(`${endDate}T23:59:59.999Z`),
        },
        Order: {
          some: {},
        },
      },
      include: {
        Order: true,
      },
    });

    if (!users) {
      return NextResponse.json({
        message: "No customers were added during this period",
      });
    }

    const groupedCustomers: any = [];
    let totalCustomers: number = 0;

    users.forEach((user) => {
      totalCustomers += 1;

      const date =
        user.CreatedAt &&
        new Date(user?.CreatedAt)?.toISOString().split("T")[0];

      const existingGroup = groupedCustomers.find(
        (group: { date: string }) => group.date === date
      );

      if (existingGroup) {
        existingGroup.customerCount += 1;
      } else {
        groupedCustomers.push({
          date,
          customerCount: 1,
        });
      }
    });

    return NextResponse.json({
      message: "check for user length",
      customers: groupedCustomers,
      totalCustomers,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }
};
