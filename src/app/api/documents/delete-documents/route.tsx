import { resetPasswordTemplate } from "@/constants/EmailTemplates";
import cloudinary from "@/helpers/cloudinary";
import { ImageUpload } from "@/helpers/ImageUpload";
import SendEmail from "@/helpers/SendEmail";
import { PrismaClient } from "@prisma/client";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { NextResponse } from "next/server";
import { app } from "@/helpers/firebaseConfig";

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  const { checkedItemsIds } = await req.json();
  console.log("in delete api", checkedItemsIds);
  const storage = getStorage(app);

  try {
    const documents = await prisma.document.findMany({
      where: {
        id: {
          in: checkedItemsIds,
        },
      },
    });

    if (documents.length > 0) {
      const deletedDocuments = await prisma.document.deleteMany({
        where: {
          id: {
            in: checkedItemsIds,
          },
        },
      });

      if (deletedDocuments.count > 0) {
        documents?.map((document) => {
          if (document && document.type && document.fileName) {
            const fileRef = document.fileName + "." + document.type;

            // Create a reference to the file to delete
            const delRef = ref(storage, fileRef);

            // Delete the file
            deleteObject(delRef)
              .then(() => {
                console.log("file Deleted SUccessfully");
              })
              .catch((error) => {
                console.log("file not Deleted SUccessfully", error);
              });
          }
        });
      }
    }

    if (!documents) {
      return NextResponse.json({ message: "document do not exist" });
    }

    return NextResponse.json({
      message: "document has been deleted from the list",
      documents,
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error, message: "in delete product error" });
  }
};
