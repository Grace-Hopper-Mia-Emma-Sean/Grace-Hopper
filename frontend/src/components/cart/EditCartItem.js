import {
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "../../MUI";
import { updateCartItem, getCartItemsByUserId } from "../../api";
import { useState, useEffect } from "react";

export function EditCartItem({ cart, product }) {
  const [quantity, setQuantity] = useState(cart.quantity);
  // const localCart = JSON.parse(localStorage.getItem("cart"));
  // const [localQuantity, setLocalQuantity] = useState(localCart.quantity);
  const userId = localStorage.getItem("id");

  console.log(cart);
  console.log(cart.quantity);
  // ! work on

  const item = {
    id: cart.id,
    user_id: null,
    name: cart.name,
    quantity: quantity,
    price: cart.price,
    total: cart * cart.price,
  };

  const guest = (item) => {
    console.log("guest hit");
    const oldItems = JSON.parse(localStorage.getItem("cart")) || [];
    const newItems = [];
    // newItems.unshift(Object.entries(oldItems));
    newItems.unshift(...oldItems);
    localStorage.setItem("cart", JSON.stringify(item));
  };

  useEffect(async () => {
    userId
      ? await updateCartItem(cart.id, quantity, localStorage.getItem("id"))
      : null;
  }, [quantity]);

  // useEffect(async () => {
  //   guest(item);
  // }, [localQuantity]);

  return (
    <div>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={quantity}
            label="Quantity"
            onClick={(e) => {
              setQuantity(e.target.value);
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => {
              return <MenuItem value={number}>{number}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
