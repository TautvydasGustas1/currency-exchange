var http = require("http");
var xml2js = require("xml2js");
const connectDB = require("../config/db");
const Currencies = require("../models/Currencies");
const Rates = require("../models/Rates");

const getCurrenciesURL =
  "http://www.lb.lt/webservices/FxRates/FxRates.asmx/getCurrencyList";

const getRatesURL =
  "http://www.lb.lt/webservices/FxRates/FxRates.asmx/getCurrentFxRates";

class DataAdder {
  //Method for getting http response body with promise
  HttpGet = (url) => {
    return new Promise((resolve, reject) => {
      http.get(url, (response) => {
        let xml = "";
        response.setEncoding("utf8");
        response.on("data", (chunk) => {
          xml += chunk;
        });

        response.on("end", () => {
          resolve(xml);
        });

        response.on("error", () => {
          console.error;
          reject;
        });
      });
    });
  };

  //Gets data and iniitalizes parsing
  async getParsedData(url) {
    const body = await this.HttpGet(url);
    return this.parseFromXML(body);
  }

  //Parses XMl data to js obj
  async parseFromXML(xml) {
    //Parsing the xml to js
    const parser = new xml2js.Parser({ explicitArray: false });
    try {
      const parsed = await parser.parseStringPromise(xml);
      return parsed;
    } catch (error) {
      console.log("Error while parsing the data");
    }
  }

  //Changes currencies object before adding to DB
  reformCurrenciesObj(parsedXML) {
    const listOfData = parsedXML.CcyTbl.CcyNtry;
    const array = [];

    listOfData.map((item) => {
      const obj = {};
      obj.code = item.Ccy;
      obj.lt_name = item.CcyNm[0]._;
      obj.en_name = item.CcyNm[1]._;
      obj.number = item.CcyNbr;
      obj.mrnUnts = item.CcyMnrUnts;
      array.push(obj);
    });
    return array;
  }

  //Add to database
  async addToDB(dataArray, model) {
    await model
      .insertMany(dataArray)
      .then((res) => {
        console.log("Sucessfully added data");
      })
      .catch((err) => {
        console.log("Error while adding collection to database");
        console.log(err);
      });
  }

  //Changes current rate object before adding to DB
  async reformRatesObject(parsedXML) {
    //A bit slow function because program is looking for every id of currency
    const listOfData = parsedXML.FxRates.FxRate;
    const array = [];
    let first = true;

    for (const item of listOfData) {
      //First for EUR add
      if (first) {
        const eurObj = {};
        eurObj.type = item.Tp;
        eurObj.date = item.Dt;
        eurObj.rate = item.CcyAmt[0].Amt;
        await Currencies.findOne({
          code: item.CcyAmt[0].Ccy,
        }).then((res) => {
          eurObj.currency = res._id;
        });
        first = false;
        array.push(eurObj);
      }

      const obj = {};
      obj.type = item.Tp;
      obj.date = item.Dt;
      obj.rate = item.CcyAmt[1].Amt;
      await Currencies.findOne({
        code: item.CcyAmt[1].Ccy,
      }).then((res) => {
        obj.currency = res._id;
      });

      array.push(obj);
    }
    return array;
  }

  async AddCurrenciesToDB() {
    const url = getCurrenciesURL;
    const parsedData = await this.getParsedData(url);
    const reformedData = await dataAdder.reformCurrenciesObj(parsedData);
    await dataAdder.addToDB(reformedData, Currencies);
  }

  async AddRatesToDB(tp = "LT") {
    const url = getRatesURL + "?tp=" + tp;
    const parsedData = await this.getParsedData(url);
    const reformedData = await dataAdder.reformRatesObject(parsedData);
    await dataAdder.addToDB(reformedData, Rates);
  }
}

const dataAdder = new DataAdder();

const LauncProgram = async () => {
  connectDB();
  console.log("Adding Currencies to DB");
  await dataAdder.AddCurrenciesToDB();
  console.log("Successfullty added currencies to DB");
  console.log("Now adding Rates...");
  await dataAdder.AddRatesToDB("LT");
  console.log("Successfullty added Rates to DB");
  console.log("Program finished");
};

LauncProgram();
