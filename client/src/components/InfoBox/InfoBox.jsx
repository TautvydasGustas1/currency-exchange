import React from "react";
import PropTypes from "prop-types";

const InfoBox = ({ fromName, toName, fromValue, toValue }) => (
  <div>
    {fromValue} <b>{fromName}</b> equals {toValue.toFixed(2)} <b>{toName}</b>
  </div>
);

InfoBox.propTypes = {
  fromName: PropTypes.string,
  toName: PropTypes.string,
  fromValue: PropTypes.number,
  toValue: PropTypes.number,
};

export default InfoBox;
