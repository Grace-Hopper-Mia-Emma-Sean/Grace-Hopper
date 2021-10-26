import App from "./App";
import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
axios.defaults.baseURL = `https://pure-reaches-94902.herokuapp.com/api`;

ReactDOM.render(<App />, document.getElementById("app"));
