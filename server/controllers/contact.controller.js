const Contact = require("../models/Contact");
const { transporter } = require("../services/mail.js");

const sendContact = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Name, email and message are required",
    });
  }

  try {
    const saved = await Contact.create({ name, email, message });

    if (!saved || !saved._id) {
      return res.status(500).json({
        success: false,
        message: "Failed to save message",
      });
    }

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "We’ve received your message – Snap-Trade",
      html: `
        <div style="background: linear-gradient(135deg, hsl(214, 100%, 50%) 0%, hsl(280, 65%, 60%) 100%); padding: 40px 20px; font-family: 'Arial', sans-serif; color: #333;">
          <table style="width: 100%; max-width: 600px; margin: 0 auto; background: white; border-radius: 20px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); overflow: hidden;">
            <thead>
              <tr>
                <th style="background: linear-gradient(135deg, hsl(214, 100%, 50%) 0%, hsl(280, 65%, 60%) 100%); padding: 40px 20px; text-align: center; color: white;">
                  <h1 style="margin: 0; font-size: 32px; font-weight: bold; letter-spacing: -0.5px;">📩 Thanks for reaching out!</h1>
                  <p style="margin: 10px 0 0; font-size: 18px; opacity: 0.9;">We’ve received your message, ${name}</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 40px 30px; text-align: center;">
                  <div style="font-size: 64px; margin-bottom: 20px;">✨</div>
                  <h2 style="color: hsl(214, 100%, 50%); margin: 0 0 20px; font-size: 26px;">We’ll get back to you shortly</h2>
                  <p style="font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                    <strong>Hey ${name},</strong><br/>
                    Thanks for contacting Snap-Trade. Your message is now in our inbox and our team will review it as soon as possible.
                  </p>
                  <div style="background: #f8f9ff; border-radius: 15px; padding: 25px; margin: 30px 0; border-left: 4px solid hsl(214, 100%, 50%); text-align: left;">
                    <h3 style="color: hsl(280, 65%, 60%); margin: 0 0 15px; font-size: 18px;">Here’s what you sent us:</h3>
                    <p style="font-size: 15px; line-height: 1.6; white-space: pre-line; margin: 0;">
                      ${message}
                    </p>
                  </div>
                  <p style="font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                    If we need more details, we’ll reach out to you at <strong>${email}</strong>.<br/>
                    In the meantime, sit back and relax — we’ve got this. 😌
                  </p>
                  <div style="background: linear-gradient(135deg, hsl(214, 100%, 50%) 0%, hsl(280, 65%, 60%) 100%); color: white; padding: 20px; border-radius: 15px; margin: 25px 0;">
                    <h3 style="margin: 0 0 10px; font-size: 18px;">Status: <strong>Message Received</strong></h3>
                    <p style="margin: 0; font-size: 15px; opacity: 0.9;">We’ll respond as soon as possible.</p>
                  </div>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td style="background: linear-gradient(135deg, hsl(214, 100%, 50%) 0%, hsl(280, 65%, 60%) 100%); padding: 30px; text-align: center; color: white;">
                  <p style="margin: 0 0 15px; font-size: 16px; opacity: 0.9;">Stay connected with us:</p>
                  <div style="margin-bottom: 20px;">
                    <a href="#" style="color: white; margin: 0 10px; text-decoration: none; font-size: 14px;">Twitter</a>
                    <a href="#" style="color: white; margin: 0 10px; text-decoration: none; font-size: 14px;">Instagram</a>
                    <a href="#" style="color: white; margin: 0 10px; text-decoration: none; font-size: 14px;">LinkedIn</a>
                  </div>
                  <p style="margin: 0; font-size: 14px; opacity: 0.8;">
                    &copy; ${new Date().getFullYear()} Snap-Trade. All rights reserved.<br/>
                    If this wasn’t you, you can ignore this email.
                  </p>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending contact email:", error);
        return res.status(201).json({
          success: true,
          message:
            "Message saved, but we were unable to send confirmation email.",
          data: saved,
        });
      } else {
        console.log(
          `Contact email sent successfully to ${email}: ${info.response}`
        );
        return res.status(201).json({
          success: true,
          message: "Message sent successfully!",
          data: saved,
        });
      }
    });
  } catch (error) {
    console.error("Contact Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = { sendContact };
