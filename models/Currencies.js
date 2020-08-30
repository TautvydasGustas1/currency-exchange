const mongoose = require("mongoose");

const CurrenciesSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  lt_name: {
    type: String,
    required: true,
  },
  en_name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  mrnUnts: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Currencies = mongoose.model("currencies", CurrenciesSchema);
