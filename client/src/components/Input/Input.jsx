import React from "react";
import styles from "./Input.module.css";
import PropTypes from "prop-types";

const Input = ({ type, name, label, value, handleChange }) => {
  return (
    <>
      <div>{label}</div>
      <input
        min={0}
        type={type}
        value={value}
        onChange={handleChange}
        name={name}
        className={styles.input}
      />
    </>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Input;
