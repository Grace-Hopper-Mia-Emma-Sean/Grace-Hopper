import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { getCartItemsByUserId, getProductDiscounts } from "../../api";
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
  setCurrentTotal,
}) {

  useEffect(() => {
    const fetchDiscounts = async () => {
      const resp = await getProductDiscounts();
      setDiscounts(resp)
    };
    fetchDiscounts()
  }, [])

  useEffect(async () => {
    setCart(JSON.parse(localStorage.getItem("cart")))
    setCurrentTotal(total)
  }, []);

  const orderTotal = (localStorage.getItem("Cart Total"))
  const total = parseFloat(orderTotal.replace(/,/, ''))

  const products = [...cart]

  const addresses = [address1, address2, city, state, zipcode, country];
  const payments = [
    { name: 'Card type', detail: cardName },
    { name: 'Card holder', detail: firstName, lastName },
    { name: 'Card number', detail: cardNumber },
    { name: 'Expiry date', detail: expDate },
  ];
  const contact = [email, phoneNumber]

  const [discountPercent, setDiscountPercent] = useState('')
  const [discounts, setDiscounts] = useState([])
  const [promoCode, setPromoCode] = useState('')
  const [newTotal, setNewTotal] = useState('')
  const [displayNewTotal, setDisplayNewTotal] = useState(false)
  const [discountFound, setDiscountFound] = useState(false)


  function discountFinder(discounts, promoCode) {
    for (let i = 0; i < discounts.length; i++) {
      if (promoCode === discounts[i].name) {
        setDiscountPercent(discounts[i].discount_percent)
        setDiscountFound(true)
      }
    }
  }

  function discountCalculator(tot, disc) {
    let discount = disc / 100
    let amountToSubtract = tot * discount
    let discountedTotal = tot - amountToSubtract
    let fixedTotal = discountedTotal.toFixed(2)
    setNewTotal(fixedTotal)
    setDisplayNewTotal(true)
    localStorage.setItem("Cart Total", fixedTotal)
  }

  const useStyles = makeStyles((theme) => ({
    oldtotal: {
      textDecoration: 'line-through',
      textDecorationColor: 'red'
    },
  }));

  const classes = useStyles()

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
              <br />
              Quantity:{product.quantity}
            </Typography>

          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            { displayNewTotal ?
              <>
                Old Total: <span className={classes.oldtotal} > ${currentTotal}</span>
                <br />
              </>
              : null}
            { displayNewTotal ? 
            <> New Total: ${newTotal} </> 
            : 
            <> Total: ${currentTotal} </> }
          </Typography>

        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Promo Code? Enter Here" />
          {discountFound ? null : <TextField onChange={function (event) {
            setPromoCode(event.target.value)
          }}></TextField>}

          {discountFound ? null : <Button onClick={
            function () {


              discountFinder(discounts, promoCode)
            }
          }>Find Discount</Button>}

          {discountFound ? <Button onClick={
            function () {
              discountCalculator(total, discountPercent)
            }
          }>
            Apply Discount
          </Button> : null}


        </ListItem>
        {discountFound ?
          <>Congrats! We found a {discountPercent}% discount!
            <br />
            Click 'Apply Discount' To Apply!
          </>
          : null}
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