import { useState, useEffect } from "react";
import { Grid, Typography } from "../../MUI";
import { getCartItems, getCartItemsByUserId } from "../../api";

export function CartItemTotal({ cart }) {
  const [total, setTotal] = useState(cart.total);

  useEffect(async () => {
    setTotal(cart.total);
  }, [cart]);

  return (
    <Grid item>
      <Typography variant="subtitle1">
        ${total.toLocaleString("en-US")}
      </Typography>
    </Grid>
  );
}
