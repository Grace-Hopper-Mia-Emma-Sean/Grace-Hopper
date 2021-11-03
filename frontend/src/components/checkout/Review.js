import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { getCartItemsByUserId } from "../../api";
import { useEffect, useState } from 'react';

export default function Review({
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
    currentTotal, 
    setCurrentTotal
}) {

    useEffect(async () => {
      setCart(JSON.parse(localStorage.getItem("cart")))
      setCurrentTotal(total)
      }, []);

      const orderTotal = (localStorage.getItem("Cart Total"))
      const total = parseFloat(orderTotal.replace(/,/, ''))
      

      const products = [...cart]
      console.log(products)
      
      
      const addresses = [address1, address2, city, state, zipcode, country];
      const payments = [
        { name: 'Card type', detail: cardName},
        { name: 'Card holder', detail: firstName, lastName},
        { name: 'Card number', detail: cardNumber },
        { name: 'Expiry date', detail: expDate },
      ];
      const contact = [email, phoneNumber]


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (

          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText 
            primary={product.name} />

            <Typography 
            variant="body2"> {product.price}
            <br/>
            Quantity:{product.quantity}
            </Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>

            Total: ${currentTotal}

          </Typography>
        </ListItem>
      </List>


      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping Details
          </Typography>
          <Typography gutterBottom>{firstName} {lastName}</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Contact 
          </Typography>
            Email: <Typography gutterBottom>{email}</Typography>
            Phone: <Typography gutterBottom>{phoneNumber}</Typography>

        </Grid>


        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment Details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>

      </Grid>
    </React.Fragment>
  );
}