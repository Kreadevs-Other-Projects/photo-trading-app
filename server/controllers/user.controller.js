const { transporter } = require("../services/mail.js");
const WaitListEmail = require("../models/waitList.js");

const sendEmail = async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address",
    });
  }

  try {
    const existing = await WaitListEmail.findOne({ email });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "You are already on the waitlist",
      });
    }

    await WaitListEmail.create({ email });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "New Waitlist Signup",
      html: `
        <div style="background: linear-gradient(135deg, hsl(214, 100%, 50%) 0%, hsl(280, 65%, 60%) 100%); padding: 40px 20px; font-family: 'Arial', sans-serif; color: #333;">
          <table style="width: 100%; max-width: 600px; margin: 0 auto; background: white; border-radius: 20px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); overflow: hidden;">
            <thead>
              <tr>
                <th style="background: linear-gradient(135deg, hsl(214, 100%, 50%) 0%, hsl(280, 65%, 60%) 100%); padding: 40px 20px; text-align: center; color: white;">
                  <h1 style="margin: 0; font-size: 36px; font-weight: bold; letter-spacing: -0.5px;">🎉 Welcome to Snap-Trade!</h1>
                  <p style="margin: 10px 0 0; font-size: 18px; opacity: 0.9;">You're officially on the list</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 40px 30px; text-align: center;">
                  <div style="font-size: 64px; margin-bottom: 20px;">✨</div>
                  <h2 style="color: hsl(214, 100%, 50%); margin: 0 0 20px; font-size: 28px;">Get Ready to Trade Moments!</h2>
                  <p style="font-size: 18px; line-height: 1.6; margin-bottom: 25px;">
                    <strong>Hello there!</strong><br/>
                    We're thrilled to have you join our exclusive waitlist. You've just taken the first step toward revolutionizing how you share photos with friends.
                  </p>
                  <div style="background: #f8f9ff; border-radius: 15px; padding: 25px; margin: 30px 0; border-left: 4px solid hsl(214, 100%, 50%);">
                    <h3 style="color: hsl(280, 65%, 60%); margin: 0 0 15px; font-size: 20px;">What's Coming Your Way:</h3>
                    <ul style="text-align: left; font-size: 16px; line-height: 1.8; margin: 0; padding-left: 20px;">
                      <li><strong>✨ Magic Photo Trading</strong> - Share one, get one back</li>
                      <li><strong>🎯 Smart Matching</strong> - Connect with friends automatically</li>
                      <li><strong>🚀 Lightning Fast</strong> - Trade photos in real-time</li>
                      <li><strong>🔒 Privacy First</strong> - Your moments, your control</li>
                    </ul>
                  </div>
                  <p style="font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                    We're working hard to bring you an amazing experience. You'll be among the first to know when we launch!
                  </p>
                  <div style="background: linear-gradient(135deg, hsl(214, 100%, 50%) 0%, hsl(280, 65%, 60%) 100%); color: white; padding: 20px; border-radius: 15px; margin: 25px 0;">
                    <h3 style="margin: 0 0 10px; font-size: 20px;">Your Early Access Status: <strong>Confirmed</strong></h3>
                    <p style="margin: 0; font-size: 16px; opacity: 0.9;">We'll notify you the moment we're live</p>
                  </div>
                  <div style="margin: 30px 0;">
                    <p style="font-size: 16px; margin-bottom: 15px;"><strong>Love what we're building?</strong> Help your friends join the waitlist:</p>
                    <a href="#" style="display: inline-block; background: linear-gradient(135deg, hsl(214, 100%, 50%) 0%, hsl(280, 65%, 60%) 100%); color: white; padding: 12px 30px; border-radius: 25px; text-decoration: none; font-weight: bold; font-size: 16px;">📣 Share the News</a>
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
                    Can't wait? Reply to this email with any questions!
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
        console.error("Error sending email:", error);
        return res.status(500).json({
          success: false,
          message: "Failed to send email",
          error: error.message,
        });
      } else {
        console.log(`Email sent successfully to ${email}: ${info.response}`);
        return res.status(200).json({
          success: true,
          message: "You've been added to the waitlist successfully!",
        });
      }
    });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = { sendEmail };
