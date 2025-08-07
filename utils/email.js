const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: '"School Management" <no-reply@school.com>', // update if needed
      to: options.email,
      subject: options.subject,
      text: options.message,
      // html: options.html, // Optional: if you want to send HTML email
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Email sending failed:", err);
    throw new Error("Failed to send email");
  }
};

module.exports = { sendEmail };
