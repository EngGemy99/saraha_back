import nodemailer from "nodemailer";
import { emailTemplate } from "./ConfirmEmailTemplate.js";
import jwt from "jsonwebtoken";

const sendEmail = async ({ email }) => {
  const transporter = await nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ahmedjamaljjjj1999@gmail.com",
      pass: "hdycbjzdazurjvst",
    },
  });
  let token = jwt.sign({ email }, process.env.EmailKey);
  let info = await transporter.sendMail({
    from: "ahmedjamaljjjj1999@gmail.com",
    to: email,
    subject: "Test email from Node.js",
    html: emailTemplate(token),
  });
};

export { sendEmail };
