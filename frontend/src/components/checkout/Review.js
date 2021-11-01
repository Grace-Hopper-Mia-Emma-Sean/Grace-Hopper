import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { getCartItemsByUserId } from "../../api";
import { useEffect, useState } from 'react';
import { CartItemTotal } from '..';

export default function Review() {
    const [cartItems, setCartItems] = useState([]);
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    useEffect(async () => {
        await getCartItemsByUserId(token, id)
          .then(() => {
            console.log(localStorage.getItem("cart"))
            setCartItems(JSON.parse(localStorage.getItem("cart")))
          })
          .catch((error) => console.log(error))
          .finally(localStorage.removeItem("cart"))
      }, []);

    const products = [...cartItems];
    console.log(products)
      
      const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
      const payments = [
        { name: 'Card type', detail: 'Visa' },
        { name: 'Card holder', detail: 'Mr John Smith' },
        { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
        { name: 'Expiry date', detail: '04/2024' },
      ];

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              Total: {localStorage.getItem("Cart Total")}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping Testing 
          </Typography>
          <Typography gutterBottom>John Smith Testing</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details Testing
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