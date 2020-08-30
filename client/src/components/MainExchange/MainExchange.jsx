import React from "react";
import styles from "./MainExchange.module.css";
import Input from "../Input/Input";
import InputSelect from "../InputSelect.jsx/InputSelect";
import { useEffect } from "react";
import Axios from "axios";
import { useState } from "react";
import Spinner from "../Spinner";
import InfoBox from "../InfoBox/InfoBox";

const MainExchange = (props) => {
  const [currencies, setCurrencies] = useState([]);
  const [currencyFrom, setCurrencyFrom] = useState();
  const [currencyTo, setCurrencyTo] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [exchangeRate, setExchangeRate] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurencies();
  }, []);

  let fromAmount, toAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = Math.round(amount * exchangeRate * 100 + Number.EPSILON) / 100;
  } else {
    toAmount = amount;
    fromAmount =
      Math.round((amount / exchangeRate) * 100 + Number.EPSILON) / 100;
  }

  useEffect(() => {
    if (currencyFrom && currencyTo) {
      Axios.get(`/api/exchange/rate?from=${currencyFrom}&to=${currencyTo}`)
        .then((res) => {
          setExchangeRate(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currencyFrom, currencyTo]);

  function handleChangeFromAmount(e) {
    //Call for exchange rate
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleChangeToAmount(e) {
    //Call for exchange rate
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  function getCurencies() {
    Axios.get("/api/exchange/currencies")
      .then((res) => {
        setCurrencies(res.data);
        setCurrencyFrom(res.data[0].currency.code);
        setCurrencyTo(res.data[1].currency.code);
        setExchangeRate(res.data[1].rate);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainInner}>
        {loading ? (
          <Spinner />
        ) : (
          <div>
            <div className={styles.flexGrid}>
              <div className={styles.col}>
                <InfoBox
                  toValue={exchangeRate}
                  toName={currencyTo}
                  fromValue={1}
                  fromName={currencyFrom}
                />
              </div>
            </div>
            <div className={styles.flexGrid}>
              <div className={styles.col}>
                <Input
                  type="number"
                  value={fromAmount}
                  name="currency_value_from"
                  label="From Currency"
                  handleChange={handleChangeFromAmount}
                />
              </div>
              <div className={styles.col}>
                <InputSelect
                  handleChange={(e) => setCurrencyFrom(e.target.value)}
                  currencies={currencies}
                  name="currency_from"
                  label="Currency"
                  value={currencyFrom}
                />
              </div>
            </div>
            <div className={styles.flexGrid}>
              <div className={styles.col}>
                <Input
                  type="number"
                  value={toAmount}
                  name="currency_value_to"
                  label="To Currency"
                  handleChange={handleChangeToAmount}
                />
              </div>
              <div className={styles.col}>
                <InputSelect
                  handleChange={(e) => setCurrencyTo(e.target.value)}
                  currencies={currencies}
                  name="currency_to"
                  label="Currency"
                  value={currencyTo}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainExchange;
