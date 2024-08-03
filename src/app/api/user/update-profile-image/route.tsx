import { resetPasswordTemplate } from "@/constants/EmailTemplates";
import cloudinary from "@/helpers/cloudinary";
import { ImageUpload } from "@/helpers/ImageUpload";
import SendEmail from "@/helpers/SendEmail";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  const formdata = await req.formData();

  const email = formdata.get("email") as string;
  const image = formdata.get("image") as File;
  console.log("in change-photo api", email, image);

  try {
    const response: any = await ImageUpload(image);
    console.log("response in change password", response);

    const user = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        image: response?.secure_url,

        public_id: response?.public_id,
      },
    });

    return NextResponse.json({ response });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error, message: "in error" });
  }

  // try {
  //   const uploadResult = await cloudinary.uploader.upload(image, {
  //     public_id: "shoes",
  //   });

  //   console.log(uploadResult);
  // } catch (error) {}

  //   if (image) {
  //     return NextResponse.json({ message: "Image is not provided" });
  //   }

  //   try {
  //     console.log("in try");
  //     const userExist = await prisma.user.findFirst({
  //       where: {
  //         email: email,
  //       },
  //     });

  //     console.log("above user exist");

  //     if (!userExist) {
  //       return NextResponse.json({ message: "User Does not exist" });
  //     }

  //     return NextResponse.json({ message: "User exist" });
  //   } catch (error) {
  //     console.log("in change image", error);
  //     return NextResponse.json({ message: "User in catch" });
  //   }
};
