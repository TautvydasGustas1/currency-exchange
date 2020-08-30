const mongoose = require("mongoose");
const Currencies = require("./Currencies");

const RatesSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  currency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Currencies.modelName,
  },
  date_added: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Rates = mongoose.model("rates", RatesSchema);
