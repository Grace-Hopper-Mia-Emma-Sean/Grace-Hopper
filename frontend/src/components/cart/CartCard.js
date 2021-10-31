import * as React from "react";

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
} from "../MUI";

import { getCartItemsByUserId } from "../../api";
import { useState, useEffect } from "react";
import { EditCartItem, DeleteCartItem } from "..";

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

export function CartCard() {
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [sum, setSum] = useState();
  const classes = useStyles();

  const quantityChange = (e) => setQuantity(e.target.value);

  useEffect(async () => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    await getCartItemsByUserId(token, id)
      .then(() => {
        setCart(JSON.parse(localStorage.getItem("cart")));
      })
      .then(() => {
        setSum(
          cart
            .reduce((total, array) => {
              return total + JSON.parse(array.total);
            }, 0)
            .toLocaleString("en-US")
        );
      })
      .catch((error) => console.log(error))
      .finally(localStorage.removeItem("cart"));
  }, []);

  const image = `http://placeimg.com/128/128/tech/${Math.floor(
    Math.random() * 20 + 1
  )}`;

  console.log(sum);

  const sum2 = cart
    .reduce((total, array) => {
      return total + JSON.parse(array.total);
    }, 0)
    .toLocaleString("en-US");

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
                    <Grid item>
                      <Typography variant="subtitle1">${cart.total}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </div>
          );
        })}
      </div>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Typography sx={{ fontSize: 36 }}>Total: {sum}</Typography>
      </Box>
    </div>
  );
}

// [
//   {
//     user_id: 4,
//     name: "iMac 24inch (8 core, M1 Chip, 500 GB SSD)",
//     quantity: 2,
//     price: "2000.00",
//     total: "4000.00",
//   },
//   {
//     user_id: 3,
//     name: "ASUS ROG Gaming PC",
//     quantity: 1,
//     price: "1700.00",
//     total: "1700.00",
//   },
//   {
//     user_id: 6,
//     name: "The Intel i7",
//     quantity: 3,
//     price: "700.00",
//     total: "2100.00",
//   },
//   {
//     user_id: 2,
//     name: "The Apple M1 Chip (Recently Updated!)",
//     quantity: 2,
//     price: "749.99",
//     total: "1499.98",
//   },
//   {
//     user_id: 5,
//     name: "NVIDIA Alienware X17 Gaming Laptop",
//     quantity: 2,
//     price: "2200.00",
//     total: "4400.00",
//   },
// ];
