import { Button, Box, FormControl, InputLabel, Select, MenuItem } from "../MUI";
import { updateCartItem } from "../../api";
import { useState, useEffect } from "react";

export function EditCartItem({ cart }) {
  const [quantity, setQuantity] = useState("");

  const quantityChange = (e) => setQuantity(e.target.value);

  const editItem = async () => {
    console.log(cart);
    await updateCartItem(cart.id)
      .then(() => {
        console.log("cart item removed successfully");
      })
      .catch((error) => console.log(error));
  };

  console.log(cart);

  return (
    <div>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={cart.quantity}
            label="Quantity"
            onChange={editItem}
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
