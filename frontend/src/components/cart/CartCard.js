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

import { useHistory } from "react-router-dom";

import { getCartItemsByUserId } from "../../api";
import { useEffect, useState } from "react";
import { EditCartItem, DeleteCartItem, CartSum, CartItemTotal } from "..";

const useStyles = makeStyles((theme) => ({
  body: {
    backgroundColor: "#457B9D",
    height: "90vh",
    marginTop: "-2rem",
  },
  root: {
    flexGrow: 7,
    margin: "1rem",
  },
  fluff: {
    padding: "2rem",
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

export function CartCard({ loggedIn, cart, setCart }) {
  const classes = useStyles();
  const [sum, setSum] = useState(0);
  const token = localStorage.token;
  const id = localStorage.getItem("id");
  const currentCart = JSON.parse(localStorage.cart);

  useEffect(async () => {
    !loggedIn
      ? setCart(JSON.parse(localStorage.cart))
      : await getCartItemsByUserId(token, id)
          .then(() => {
            setCart(JSON.parse(localStorage.cart));
          })
          .catch((error) => console.log(error));
  }, []);

  // setCart(JSON.parse(localStorage.cart).sort((x, y) => x.id - y.id));

  const image = `http://placeimg.com/128/128/tech/1`;

  const history = useHistory();

  const goBack = () => history.goBack();

  const sortedCart = currentCart.sort((x, y) => x.name.localeCompare(y.name));

  return currentCart.length ? (
    <div className={classes.body}>
      <div className={classes.fluff}>
        {sortedCart.map((cart) => {
          // <div className={classes.card}>

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
                    <Grid item xs container spacing={2}>
                      <Grid item xs>
                        <Typography gutterBottom variant="subtitle1">
                          {cart.name}
                        </Typography>
                        <EditCartItem
                          cart={cart}
                          setCart={setCart}
                          sum={sum}
                          setSum={setSum}
                        />
                        <DeleteCartItem cart={cart} setCart={setCart} />
                      </Grid>
                    </Grid>
                    <CartItemTotal cart={cart} />
                  </Grid>
                </Grid>
              </Paper>
            </div>
          );
          // </div>;
        })}
      </div>
      <CartSum cart={cart} sum={sum} setSum={setSum} />
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
    <div className={classes.body}>
      <div className={classes.fluff}>
        <Typography gutterBottom variant="h3" align="center">
          <Button size="large" onClick={goBack}>
            Nothing is in your cart. Please click here to go back and add items
            to proceed.
          </Button>
        </Typography>
      </div>
    </div>
  );
}
