const express = require("express");
const router = express.Router();

const { sendEmail } = require("../controllers/user.controller.js");

router.post("/sendEmail", sendEmail);

module.exports = router;
