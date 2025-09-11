import React from "react";
import Img from "../../assets/img/c18.png";

const LogoDown = props => {
  return <img alt="Logo" style={{
    width: "60%",
    marginLeft: "20%",
    height: "60%"
  }}
  /* src="/static/logo.svg" */
  src={Img} {...props} />;
};

export default LogoDown;