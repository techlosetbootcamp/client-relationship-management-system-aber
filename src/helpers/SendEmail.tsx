import nodemailer from "nodemailer";
export const SendEmail = async (emailTemplate: string, email: string) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.GOOGLE_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Hello ✔",

    html: emailTemplate,
  });

};

export default SendEmail;
