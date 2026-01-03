import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/", async (req, res) => {

  console.log("📩 CONTACT ROUTE HIT");

  const { name, email, message } = req.body;

  try {

    console.log("USER =", process.env.MAIL_USER);
    console.log("PASS =", process.env.MAIL_PASS ? "Loaded" : "Missing");

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    // verify SMTP connection
    await transporter.verify();
    console.log("📨 SMTP Connected");

    await transporter.sendMail({
      from: `"Blog Contact" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      replyTo: email,
      subject: `New message from ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    console.log("✅ Email sent!");

    res.json({ success: true });

  } catch (err) {
    console.error("MAIL ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

export default router;
