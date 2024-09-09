import { resetPasswordTemplate } from "@/constants/EmailTemplates";
import cloudinary from "@/helpers/cloudinary";
import { ImageUpload } from "@/helpers/ImageUpload";
import SendEmail from "@/helpers/SendEmail";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// const prisma = new PrismaClient();
import prisma from "@/helpers/prisma";

export const POST = async (req: Request) => {
    const {state} =await req.json();

    console.log("state", state);

  try {
    const orders = await prisma.order.aggregate({
        _count: {
            _all: true,
          },
        where : {
            customerAddress : state,
        },

    });
    console.log("order count in state", orders._count._all, orders)

    if (!orders) {
      return NextResponse.json({ message: "orders do not exist" });
    }
    

    return NextResponse.json({
      message: "orders count fetched successfully", status :200,
      orderCount :orders._count._all ,
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error, message: "in get state orders error" });
  }
};
