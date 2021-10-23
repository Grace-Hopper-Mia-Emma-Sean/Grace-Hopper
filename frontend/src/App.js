import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Login, Navbar, NotFound, Register, Testing } from "./components";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Testing />
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route exact path="/" />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}
