const mongoose = require("mongoose");

const LoggerSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Logger = mongoose.model("logger", LoggerSchema);
