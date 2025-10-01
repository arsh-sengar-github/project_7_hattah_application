import nodemailer from "nodemailer";

export const Mail = async (receiver, subject, body) => {
  const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_EMAL_ADDRESS,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });
  const options = {
    from: `"Arsh Sengar" <${process.env.NODEMAILER_EMAL_ADDRESS}>`,
    to: receiver,
    subject: subject,
    html: body,
  };
  try {
    await transporter.sendMail(options);
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
