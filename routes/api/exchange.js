const Rates = require("../../models/Rates");
const Currencies = require("../../models/Currencies");
const express = require("express");
const router = express.Router();
const logger = require("../../middleware/Logger.js");

// @route   GET api/convert
// @desc    Find rate
// @acess   Public
router.get("/rate", logger, async (req, res) => {
  try {
    const { from, to } = req.query;
    const fromCurrency = await Currencies.findOne({ code: from });
    const toCurrency = await Currencies.findOne({ code: to });
    const fromRate = await Rates.findOne({ currency: fromCurrency._id });
    const toRate = await Rates.findOne({ currency: toCurrency._id });

    //Find exchange rate
    const exchangeRate = toRate.rate / fromRate.rate;

    //Return the answer
    res.json(exchangeRate);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
  res.status(200);
});

// @route   GET api/exchange/getCurrencies
// @desc    Get all currencie's code
// @acess   Public
router.get("/currencies", logger, async (req, res) => {
  try {
    const currencies = await Rates.find({})
      .select("-_id -__v")
      .populate("currency");

    res.json(currencies);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
