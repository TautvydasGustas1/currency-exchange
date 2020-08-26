var http = require("http");
var xml2js = require("xml2js");

const getCurrenciesURL =
  "http://www.lb.lt/webservices/FxRates/FxRates.asmx/getCurrencyList";

const HttpGet = (url) => {
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

class DataAdder {
  async getParsedCurrencies() {
    const body = await HttpGet(getCurrenciesURL);
    return this.parseCurrenciesFromXML(body);
  }

  parseCurrenciesFromXML(xml) {
    //Parsing the xml to js
    const parser = new xml2js.Parser({ explicitArray: false });
    try {
      parser.parseStringPromise(xml).then((res) => {
        console.log(res.CcyTbl.CcyNtry);
        //Do something
      });
    } catch (error) {
      console.log("Error while parsing the data");
    }
  }
}

const dataAdder = new DataAdder();

dataAdder.getParsedCurrencies().then((res) => {
  console.log(res);
});
