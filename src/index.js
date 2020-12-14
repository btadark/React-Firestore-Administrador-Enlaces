import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "bootswatch/dist/superhero/bootstrap.min.css";
import "./index.css";
import "./config/firebase";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
