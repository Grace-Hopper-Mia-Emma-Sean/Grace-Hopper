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
  Dashboard,
  Footer,
  CartItemTotal,
  Categories,
  EditCategory,
  CreateCategory,
  Discounts,
  EditDiscount,
  CreateDiscount,
  Dashboard_Users,
  Dashboard_Products,
  Dashboard_Cart,
  ContactUs,
  MyOrder,
} from "./components";

import { Checkout } from "./components/checkout/Checkout";

import { makeStyles } from "../src/MUI";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    minHeight: "100vh",
  },
  nav: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "rem",
  },
  body: {
    paddingTop: "3rem",
    paddingBottom: "2.5rem",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "3.5rem",
  },
}));

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
  const [paymentToDelete, setPaymentToDelete] = useState("");
  const [userPaymentToEdit, setUserPaymentToEdit] = useState("");
  const [userPaymentToDelete, setUserPaymentToDelete] = useState("");
  const [orderItemsToEdit, setOrderItemsToEdit] = useState("");
  const [orderItemsToDelete, setOrderItemsToDelete] = useState("");
  const [orderDetailsToEdit, setOrderDetailsToEdit] = useState("");
  const [orderToDelete, setOrderToDelete] = useState("");
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [country, setCountry] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvv, setCVV] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [selectProductCategory, setSelectProductCategory] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState("");
  const [discountToEdit, setDiscountToEdit] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [currentRevenue, setCurrentRevenue] = useState(0);
  const [currentTotal, setCurrentTotal] = useState(0);
  const [orderDetails, setOrderDetails] = useState([]);
  const [myOrder, setMyOrder] = useState([]);

  const classes = useStyles();

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
      <div className={classes.container}>
        <div className={classes.nav}>
          <Navbar
            username={username}
            loggedIn={loggedIn}
            token={token}
            admin={admin}
            setLoggedIn={setLoggedIn}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            productCategory={productCategory}
            setProductCategory={setProductCategory}
            selectProductCategory={selectProductCategory}
            setSelectProductCategory={setSelectProductCategory}
            cart={cart}
            setCart={setCart}
          >
            <OpenDrawer loggedIn={loggedIn} admin={admin} />
          </Navbar>
        </div>
        <div className={classes.body}>
          {/* <Testing loggedIn={loggedIn} /> */}
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
                orderToDelete={orderToDelete}
                setOrderToDelete={setOrderToDelete}
                orderDetails={orderDetails}
                setOrderDetails={setOrderDetails}
                currentRevenue={currentRevenue}
                setCurrentRevenue={setCurrentRevenue}
              />
            </Route>

            <Route exact path="/my_order">
              <MyOrder />
              myOrder={myOrder}
              setMyOrder={setMyOrder}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
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

            <Route
              exact
              path="/create_order_items"
              component={CreateOrderItems}
            />
            <Route
              exact
              path="/create_order_details"
              component={CreateOrderDetails}
            />
            {/* <Route exact path="/create_payment_details" component={CreatePaymentDetails} /> */}

            <Route exact path="/create_user_payment">
              <CreateUserPayment token={token} />
            </Route>

            <Route exact path="/delete_order_details">
              <DeleteOrderDetails
                orderToDelete={orderToDelete}
                setOrderToDelete={setOrderToDelete}
              />
            </Route>

            <Route exact path="/delete_order_items">
              <DeleteOrderItems
                orderItemsToDelete={orderItemsToDelete}
                setOrderItemsToDelete={setOrderItemsToDelete}
              />
            </Route>

            <Route exact path="/delete_user_payment">
              <DeleteUserPayment
                userPaymentToDelete={userPaymentToDelete}
                setUserPaymentToDelete={setUserPaymentToDelete}
                token={token}
              />
            </Route>

            <Route exact path="/delete_payment_details">
              <DeletePaymentDetails
                paymentToDelete={paymentToDelete}
                setPaymentToDelete={setPaymentToDelete}
              />
            </Route>

            <Route exact path="/edit_order_details">
              <EditOrderDetails
                orderDetailsToEdit={orderDetailsToEdit}
                setOrderDetailsToEdit={setOrderDetailsToEdit}
                paymentToEdit={paymentToEdit}
                setPaymentToDelete={setPaymentToDelete}
              />
            </Route>

            <Route exact path="/edit_order_items">
              <EditOrderItems
                orderItemsToEdit={orderItemsToEdit}
                setOrderItemsToEdit={setOrderItemsToEdit}
                orderDetailsToEdit={orderDetailsToEdit}
                setOrderDetailsToEdit={setOrderDetailsToEdit}
                productToEdit={productToEdit}
                setProductToEdit={setProductToEdit}
              />{" "}
            </Route>

            <Route exact path="/edit_payment_details">
              <EditPaymentDetails
                paymentToEdit={paymentToEdit}
                setPaymentToEdit={setPaymentToEdit}
              />
            </Route>

            <Route exact path="/edit_user_payment">
              <EditUserPayment
                userPaymentToEdit={userPaymentToEdit}
                setUserPaymentToEdit={setUserPaymentToEdit}
              />
            </Route>
            <Route exact path="/checkout">
              <Checkout
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                address1={address1}
                setAddress1={setAddress1}
                address2={address2}
                setAddress2={setAddress2}
                city={city}
                setCity={setCity}
                state={state}
                setState={setState}
                zipcode={zipcode}
                setZipcode={setZipcode}
                country={country}
                setCountry={setCountry}
                cardName={cardName}
                setCardName={setCardName}
                cardNumber={cardNumber}
                setCardNumber={setCardNumber}
                expDate={expDate}
                setExpDate={setExpDate}
                cvv={cvv}
                setCVV={setCVV}
                email={email}
                setEmail={setEmail}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                cart={cart}
                setCart={setCart}
                currentRevenue={currentRevenue}
                setCurrentRevenue={setCurrentRevenue}
                currentTotal={currentTotal}
                setCurrentTotal={setCurrentTotal}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              />
            </Route>

            <Route exact path="/admin">
              <Dashboard
                currentRevenue={currentRevenue}
                setCurrentRevenue={setCurrentRevenue}
                cardNumber={cardNumber}
                setCardNumber={setCardNumber}
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                city={city}
                setCity={setCity}
                state={state}
                setState={setState}
                currentTotal={currentTotal}
                setCurrentTotal={setCurrentTotal}
              />
            </Route>

            <Route
              exact
              path="/dashboard_users"
              component={Dashboard_Users}
            ></Route>
            <Route exact path="/dashboard_products">
              {" "}
              <Dashboard_Products
                setProductToEdit={setProductToEdit}
                productToEdit={setProductToEdit}
              />
            </Route>
            <Route
              exact
              path="/dashboard_cart"
              component={Dashboard_Cart}
            ></Route>
            <Route exact path="/contact_us" component={ContactUs}></Route>

            <Route exact path="/cart">
              <CartCard cart={cart} setCart={setCart} loggedIn={loggedIn} />
            </Route>

            <Route exact path="/cart">
              <CartItemTotal
                cart={cart}
                setCart={setCart}
                total={total}
                setTotal={setTotal}
              />
            </Route>

            {/* <Route exact path="/admin">
          <AdminTable
          currentRevenue={currentRevenue}
          setCurrentRevenue={setCurrentRevenue}
          />
       </Route> */}

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
            <Route exact path="/categories">
              <Categories
                categoryToEdit={categoryToEdit}
                setCategoryToEdit={setCategoryToEdit}
              />
            </Route>
            <Route exact path="/editcategory">
              <EditCategory categoryToEdit={categoryToEdit} />
            </Route>
            <Route exact path="/createcategory">
              <CreateCategory />
            </Route>
            <Route exact path="/discounts">
              <Discounts
                discountToEdit={discountToEdit}
                setDiscountToEdit={setDiscountToEdit}
              />
            </Route>
            <Route exact path="/editdiscount">
              <EditDiscount discountToEdit={discountToEdit} />
            </Route>
            <Route exact path="/creatediscount">
              <CreateDiscount />
            </Route>
            <Route exact path="/">
              <Products
                searchTerm={searchTerm}
                productCategory={productCategory}
                selectProductCategory={selectProductCategory}
                cart={cart}
                setCart={setCart}
              />
            </Route>

            <Route path="*" component={NotFound} />
          </Switch>
        </div>
        <div className={classes.footer}>
          <Footer />
        </div>
      </div>
    </Router>
  );
}
