import { resetPasswordTemplate } from "@/constants/EmailTemplates";
import SendEmail from "@/helpers/SendEmail";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  const { email } = await req.json();

  console.log("in forget-password api", email);

  if (!email) {
    return NextResponse.json({ message: "Input Field must not be empty " });
  }

  try {
    console.log("in try");
    const userExist = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    console.log("above user exist");

    if (!userExist) {
      return NextResponse.json({ message: "User Does not exist" });
    }
    console.log("above user exist");
    const token = process.env.NEXTAUTH_SECRET + userExist.id;
    const resetUrl = `http://localhost:3000/reset-password/${userExist.id}/?${token}`;
    const emailTemplate = resetPasswordTemplate(resetUrl);
    SendEmail(emailTemplate);

    return NextResponse.json({ message: "User exist" });
  } catch (error) {
    console.log("in forget password", error);
    return NextResponse.json({ message: "User in catch" });
  }
};
