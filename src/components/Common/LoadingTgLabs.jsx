import React, { useState } from "react";
import Loader from "react-loader-spinner";

function LoadingTgLabs() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  return <Loader type="BallTriangle" color="#00BFFF" height={100} width={100} />;
}

export default LoadingTgLabs;