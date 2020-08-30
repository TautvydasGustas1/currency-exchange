import React from "react";
import PropTypes from "prop-types";
import styles from "./InputSelect.module.css";

const InputSelect = ({ label, name, value, currencies, handleChange }) => {
  return (
    <div>
      <div>{label}</div>
      <select
        onChange={handleChange}
        value={value}
        className={styles.input}
        name={name}
      >
        {currencies.map((item) => (
          <option key={item.currency.code} value={item.currency.code}>
            {item.currency.code}
          </option>
        ))}
      </select>
    </div>
  );
};

InputSelect.propTypes = {
  label: PropTypes.string,
  currencies: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export default InputSelect;
