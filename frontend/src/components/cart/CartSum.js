import { useState, useEffect } from "react";
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

export function CartSum({ cart }) {
  const [sum, setSum] = useState();

  useEffect(async () => {
    setSum(
      cart
        .sort((x, y) => x.id - y.id)
        .reduce((total, array) => {
          return total + JSON.parse(array.total);
        }, 0)
        .toLocaleString("en-US")
    );
  }, [cart]);

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Typography sx={{ fontSize: 36 }}>Total: {sum}</Typography>
      {localStorage.setItem("Cart Total", sum)}
    </Box>
  );
}
