import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";

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
  // CreatePaymentDetails,
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
  Products,
  CartTable,
  AdminTable,
  ProductsTable,
  EditProduct,
  CreateProduct,
  CartCard,
  OpenDrawer,
} from "./components";

import { Checkout } from "./components/checkout/Checkout"

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [token, setToken] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [productToEdit, setProductToEdit] = useState("");
  const [paymentToEdit, setPaymentToEdit] = useState("");
  const [paymentToDelete, setPaymentToDelete ] = useState("");
  const [userPaymentToEdit, setUserPaymentToEdit] = useState("")
  const [userPaymentToDelete, setUserPaymentToDelete] = useState("")
  const [orderItemsToEdit, setOrderItemsToEdit] = useState("")
  const [orderItemsToDelete, setOrderItemsToDelete] = useState("")
  const [orderDetailsToEdit, setOrderDetailsToEdit] = useState("")
  const [orderDetailsToDelete, setOrderDetailsToDelete] = useState("")

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
  }, [loggedIn, username, admin, userId]);

  return (
    <Router>
      <Navbar
        username={username}
        loggedIn={loggedIn}
        token={token}
        admin={admin}
        setLoggedIn={setLoggedIn}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      >
        <OpenDrawer loggedIn={loggedIn} admin={admin} />
      </Navbar>
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

        <Route exact path="/admin/user_payment">
          <UserPayment
            loggedIn={loggedIn}
            token={token}
            setLoggedIn={setLoggedIn}
            setToken={setToken}
            userPaymentToEdit={userPaymentToEdit}
            setUserPaymentToEdit={setUserPaymentToEdit}
            userPaymentToDelete={userPaymentToDelete}
            setUserPaymentToDelete={setUserPaymentToDelete}
          />
        </Route>

        <Route exact path="/payment_details">
          <PaymentDetails
            loggedIn={loggedIn}
            token={token}
            setLoggedIn={setLoggedIn}
            setToken={setToken}
            paymentToEdit={paymentToEdit}
            setPaymentToEdit={setPaymentToEdit}
            paymentToDelete={paymentToDelete}
            setPaymentToDelete={setPaymentToDelete}
          />
        </Route>

        <Route exact path="/order_details">
          <OrderDetails
            loggedIn={loggedIn}
            token={token}
            setLoggedIn={setLoggedIn}
            setToken={setToken}
            orderDetailsToEdit={orderDetailsToEdit}
            setOrderDetailsToEdit={setOrderDetailsToEdit}
            orderDetailsToDelete={orderDetailsToDelete}
            setOrderDetailsToDelete={setOrderDetailsToDelete}
          />
        </Route>

        <Route exact path="/order_items">
          <OrderItems
            loggedIn={loggedIn}
            token={token}
            setLoggedIn={setLoggedIn}
            setToken={setToken}
            orderItemsToEdit={orderItemsToEdit}
            setOrderItemsToEdit={setOrderItemsToEdit}
            orderItemsToDelete={orderItemsToDelete} 
            setOrderItemsToDelete={setOrderItemsToDelete}
          />
        </Route>

        <Route exact path="/create_order_items" component={CreateOrderItems} />
        <Route exact path="/create_order_details" component={CreateOrderDetails}/>
        {/* <Route exact path="/create_payment_details" component={CreatePaymentDetails} /> */}

        <Route exact path="/create_user_payment">
          <CreateUserPayment
          token={token}
          />
          </Route>

        <Route exact path="/delete_order_details" >
          <DeleteOrderDetails
          orderDetailsToDelete={orderDetailsToDelete}
          setOrderDetailsToDelete={setOrderDetailsToDelete}
          /></Route>
      

        <Route exact path="/delete_order_items">
          <DeleteOrderItems
         orderItemsToDelete={orderItemsToDelete} 
         setOrderItemsToDelete={setOrderItemsToDelete}
          /></Route>

        <Route exact path="/delete_user_payment">
          <DeleteUserPayment
          userPaymentToDelete={userPaymentToDelete}
          setUserPaymentToDelete={setUserPaymentToDelete}
          token={token}
          /> 
        </Route>

        <Route exact path="/delete_payment_details" >
        <DeletePaymentDetails
        paymentToDelete={paymentToDelete}
        setPaymentToDelete={setPaymentToDelete}
        /></Route>

        <Route exact path="/edit_order_details">
          <EditOrderDetails
          orderDetailsToEdit={orderDetailsToEdit}
          setOrderDetailsToEdit={setOrderDetailsToEdit}
          paymentToEdit={paymentToEdit}
          setPaymentToDelete={setPaymentToDelete}
          /></Route>
        

        <Route exact path="/edit_order_items">
          <EditOrderItems
            orderItemsToEdit={orderItemsToEdit}
            setOrderItemsToEdit={setOrderItemsToEdit}
            orderDetailsToEdit={orderDetailsToEdit}
            setOrderDetailsToEdit={setOrderDetailsToEdit}
            productToEdit={productToEdit}
            setProductToEdit={setProductToEdit}
          /> </Route>

        <Route exact path="/edit_payment_details">
        <EditPaymentDetails
         paymentToEdit={paymentToEdit}
         setPaymentToEdit={setPaymentToEdit}
        /></Route>

        <Route exact path="/edit_user_payment">
        <EditUserPayment
        userPaymentToEdit={userPaymentToEdit}
        setUserPaymentToEdit={setUserPaymentToEdit}
        /></Route>
        <Route exact path="/checkout" component={Checkout}></Route>

        <Route exact path="/cart" component={CartCard}></Route>
        <Route exact path="/admin" component={AdminTable}></Route>
        <Route exact path="/admin/users" component={UsersTable}></Route>
        <Route exact path="/admin/cart" component={CartTable}></Route>
        <Route exact path="/admin/products">
          <ProductsTable
            productToEdit={productToEdit}
            setProductToEdit={setProductToEdit}
          />
        </Route>
        <Route exact path="/editProduct">
          <EditProduct productToEdit={productToEdit} />
        </Route>
        <Route exact path="/createProduct">
          <CreateProduct />
        </Route>
        <Route exact path="/">
          <Products searchTerm={searchTerm} />
        </Route>
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}
