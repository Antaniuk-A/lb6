import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Timer from "./Timer";

ReactDOM.render(
  <Timer
    time="3"
    onEnd={() => {
      alert("the end!");
    }}
  />,
  document.getElementById("root")
);
