import { useState, useEffect } from "react";
import { Grid, Typography } from "../MUI";
import { getCartItems, getCartItemsByUserId } from "../../api";

export function CartItemTotal({ cart }) {
  const [total, setTotal] = useState(cart.total);

  useEffect(async () => {
    setTotal(cart.total);
  }, [cart]);

  //   useEffect(async () => {
  //     setSum(
  //       cart
  //         .sort((x, y) => x.id - y.id)
  //         .reduce((total, array) => {
  //           return total + JSON.parse(array.total);
  //         }, 0)
  //         .toLocaleString("en-US")
  //     );
  //   }, [cart]);

  return (
    <Grid item>
      <Typography variant="subtitle1">${total}</Typography>
    </Grid>
  );
}
