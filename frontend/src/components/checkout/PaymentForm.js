import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function PaymentForm({
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
    setPhoneNumber
}) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment Method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            value={cardName}
            onChange={(event)=> setCardName(event.target.value)}
            fullWidth
            autoComplete="cc-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            value={cardNumber}
            onChange={(event)=> setCardNumber(event.target.value)}
            fullWidth
            autoComplete="cc-number"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            value={expDate}
            onChange={(event)=> setExpDate(event.target.value)}
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            value={cvv}
            onChange={(event)=> setCVV(event.target.value)}
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            required
            id="email"
            label="Email Address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            helperText="Enter Email Address"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
          />
        </Grid>


        <Grid item xs={12} md={6}>
          <TextField
            required
            id="phoneNumber"
            label="Phone Number"
            value={phoneNumber}
            onChange={(event)=> setPhoneNumber(event.target.value)}
            helperText="Enter Phone Number"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
