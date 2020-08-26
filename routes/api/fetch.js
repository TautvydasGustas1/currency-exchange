const express = require("express");
const router = express.Router();
var http = require("http");
var xml2js = require("xml2js");

// @route   GET api/fetch
// @desc    Get all currencies from LTBankas
// @acess   Public
router.get("/getCurrencies", async (req, res) => {
  try {
    //URL
    //https://www.lb.lt/webservices/FxRates/FxRates.asmx/getCurrencyList

    const parser = new xml2js.Parser();

    //Getting data from LB
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
  res.status(200);
});

module.exports = router;
