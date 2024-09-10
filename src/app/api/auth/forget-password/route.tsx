import { resetPasswordTemplate } from "@/constants/EmailTemplates";
import SendEmail from "@/helpers/SendEmail";
import { NextResponse } from "next/server";
import { clientURL } from "@/helpers/clientURL";

import prisma from "@/helpers/prisma";

export const POST = async (req: Request) => {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ message: "Input Field must not be empty " });
  }

  try {
    const userExist = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!userExist) {
      return NextResponse.json({
        message:
          "If the email address exists,a password reset link has been sent to this email address.",
        status: 200,
      });
    }

    const token = process.env.NEXTAUTH_SECRET + userExist.id;
    const resetUrl = `${clientURL}/reset-password/${userExist.id}/?${token}`;
    const emailTemplate = resetPasswordTemplate(resetUrl);
    SendEmail(emailTemplate, email);

    return NextResponse.json({
      message:
        "If the email address exists,a password reset link has been sent to this email address.",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
};
