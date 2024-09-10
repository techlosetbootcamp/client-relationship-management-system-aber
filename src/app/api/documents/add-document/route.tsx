import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { NextResponse } from "next/server";
import prisma from "@/helpers/prisma";
import { app } from "@/helpers/firebaseConfig";

const storage = getStorage(app);

export const POST = async (req: Request) => {
  const formdata = await req.formData();
  let downloadURL = "";

  const version = formdata.get("version") as string;
  const status = formdata.get("status") as string;
  const userId = formdata.get("userId") as string;
  const userName = formdata.get("userName") as string;
  const image = formdata.get("image") as string;

  const file = formdata.get("file") as File;
  const fileName = file?.name?.split(".")[0];
  const fileType = file?.name?.split(".")[1];

  if (!status || !version || !file) {
    return NextResponse.json({
      message: "Input Fields must not be empty",
      status: 400,
    });
  }

  const fileRef = ref(storage, file.name);
  await uploadBytes(fileRef, file)
    .then(async (snapshot) => {
      try {
        downloadURL = await getDownloadURL(fileRef);
      } catch (error) {
        console.error(error);
      }
    })
    .catch((error) => {
      console.error(error);
    });

  try {
    const document = await prisma.document.create({
      data: {
        fileName: fileName,
        status: status,
        fileURL: downloadURL,
        version: version,
        type: fileType,
        user: {
          connect: { id: userId },
        },
        authorImage: image,
        authorName: userName,
      },
    });

    return NextResponse.json({
      message: "document has been added successfully",
      status: 201,
    });
  } catch (error) {
    return NextResponse.json({ message: "Invalid Data", status: 400 });
  }
};
