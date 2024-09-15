
import { deleteObject, getStorage, ref } from "firebase/storage";
import { NextResponse } from "next/server";
import { app } from "@/helpers/firebaseConfig";
import DocumentDownload from "@/helpers/documentDownload";

import prisma from "@/helpers/prisma";

export const POST = async (req: Request) => {
  const { checkedItemsIds } = await req.json();
  const storage = getStorage(app);

  try {
    const documents = await prisma.document.findMany({
      where: {
        id: {
          in: checkedItemsIds,
        },
      },
    });

    if (!documents) {
      return NextResponse.json({
        message: "document do not exist",
        status: 404,
      });
    }

    return NextResponse.json({
      message: "document has been downloaded from the list",
      documents,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error, status: 400 });
  }
};
