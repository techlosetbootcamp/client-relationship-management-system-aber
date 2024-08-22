import { resetPasswordTemplate } from "@/constants/EmailTemplates";
import cloudinary from "@/helpers/cloudinary";
import { ImageUpload } from "@/helpers/ImageUpload";
import SendEmail from "@/helpers/SendEmail";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  const { version, status, id } = await req.json();

  try {
    const document = await prisma.document.findUnique({
      where: {
        id: id,
      },
    });

    if (!document) {
      return NextResponse.json({ message: "Document does not exists" });
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
      message: "Document has been added successfully",
      updatedDocument,
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error, message: "in edit document error" });
  }
};
