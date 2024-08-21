import { resetPasswordTemplate } from "@/constants/EmailTemplates";
import cloudinary from "@/helpers/cloudinary";
import { ImageUpload } from "@/helpers/ImageUpload";
import SendEmail from "@/helpers/SendEmail";
import { PrismaClient } from "@prisma/client";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { NextResponse } from "next/server";
import { app } from "@/helpers/firebaseConfig";
const prisma = new PrismaClient();

const storage = getStorage(app);

export const POST = async (req: Request) => {
  const formdata = await req.formData();
  let downloadURL = "";

  console.log("in change picture working", formdata);

  const version = formdata.get("version") as string;
  const status = formdata.get("status") as string;
  const userId = formdata.get("userId") as string;
  const userName = formdata.get("userName") as string;
  const image = formdata.get("image") as string;

  const file = formdata.get("file") as File;
  // const fileURL = formdata.get("fileURL") as string;
  const fileName = file?.name?.split(".")[0];
  const fileType = file?.name?.split(".")[1];
  console.log("in upload-file api", version, status, file, fileType, fileName);
  const fileRef = ref(storage, file.name);
  await uploadBytes(fileRef, file)
    .then(async (snapshot) => {
      console.log("Uploaded a blob or file!", snapshot);
      try {
        downloadURL = await getDownloadURL(fileRef);
        // setFileURL(downloadURL);
        console.log("File available at", downloadURL);
      } catch (error) {
        console.error("Error getting download URL:", error);
      }
    })
    .catch((error) => {
      console.error("Error uploading file:", error);
    });
  // title   String
  // type    String
  // version String
  // status  String
  // fileURL String

  console.log(
    "in upload-file api",
    version,
    status,
    file,
    fileType,
    fileName,
    downloadURL
  );

  try {
    // const response: any = await ImageUpload(file);
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
        authorImage : image,
        authorName : userName
        // author: {
        //   img: image,
        //   authorName: userName,
        // },
      },
    });
    console.log("response in add document", document);
    return NextResponse.json({ "file response": document });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ "file error response": error });
  }
};
