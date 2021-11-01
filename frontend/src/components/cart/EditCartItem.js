import { Button, Box, FormControl, InputLabel, Select, MenuItem } from "../MUI";
import { updateCartItem, getCartItemsByUserId } from "../../api";
import { useState, useEffect } from "react";

export function EditCartItem({ cart }) {
  const [quantity, setQuantity] = useState(cart.quantity);

  useEffect(async () => {
    await updateCartItem(cart.id, quantity, localStorage.getItem("id"));
  }, [quantity]);

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
            onChange={(e) => {
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
