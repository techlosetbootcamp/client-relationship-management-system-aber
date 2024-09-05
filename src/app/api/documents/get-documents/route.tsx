import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// const prisma = new PrismaClient();
import prisma from "@/helpers/prisma";

export const GET = async (req: Request) => {
  try {
    const document = await prisma.document.findMany();

    console.log("document it is", document);

    if (!document) {
      return NextResponse.json({ message: "documents do not exist" });
    }

    return NextResponse.json({
      message: "document list Fetched Successfully",status : 200,
      document,
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error, message: "in get document error" });
  }
};
