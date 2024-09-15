import cloudinary from "@/helpers/cloudinary";
import { ImageUpload } from "@/helpers/ImageUpload";

import { NextResponse } from "next/server";

import prisma from "@/helpers/prisma";

export const POST = async (req: Request) => {
  const formdata = await req.formData();

  const userId = formdata.get("userId") as string;
  const image = formdata.get("image") as File;

  try {
    const response: any = await ImageUpload(image);

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user && user.public_id) {
      await cloudinary.uploader.destroy(user.public_id);
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        image: response?.secure_url,

        public_id: response?.public_id,
      },
    });

    return NextResponse.json({ response, message:"Profile Picture Updated Successfully", status:200 });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error, message: "in error" });
  }
};
