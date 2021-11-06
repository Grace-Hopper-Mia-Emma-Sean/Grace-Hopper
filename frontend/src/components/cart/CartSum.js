import { useState, useEffect } from "react";
import { Box, Typography } from "../../MUI";

export function CartSum({ cart }) {
  const [sum, setSum] = useState(0);
  const currentCart = JSON.parse(localStorage.getItem('cart'))

  useEffect(async () => {
    setSum(
      currentCart
        .sort((x, y) => x.id - y.id)
        .reduce((total, array) => {
          return total + JSON.parse(array.total);
        }, 0)
        .toLocaleString("en-US")
    );
  }, []);

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Typography sx={{ fontSize: 36 }}>Total: ${sum}</Typography>
      {localStorage.setItem("Cart Total", sum)}
    </Box>
  );
}
