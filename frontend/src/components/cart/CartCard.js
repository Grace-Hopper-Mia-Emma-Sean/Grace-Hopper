import * as React from "react";

import {
  Box,
  Button,
  ButtonBase,
  Grid,
  makeStyles,
  Typography,
  Paper,
} from "../../MUI";

import { getCartItemsByUserId } from "../../api";
import { useEffect, useState } from "react";
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
  const classes = useStyles();

  const token = localStorage.token;
  const id = localStorage.id;
  const currentCart = localStorage.cart ? JSON.parse(localStorage.cart) : [];
  const localCart = localStorage.cart;

  useEffect(async () => {
    localStorage.id
      ? await getCartItemsByUserId(token, id)
          .then(() => {
            setCart(
              JSON.parse(localStorage.getItem("cart")).sort(
                (x, y) => x.id - y.id
              )
            );
          })
          .catch((error) => console.log(error))
      : localCart === null ||
        localCart === undefined ||
        localCart.length === 0 ||
        localCart === ""
      ? null
      : setCart(JSON.parse(localCart)).filter((x) => x.id).length;
  }, [cart]);

  // setCart(JSON.parse(localStorage.cart).sort((x, y) => x.id - y.id));

  const image = `http://placeimg.com/128/128/tech/1`;

  return currentCart ? (
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
                        <EditCartItem cart={cart} setCart={setCart} />
                        <DeleteCartItem cart={cart} setCart={setCart} />
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
          <Button variant="contained" sx={{ mt: 3, ml: 1, margin: "5%" }}>
            <a href="/checkout"> Go To Checkout </a>
          </Button>
        </Typography>
      </Box>
    </div>
  ) : (
    <div>Please Add Items to Cart to Proceed</div>
  );
}
