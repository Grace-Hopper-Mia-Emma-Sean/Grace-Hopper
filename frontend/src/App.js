import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import {
  Login,
  Navbar,
  NotFound,
  Register,
  Testing,
  UsersTable,
  OrderDetails,
  OrderItems,
  PaymentDetails,
  UserPayment,
  CreateOrderDetails,
  CreatePaymentDetails,
  CreateUserPayment,
  CreateOrderItems,
  DeleteOrderDetails,
  DeleteOrderItems,
  DeleteUserPayment,
  DeletePaymentDetails,
  EditOrderDetails,
  EditOrderItems,
  EditPaymentDetails,
  EditUserPayment,
  Products
} from "./components";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [token, setToken] = useState("");
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true);
      setToken(localStorage.getItem("token"));
      setUsername(localStorage.getItem("username"));
      setAdmin(localStorage.getItem("admin"));
      setUserId(localStorage.getItem("id"));
      console.log(token, username, admin, userId);
      return () => Navbar;
    }
  }, [loggedIn, username]);

  return (
    <Router>
      <Navbar
        username={username}
        loggedIn={loggedIn}
        token={token}
        setLoggedIn={setLoggedIn}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <Testing loggedIn={loggedIn} />
      <Switch>
        <Route path="/register">
          <Register
            loggedIn={loggedIn}
            username={username}
            password={password}
            token={token}
            confirmPassword={confirmPassword}
            admin={admin}
            userId={userId}
            setUserId={setUserId}
            setAdmin={setAdmin}
            setLoggedIn={setLoggedIn}
            setUsername={setUsername}
            setPassword={setPassword}
            setToken={setToken}
            setConfirmPassword={setConfirmPassword}
          />
        </Route>
        <Route path="/login">
          <Login
            loggedIn={loggedIn}
            username={username}
            password={password}
            token={token}
            admin={admin}
            userId={userId}
            setUserId={setUserId}
            setAdmin={setAdmin}
            setLoggedIn={setLoggedIn}
            setUsername={setUsername}
            setPassword={setPassword}
            setToken={setToken}
          />
        </Route>
        <Route exact path="/order_details" component={OrderDetails} />
        <Route exact path="/order_items" component={OrderItems} />
        <Route exact path="/payment_details" component={PaymentDetails} />
        <Route exact path="/user_payment" component={UserPayment} />

        <Route exact path="/create_order_items" component={CreateOrderItems} />
        <Route exact path="/create_order_items" component={CreateOrderDetails} /> 
        <Route exact path="/create_payment_details" component={CreatePaymentDetails} />
        <Route exact path="/create_user_payment" component={CreateUserPayment} />
          
        <Route exact path="/delete_order_details" component={DeleteOrderDetails} />
        <Route exact path="/delete_order_items" component={DeleteOrderItems} />
        <Route exact path="/delete_user_payment" component={DeleteUserPayment} />
        <Route exact path="/delete_user_payment" component={DeletePaymentDetails} />
          
        <Route exact path="/edit_order_details" component={EditOrderDetails} />
        <Route exact path="/edit_order_items" component={EditOrderItems} />
        <Route exact path="/edit_payment_details" component={EditPaymentDetails} />
        <Route exact path="/edit_user_payment" component={EditUserPayment} />
          
        <Route
          exact
          path="/create_order_details"
          component={CreateOrderDetails}
        />
        <Route path="/admin" component={UsersTable}></Route>
        <Route exact path="/">
            <Products searchTerm={searchTerm}/>
        </Route>
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}
