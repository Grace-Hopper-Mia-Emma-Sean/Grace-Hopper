import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import //TO DO: Import child components here
"./components";

const App = () => {
  //TO DO: Utilize useState here

  //SAMPLE useEffect below:
  //     useEffect (() => {
  //         if (localStorage.getItem("token")){
  //             setToken(localStorage.getItem("token"))
  //             setUsername(localStorage.getItem("username"))
  //             setLoginSuccess(true)
  //         }
  //     }, [loginSuccess, username])

  return (
    <div className="app">
      <Router>
        <div>
          //TO DO: Component
          <Switch>
            <Route exact path="/">
              //TO DO: Component
            </Route>

            <Route path="*">
              <h1>404 Error - Page Not Found!</h1>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
