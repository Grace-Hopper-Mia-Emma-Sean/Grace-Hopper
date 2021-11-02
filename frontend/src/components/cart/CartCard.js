import * as React from "react";
import { Link } from "react-router-dom";

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Stack,
  Grid,
  makeStyles,
  Paper,
  ButtonBase,
} from "../../MUI";

import { getCartItemsByUserId } from "../../api";
import { useState, useEffect } from "react";
import { EditCartItem, DeleteCartItem, CartSum, CartItemTotal } from "..";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 7,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  columns: {
    columns: "2 auto",
  },
}));

export function CartCard({ cart, setCart }) {
  // const [cart, setCart] = useState([]);
  //making it global to be accessible to CartTotal and Checkout

  const classes = useStyles();

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  useEffect(async () => {
    await getCartItemsByUserId(token, id)
      .then(() => {
        setCart(
          JSON.parse(localStorage.getItem("cart")).sort((x, y) => x.id - y.id)
        );
      })
      .catch((error) => console.log(error));
    // .finally(localStorage.removeItem("cart"));
  }, []);

  // const image = `http://placeimg.com/128/128/tech/${Math.floor(
  //   Math.random() * 20 + 1
  // )}`;

  const image = `http://placeimg.com/128/128/tech/1`;

  return (
    <div>
      <div>
        {cart.map((cart) => {
          return (
            <div className={classes.root}>
              <Paper className={classes.paper}>
                <Grid container spacing={2}>
                  <Grid item>
                    <ButtonBase className={classes.image}>
                      <img className={classes.img} alt="complex" src={image} />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography gutterBottom variant="subtitle1">
                          {cart.name}
                        </Typography>
                        {/* <Typography variant="body2" gutterBottom>
                        Spacing
                      </Typography> */}
                        <EditCartItem cart={cart} />
                        <DeleteCartItem cart={cart} />
                      </Grid>
                    </Grid>
                    <CartItemTotal cart={cart} />
                  </Grid>
                </Grid>
              </Paper>
            </div>
          );
        })}
      </div>
      <CartSum cart={cart} />
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Typography>
          
          <Button
            variant="contained"
            sx={{ mt: 3, ml: 1,
            margin: '5%'}}>
            <a href="/checkout"> Go To Checkout </a>
            </Button>
        </Typography>
      </Box>
    </div>
  );
}
