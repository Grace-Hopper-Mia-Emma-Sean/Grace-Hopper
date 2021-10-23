import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { NotFound } from "./components";

export default function App() {
  return (
    <Router>
      <Switch>
        {/* <Route exact path="/" component={} /> */}
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}
