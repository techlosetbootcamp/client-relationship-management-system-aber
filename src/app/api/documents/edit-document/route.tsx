import { NextResponse } from "next/server";

import prisma from "@/helpers/prisma";

export const POST = async (req: Request) => {
  const { version, status, id } = await req.json();

  if (!version || !status || !id) {
    return NextResponse.json({
      message: "Input fields must not be empty",
      status: 422,
    });
  }

  try {
    const document = await prisma.document.findUnique({
      where: {
        id: id,
      },
    });

    if (!document) {
      return NextResponse.json({
        message: "Document does not exists",
        status: 404,
      });
    }

    const updatedDocument = await prisma.document.update({
      where: {
        id: id,
      },
      data: {
        version: version,
        status: status,
      },
    });

    return NextResponse.json({
      message: "Document has been updated successfully",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
};
