import { Button, Box, FormControl, InputLabel, Select, MenuItem } from "../MUI";
import { updateCartItem } from "../../api";
import { useState, useEffect } from "react";

export function EditCartItem({ cart, setQuantity }) {
  const editItem = async (e) => {
    await updateCartItem(cart.id, 2, localStorage.getItem("id"))
      .then(() => {
        console.log("cart item changed successfully");
      })
      .catch((error) => console.log(error));
  };

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
