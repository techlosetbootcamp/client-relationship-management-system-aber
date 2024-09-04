import nodemailer from "nodemailer";
export const SendEmail = async (emailTemplate:string, email : string) => {

  const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
      user: "azhayat3@gmail.com",
      pass: "oefv vcdv ydkd mlqk",
    },
  });

  const info = await transporter.sendMail({
    from: "azhayat3@gmail.com", // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    // text: "Hello world?", // plain text body
    html: emailTemplate, // html body
  });

  console.log("Message sent: %s", info.messageId);
};

export default SendEmail;
