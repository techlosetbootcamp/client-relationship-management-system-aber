import { resetPasswordTemplate } from "@/constants/EmailTemplates";
import SendEmail from "@/helpers/SendEmail";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { clientURL } from "@/helpers/clientURL";

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
      return NextResponse.json({
        message: "If the email address exists,a password reset link has been sent to this email address.",
        status: 200,
      });
    }
    console.log("above user exist");
    const token = process.env.NEXTAUTH_SECRET + userExist.id;
    const resetUrl = `${clientURL}/reset-password/${userExist.id}/?${token}`;
    const emailTemplate = resetPasswordTemplate(resetUrl);
    SendEmail(emailTemplate, email);

    return NextResponse.json({
      message: "If the email address exists,a password reset link has been sent to this email address.",
      status: 200,
    });
  } catch (error) {
    console.log("in forget password", error);
    return NextResponse.json({ message: "User in catch" });
  }
};
