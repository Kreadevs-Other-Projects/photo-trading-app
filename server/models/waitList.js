const mongoose = require("mongoose");

const waitListSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const WaitListEmail = mongoose.model("WaitListEmail", waitListSchema);

module.exports = WaitListEmail;
