import { resetPasswordTemplate } from "@/constants/EmailTemplates";
import cloudinary from "@/helpers/cloudinary";
import { ImageUpload } from "@/helpers/ImageUpload";
import SendEmail from "@/helpers/SendEmail";
import { PrismaClient } from "@prisma/client";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { NextResponse } from "next/server";
import { app } from "@/helpers/firebaseConfig";
import DocumentDownload from "@/helpers/documentDownload";

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  const { checkedItemsIds } = await req.json();
  console.log("in download api", checkedItemsIds);
  const storage = getStorage(app);

  try {
    const documents = await prisma.document.findMany({
      where: {
        id: {
          in: checkedItemsIds,
        },
      },
    });

    // if (documents.length > 0) {
    //   documents?.map(async (document) => {
    //     console.log("documetn in downlaod api", document);
    //     if (
    //       document &&
    //       document.type &&
    //       document.fileName &&
    //       document.fileURL
    //     ) {
    //       const filePath = document.fileName + "." + document.type;

    //       const response = await DocumentDownload(document.fileURL, filePath);

    //       console.log("response dwonsload", response);
    //     }
    //   });
    // }

    if (!documents) {
      return NextResponse.json({ message: "document do not exist" });
    }

    return NextResponse.json({
      message: "document has been downloaded from the list",
      documents,
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error, message: "in download document error" });
  }
};
