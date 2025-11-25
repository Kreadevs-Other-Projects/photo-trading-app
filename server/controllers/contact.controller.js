const Contact = require("../models/Contact");

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

    return res.status(201).json({
      success: true,
      message: "Message sent successfully!",
      data: saved,
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
