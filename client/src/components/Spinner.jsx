import React from "react";
import spinner from "../spinner.gif";

const imgStyles = {
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
  width: "50%",
};

const Spinner = () => (
  <img style={imgStyles} src={spinner} width="100%" alt={"Loading..."} />
);

export default Spinner;
