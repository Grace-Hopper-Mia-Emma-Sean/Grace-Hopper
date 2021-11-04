import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { deleteCartItem } from "../../api";


export function Checkout({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  address1,
  setAddress1,
  address2,
  setAddress2,
  city,
  setCity,
  state,
  setState,
  zipcode,
  setZipcode,
  country,
  setCountry,
  cardName,
  setCardName,
  cardNumber,
  setCardNumber,
  expDate,
  setExpDate,
  cvv,
  setCVV,
  email,
  setEmail,
  phoneNumber,
  setPhoneNumber,
  cart,
  setCart,
  currentRevenue,
  setCurrentRevenue,
  currentTotal, 
  setCurrentTotal,
  loggedIn,
  setLoggedIn

}) {

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <AddressForm
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
          />
        );
      case 1:
        return (
          <PaymentForm
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
          />
        );
      case 2:
        return (
          <Review
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
            currentTotal={currentTotal}
            setCurrentTotal={setCurrentTotal}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function emptyCart () {
    const currentCart = JSON.parse(localStorage.getItem("cart"))
    console.log(currentCart)
    currentCart.forEach((cart) => {
      deleteCartItem(cart.id)
    })

    localStorage.removeItem("Cart Total")
    localStorage.removeItem("cart")
   
  }


  const randomOrderId = getRandomInt(1000000000);
  const theme = createTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = ["Shipping address", "Payment details", "Review your order"];
  const cartItems = JSON.parse(localStorage.getItem("cart"))
  const cartTotal = parseFloat(localStorage.getItem("Cart Total"))




  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };


  return (
  cartItems && cartTotal>0 ? 
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
    
              <React.Fragment>
                  {emptyCart()}

                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #{randomOrderId}. We have emailed your
                  order confirmation, and will send you an update when your
                  order has shipped.
                </Typography>
                   
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
    :
    
    <Redirect to="/"/>
  );
}
