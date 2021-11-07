import { useState, useEffect } from "react";
import { Box, Typography } from "../../MUI";

export function CartSum({ cart, sum, setSum }) {
  // const [sum, setSum] = useState(0);
  const currentCart = JSON.parse(localStorage.getItem('cart'))

  // useEffect(async () => {
  //   setSum(
  //     currentCart
  //       .sort((x, y) => x.id - y.id)
  //       .reduce((total, array) => {
  //         return total + JSON.parse(array.total);
  //       }, 0)
  //       .toLocaleString("en-US")
  //   );
  // }, []);

  useEffect(async () => {
    const total = currentCart.reduce(function(prev, cur){
      const current = parseInt(cur.price)
      return prev+current;
    },0);
    setSum(total);
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
