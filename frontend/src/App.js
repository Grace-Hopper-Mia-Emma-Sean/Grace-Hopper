import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { 
  Login, 
  Navbar, 
  NotFound, 
  Register, 
  Testing, 
  OrderDetails, 
  OrderItems,
  PaymentDetails,
  UserPayment,
  CreateOrderDetails
 } from "./components";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      setUsername(localStorage.getItem("username"));
      setLoggedIn(true);
      return () => Navbar;
    }
  }, [loggedIn, username]);

  return (
    <Router>
      <Navbar />
      <Testing loggedIn={loggedIn} />
      <Switch>
        <Route path="/register" component={Register}>
          <Register
            loggedIn={loggedIn}
            username={username}
            password={password}
            token={token}
            confirmPassword={confirmPassword}
            setLoggedIn={setLoggedIn}
            setUsername={setUsername}
            setPassword={setPassword}
            setToken={setToken}
            setConfirmPassword={setConfirmPassword}
          />
        </Route>
        <Route path="/login" component={Login}>
          <Login
            loggedIn={loggedIn}
            username={username}
            password={password}
            token={token}
            setLoggedIn={setLoggedIn}
            setUsername={setUsername}
            setPassword={setPassword}
            setToken={setToken}
          />
        </Route>
        <Route exact path="/order_details" component={OrderDetails}/>
        <Route exact path="/order_items" component={OrderItems}/>
        <Route exact path="/payment_details" component={PaymentDetails}/>
        <Route exact path="/user_payment"component={UserPayment} />
        <Route exact path="/create_order_details" component={CreateOrderDetails}/>

        <Route exact path="/" />
        <Route path="*" component={NotFound} />
        
      </Switch>
    </Router>
  );
}
